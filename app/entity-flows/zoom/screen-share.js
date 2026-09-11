"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, Modal, RadioCard } from "@/app/components/eval/ui";
import { Tiles, Controls } from "@/app/components/engines/Meeting";

const WINDOWS = ["Entire screen", "Q3 Roadmap.pptx", "Browser · Metrics dashboard"];
const seed = () => ({ sharing: null, muted: false });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [pick, setPick] = useState(WINDOWS[1]);
  const people = [{ name: "Demo User", muted: s.muted }, { name: "Priya Nair" }, { name: "Tom Alvarez", muted: true }];
  const share = s.sharing ? { by: "Demo User", what: s.sharing } : null;
  return (
    <SaasShell flow={flow} nav={["Home", "Meetings", "Recordings"]} active="Meetings" title="Weekly sync · in meeting">
      <div className="ee-split ee-split--even">
        <Card title="Your view (host)" data-testid="host-view" style={{ background: "#0f131a", color: "#fff", borderColor: "#0f131a" }}>
          {s.sharing && <div style={{ background: "#16a34a", color: "#fff", borderRadius: 8, padding: "6px 10px", marginBottom: 8 }} className="ee-row ee-row--between" data-testid="share-indicator"><span className="ee-strong">You are sharing: {s.sharing}</span><Btn size="sm" variant="danger" onClick={() => set({ ...s, sharing: null })} data-testid="stop-share">Stop share</Btn></div>}
          <Tiles people={people} testIdPrefix="host" />
          <Controls muted={s.muted} onMute={() => set({ ...s, muted: !s.muted })} onLeave={() => set(seed())} testIdPrefix="zoom" extra={!s.sharing && <Btn size="sm" variant="ok" onClick={() => setOpen(true)} data-testid="share-screen">🖥️ Share screen</Btn>} />
        </Card>
        <Card title="Participant view · Priya Nair" data-testid="participant-view">
          {share ? <><Badge tone="ok" data-testid="viewer-indicator">Demo User is sharing</Badge><div style={{ height: 8 }} /><Tiles people={[]} sharing={share} testIdPrefix="viewer" /></> : <><div className="ee-small ee-muted" data-testid="viewer-indicator">No one is sharing</div><div style={{ height: 8 }} /><Tiles people={people} testIdPrefix="viewer" /></>}
        </Card>
      </div>
      <Modal open={open} title="Select a window or an application to share" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="share-picker">
          {WINDOWS.map((w) => <RadioCard key={w} name="win" value={w} checked={pick === w} onChange={setPick} title={w} />)}
          <Btn onClick={() => { set({ ...s, sharing: pick }); setOpen(false); }} data-testid="share-confirm">Share</Btn>
        </div>
      </Modal>
    </SaasShell>
  );
}
