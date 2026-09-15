"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Badge, Row, Banner } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, CHANNELS, ME, useStore, nextId } from "../shared";

export default function Huddle() {
  const [s, update] = useStore();
  const [channel, setChannel] = useState("general");
  const [notice, setNotice] = useState(null);

  function start() {
    update((st) => {
      st.huddle = { channel, startedBy: ME.name, participants: [ME.name], muted: false };
      st.messages[channel].push({
        id: nextId(st.counter++), user: ME.name, at: "now",
        text: "started a huddle", replies: [],
      });
      return st;
    });
    setNotice({ tone: "ok", msg: `Huddle started in #${channel}` });
  }

  function leave() {
    update((st) => { st.huddle = null; return st; });
    setNotice({ tone: "info", msg: "You left the huddle." });
  }

  const h = s.huddle;

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Huddles" sub="Audio-first, per channel">
        {notice && <Banner tone={notice.tone} testId="huddle-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        {!h && (
          <Card title="Start a huddle">
            <Field label="Channel">
              <Select value={channel} data-testid="huddle-channel" aria-label="Channel"
                      onChange={(e) => setChannel(e.target.value)}>
                {CHANNELS.map((c) => <option key={c.id} value={c.id}>#{c.name}</option>)}
              </Select>
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={start} data-testid="start-huddle">Start huddle</Btn>
            </div>
          </Card>
        )}

        {h && (
          <Card title={`Huddle in #${h.channel}`} tone="ok" testId="huddle-active">
            <Badge tone="ok" testId="huddle-status">Huddle active</Badge>
            <Row label="Channel" value={`#${h.channel}`} testId="huddle-channel-name" />
            <Row label="Started by" value={h.startedBy} />
            <Row label="Participants" value={h.participants.length} testId="huddle-participants" />
            <Row label="Microphone" value={h.muted ? "Muted" : "Live"} testId="huddle-mic" />
            <div className="ck-card-actions">
              <Btn variant="secondary" data-testid="toggle-mic"
                   onClick={() => update((st) => { st.huddle.muted = !st.huddle.muted; return st; })}>
                {h.muted ? "Unmute" : "Mute"}
              </Btn>
              <Btn variant="danger" onClick={leave} data-testid="leave-huddle">Leave</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
