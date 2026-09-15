"use client";
import { use, useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Badge, Banner, Row, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, match, useStore, nextBall } from "../../shared";

const QUALITIES = ["Auto (1080p)", "720p", "480p", "Data saver"];

/**
 * The score overlay sits on the player rather than beside it, the way it does in
 * the real app, and it moves with the match. Falling behind the live edge is a
 * real state here: the LIVE pill goes dim until you jump back.
 */
export default function Watch({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);
  const m = match(id);

  const atLiveEdge = s.behindSeconds === 0;

  function play() {
    update((st) => { st.playing = true; return st; });
  }

  function ball() {
    update((st) => {
      const next = nextBall(st.score.overs, st.score.runs);
      st.score.overs = next.overs;
      st.score.runs = next.runs;
      st.ballsBowled += 1;
      return st;
    });
  }

  function rewind() {
    update((st) => { st.behindSeconds += 30; return st; });
    setNotice({ tone: "info", msg: "You are behind the live edge." });
  }

  function goLive() {
    update((st) => { st.behindSeconds = 0; st.playing = true; return st; });
    setNotice({ tone: "ok", msg: "Jumped to the live edge." });
  }

  if (m.status !== "LIVE") {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title={`${m.home.name} v ${m.away.name}`} sub={m.competition}>
          <Empty>This match starts at {m.startsAt}. There is no stream yet.</Empty>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={`${m.home.name} v ${m.away.name}`} sub={`${m.competition} · ${m.venue}`} wide>
        {notice && <Banner tone={notice.tone} testId="player-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Player" testId="player">
          <div style={{ position: "relative", background: "#0b0d12", borderRadius: 10, minHeight: 220, color: "#fff" }}
               data-testid="player-surface">
            <div style={{ display: "grid", placeItems: "center", minHeight: 220 }}>
              <span style={{ fontSize: 40 }}>{s.playing ? "▶" : "⏸"}</span>
              <strong data-testid="player-state">{s.playing ? "Stream playing" : "Paused"}</strong>
            </div>

            {/* Score overlay */}
            <div data-testid="score-overlay"
                 style={{ position: "absolute", left: 12, bottom: 12, right: 12, display: "flex",
                          gap: 12, alignItems: "center", flexWrap: "wrap",
                          background: "rgba(0,0,0,.6)", padding: "8px 12px", borderRadius: 8 }}>
              <span data-testid="overlay-live"
                    style={{ color: atLiveEdge ? "#ff4757" : "#9aa4b2", fontWeight: 700 }}>
                {atLiveEdge ? "● LIVE" : `● ${s.behindSeconds}s behind`}
              </span>
              <span data-testid="overlay-home">
                {m.home.short} <strong data-testid="overlay-score">{s.score.runs}/{s.score.wickets}</strong>{" "}
                <span data-testid="overlay-overs">({s.score.overs} ov)</span>
              </span>
              <span data-testid="overlay-away">{m.away.short} yet to bat</span>
            </div>
          </div>

          <Badge tone={atLiveEdge ? "bad" : "neutral"} testId="live-indicator">
            {atLiveEdge ? "LIVE" : "Behind live"}
          </Badge>

          <Row label="Score" value={`${m.home.short} ${s.score.runs}/${s.score.wickets} (${s.score.overs})`}
               testId="score-readout" />
          <Row label="Playback" value={s.playing ? "Playing" : "Paused"} testId="playback-readout" />
          <Row label="Behind live" value={`${s.behindSeconds}s`} testId="behind-readout" />

          <Field label="Quality">
            <Select value={s.quality} data-testid="quality" aria-label="Quality"
                    onChange={(e) => update((st) => { st.quality = e.target.value; return st; })}>
              {QUALITIES.map((q) => <option key={q} value={q}>{q}</option>)}
            </Select>
          </Field>

          <div className="ck-card-actions">
            <Btn data-testid="play" onClick={play} disabled={s.playing}>Play</Btn>
            <Btn variant="secondary" data-testid="pause"
                 onClick={() => update((st) => { st.playing = false; return st; })} disabled={!s.playing}>
              Pause
            </Btn>
            <Btn variant="secondary" data-testid="rewind" onClick={rewind}>−30s</Btn>
            <Btn variant="secondary" data-testid="go-live" onClick={goLive} disabled={atLiveEdge}>Go live</Btn>
            <Btn variant="ghost" data-testid="next-ball" onClick={ball}>Next ball</Btn>
          </div>
        </Card>

        <Card title="Commentary" testId="commentary">
          {m.commentary.map((line, i) => (
            <Row key={i} label={`Ball ${m.commentary.length - i}`} value={line} testId={`commentary-${i}`} />
          ))}
          <Row label="Balls bowled since you tuned in" value={s.ballsBowled} testId="balls-bowled" />
        </Card>
      </Page>
    </Shell>
  );
}
