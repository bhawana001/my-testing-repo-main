"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SlackShell } from "./_shell";
import { Message } from "@/app/components/engines/Feed";
import { Btn, Badge, Card } from "@/app/components/eval/ui";
import { fmtTime } from "@/app/components/engines/Media";

const seed = () => ({ huddle: null, muted: false });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [t, setT] = useState(0);
  useEffect(() => { if (!s.huddle) { setT(0); return; } const i = setInterval(() => setT((x) => x + 1), 1000); return () => clearInterval(i); }, [s.huddle]);
  return (
    <SlackShell flow={flow} active="design" sideExtra={s.huddle && <div className="ee-small" style={{ padding: "10px", color: "#fff" }} data-testid="sidebar-huddle">🎧 Huddle in #design</div>}
      header={<div className="ee-row ee-row--between" style={{ marginBottom: 12 }}><h1 style={{ fontSize: 18 }}># design {s.huddle && <Badge tone="ok" data-testid="channel-huddle-badge">🎧 Huddle</Badge>}</h1>{!s.huddle && <Btn size="sm" variant="secondary" onClick={() => set({ ...s, huddle: { started: "10:04 AM", people: ["Demo User"] } })} data-testid="start-huddle">🎧 Start huddle</Btn>}</div>}>
      <div className="ee-feed"><Message msg={{ id: "m1", author: "Priya Nair", time: "9:55 AM", text: "Anyone free to review the icon set live?" }} /></div>
      {s.huddle && (
        <Card style={{ position: "sticky", bottom: 16, marginTop: 20, background: "#1a1d21", color: "#fff", borderColor: "#1a1d21" }} data-testid="huddle-bar">
          <div className="ee-row ee-row--between">
            <div><div className="ee-strong" data-testid="huddle-status">Huddle active in #design</div><div className="ee-tiny" style={{ opacity: 0.8 }}>Started {s.huddle.started} · <span data-testid="huddle-timer">{fmtTime(t)}</span> · {s.huddle.people.length} participant</div></div>
            <div className="ee-row"><Btn size="sm" variant="secondary" onClick={() => set({ ...s, muted: !s.muted })} aria-pressed={s.muted} data-testid="huddle-mute">{s.muted ? "🔇 Unmute" : "🎙️ Mute"}</Btn><Btn size="sm" variant="danger" onClick={() => set(seed())} data-testid="huddle-leave">Leave</Btn></div>
          </div>
        </Card>
      )}
    </SlackShell>
  );
}
