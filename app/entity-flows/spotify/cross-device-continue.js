"use client";
import { useEffect } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge } from "@/app/components/eval/ui";
import { fmtTime } from "@/app/components/engines/Media";

const TRACK = { t: "Glass Harbor", a: "Mira Sol", len: 245 };
const seed = () => ({ device: "Web Player", playing: false, position: 0 });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  useEffect(() => { if (!s.playing) return; const t = setInterval(() => set((st) => ({ ...st, position: Math.min(TRACK.len, st.position + 1) })), 1000); return () => clearInterval(t); }, [s.playing, set]);
  const Pane = ({ name, icon }) => {
    const here = s.device === name;
    return (
      <Card title={<span>{icon} {name}</span>} data-testid={`device-${name.split(" ")[0].toLowerCase()}`}>
        <div className="ee-strong">{TRACK.t}</div><div className="ee-small ee-muted">{TRACK.a}</div>
        <div className="ee-mono" style={{ margin: "8px 0" }} data-testid={`pos-${name.split(" ")[0].toLowerCase()}`}>{fmtTime(s.position)} / {fmtTime(TRACK.len)}</div>
        {here ? (<><Badge tone="ok" data-testid={`state-${name.split(" ")[0].toLowerCase()}`}>{s.playing ? "Playing on this device" : "Paused on this device"}</Badge><div className="ee-row" style={{ marginTop: 8 }}><Btn size="sm" style={{ background: "#1db954" }} onClick={() => set({ ...s, playing: !s.playing })} data-testid={`toggle-${name.split(" ")[0].toLowerCase()}`}>{s.playing ? "❚❚ Pause" : "▶ Play"}</Btn></div></>)
          : (<><Badge data-testid={`state-${name.split(" ")[0].toLowerCase()}`}>Listening on {s.device}</Badge><div className="ee-row" style={{ marginTop: 8 }}><Btn size="sm" variant="secondary" onClick={() => set({ ...s, device: name })} data-testid={`transfer-${name.split(" ")[0].toLowerCase()}`}>Play on this device</Btn></div></>)}
      </Card>
    );
  };
  return (
    <>
      <Topbar entity={ent} light={false} />
      <main className="ee-main"><h1 className="ee-page-title">Connect · two sessions, one account</h1><div className="ee-split ee-split--even">{Pane({ name: "Web Player", icon: "💻" })}{Pane({ name: "Phone", icon: "📱" })}</div></main>
    </>
  );
}
