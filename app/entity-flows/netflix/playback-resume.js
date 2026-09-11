"use client";
import { useCallback } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge } from "@/app/components/eval/ui";
import { Player, fmtTime } from "@/app/components/engines/Media";

const TITLE = { id: "t1", name: "Signal Lost", subtitle: "S1:E1 · Static", duration: 1500, poster: "🛰️" };
const seed = () => ({ session: "A", a: { position: 0, playing: false }, b: { position: 0, playing: false }, saved: null, view: "browse", resumedFrom: null });

export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const cur = s[s.session === "A" ? "a" : "b"];
  const onChange = useCallback((patch) => {
    set((st) => {
      const k = st.session === "A" ? "a" : "b";
      const next = { ...st[k], ...patch };
      // Stopping (pause) syncs the resume point to the account, like a heartbeat.
      const saved = !next.playing ? { position: Math.floor(next.position), at: "just now", from: st.session } : st.saved;
      return { ...st, [k]: next, saved };
    });
  }, [set]);
  function switchSession(to) {
    set((st) => {
      const k = to === "A" ? "a" : "b";
      const resume = st.saved ? st.saved.position : 0;
      return { ...st, session: to, view: "browse", [k]: { position: resume, playing: false } };
    });
  }
  const resumePoint = s.saved?.position || 0;
  return (
    <>
      <Topbar entity={ent} nav={["Home", "TV Shows", "Movies", "My List"]} active="Home" right={
        <div className="ee-row ee-small">
          <span className="ee-muted">Device:</span>
          <div className="ee-segment">
            <button type="button" data-active={s.session === "A" ? "true" : "false"} onClick={() => switchSession("A")} data-testid="session-a">Living room TV</button>
            <button type="button" data-active={s.session === "B" ? "true" : "false"} onClick={() => switchSession("B")} data-testid="session-b">Phone</button>
          </div>
        </div>
      } />
      <main className="ee-main">
        <div className="ee-row ee-row--between" style={{ marginBottom: 12 }}>
          <h1 className="ee-page-title" style={{ marginBottom: 0 }}>Continue watching for Demo</h1>
          <Badge data-testid="session-label">Session {s.session}: {s.session === "A" ? "Living room TV" : "Phone"}</Badge>
        </div>
        {s.view === "browse" ? (
          <Card tight style={{ maxWidth: 520 }} data-testid="continue-card">
            <div className="ee-row">
              <div className="ee-product__img ee-product__img--sm" aria-hidden="true">{TITLE.poster}</div>
              <div style={{ flex: 1 }}>
                <div className="ee-strong">{TITLE.name}</div>
                <div className="ee-small ee-muted">{TITLE.subtitle} · {fmtTime(TITLE.duration)}</div>
                <div className="ee-progress" style={{ height: 4, marginTop: 6, background: "var(--ee-border)" }}><span style={{ width: (resumePoint / TITLE.duration) * 100 + "%", background: ent.accent }} /></div>
                <div className="ee-tiny ee-muted" data-testid="resume-label">{resumePoint > 0 ? `Resume from ${fmtTime(resumePoint)} (saved from session ${s.saved.from})` : "Not started"}</div>
              </div>
              <Btn onClick={() => set({ ...s, view: "player", resumedFrom: resumePoint > 0 ? { position: resumePoint, session: s.session } : null, [s.session === "A" ? "a" : "b"]: { position: resumePoint, playing: true } })} data-testid="play-button">▶ {resumePoint > 0 ? "Resume" : "Play"}</Btn>
            </div>
          </Card>
        ) : (
          <div className="ee-stack" style={{ maxWidth: 760 }}>
            {s.resumedFrom && <div className="ee-alert ee-alert--info" data-testid="resumed-from">Resumed on session {s.resumedFrom.session} from {fmtTime(s.resumedFrom.position)} (saved from session {s.saved?.from})</div>}
            <Player title={TITLE.name} subtitle={TITLE.subtitle} duration={TITLE.duration} position={cur.position} playing={cur.playing} onChange={onChange} poster={TITLE.poster} speed={8} />
            <div className="ee-row ee-row--between ee-small">
              <span className="ee-muted">Progress is saved to your account whenever you pause or stop.</span>
              <Btn size="sm" variant="secondary" onClick={() => { onChange({ playing: false }); set((st) => ({ ...st, view: "browse" })); }} data-testid="stop-button">■ Stop and go back</Btn>
            </div>
            {s.saved && <div className="ee-tiny ee-muted" data-testid="saved-point">Last saved resume point: {fmtTime(s.saved.position)} from session {s.saved.from}</div>}
          </div>
        )}
      </main>
    </>
  );
}
