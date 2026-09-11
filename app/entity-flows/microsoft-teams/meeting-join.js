"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, Toggle, Alert } from "@/app/components/eval/ui";
import { Tiles, Controls } from "@/app/components/engines/Meeting";
import { fmtTime } from "@/app/components/engines/Media";

const DAYS = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18"];
const EVENTS = [{ id: "e1", day: 0, time: "10:30–11:00", title: "Sprint planning", org: "Priya Nair" }, { id: "e2", day: 2, time: "14:00–15:00", title: "Design review", org: "Tom Alvarez" }];
const seed = () => ({ stage: "calendar", event: null, mic: true, camera: false, muted: false, left: false });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [t, setT] = useState(0);
  useEffect(() => { if (s.stage !== "meeting") return; const i = setInterval(() => setT((x) => x + 1), 1000); return () => clearInterval(i); }, [s.stage]);
  const ev = EVENTS.find((e) => e.id === s.event);
  return (
    <SaasShell flow={flow} nav={["Activity", "Chat", "Teams", "Calendar", "Files"]} active="Calendar" title={s.stage === "meeting" ? ev.title : "Calendar · Week of Sep 14"}>
      {s.left && <Alert tone="info" data-testid="left-meeting">You left the meeting.</Alert>}
      {s.stage === "calendar" && (
        <div className="ee-grid" style={{ gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 8 }} data-testid="calendar">
          {DAYS.map((d, i) => <Card key={d} tight><div className="ee-strong ee-small">{d}</div>{EVENTS.filter((e) => e.day === i).map((e) => <button key={e.id} type="button" className="ee-card ee-card--flat ee-card--tight" style={{ width: "100%", textAlign: "left", marginTop: 6, cursor: "pointer", borderLeft: "4px solid var(--ee-accent)" }} onClick={() => set({ ...s, stage: "details", event: e.id, left: false })} data-testid={`event-${e.id}`}><div className="ee-small ee-strong">{e.title}</div><div className="ee-tiny ee-muted">{e.time}</div></button>)}</Card>)}
        </div>
      )}
      {s.stage === "details" && ev && (
        <Card style={{ maxWidth: 560 }} data-testid="event-details"><h2 style={{ fontSize: 20 }}>{ev.title}</h2><div className="ee-small ee-muted">{DAYS[ev.day]} Sep · {ev.time} · Organizer {ev.org}</div><div className="ee-row" style={{ marginTop: 12 }}><Btn onClick={() => set({ ...s, stage: "prejoin" })} data-testid="join-from-calendar">Join</Btn><Btn variant="secondary" onClick={() => set({ ...s, stage: "calendar" })}>Close</Btn></div></Card>
      )}
      {s.stage === "prejoin" && ev && (
        <Card style={{ maxWidth: 560 }} data-testid="prejoin">
          <div className="ee-strong">Choose your video and audio options</div>
          <div style={{ background: "#1f2430", color: "#fff", borderRadius: 10, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0" }}>{s.camera ? "📷 Camera preview" : "Your camera is off"}</div>
          <div className="ee-row ee-row--between"><span>Camera</span><Toggle checked={s.camera} label="Camera" onChange={(v) => set({ ...s, camera: v })} /></div>
          <div className="ee-row ee-row--between" style={{ marginTop: 6 }}><span>Microphone</span><Toggle checked={!s.muted} label="Microphone" onChange={(v) => set({ ...s, muted: !v })} /></div>
          <Btn block style={{ marginTop: 12 }} onClick={() => set({ ...s, stage: "meeting" })} data-testid="join-now">Join now</Btn>
        </Card>
      )}
      {s.stage === "meeting" && ev && (
        <Card data-testid="in-meeting" style={{ background: "#0f131a", borderColor: "#0f131a", color: "#fff" }}>
          <div className="ee-row ee-row--between" style={{ marginBottom: 10 }}><span className="ee-strong">{ev.title}</span><span className="ee-row"><Badge tone="ok" data-testid="in-meeting-badge">In meeting</Badge><span className="ee-mono" data-testid="meeting-timer">{fmtTime(t)}</span></span></div>
          <Tiles people={[{ name: "Demo User", muted: s.muted }, { name: "Priya Nair", muted: false }, { name: "Tom Alvarez", muted: true }]} />
          <Controls muted={s.muted} camera={s.camera} onMute={() => set({ ...s, muted: !s.muted })} onCamera={() => set({ ...s, camera: !s.camera })} onLeave={() => set({ ...seed(), left: true })} testIdPrefix="teams" />
          <div className="ee-tiny" style={{ marginTop: 6, opacity: 0.8 }} data-testid="mic-state">Microphone {s.muted ? "muted" : "on"}</div>
        </Card>
      )}
    </SaasShell>
  );
}
