"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, Field, Input } from "@/app/components/eval/ui";
import { Tiles } from "@/app/components/engines/Meeting";
import { useState } from "react";

const seed = () => ({ guest: "outside", name: "" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [name, setName] = useState("Sam Lee");
  const inMeeting = [{ name: "Demo User" }, ...(s.guest === "admitted" ? [{ name: s.name }] : [])];
  return (
    <SaasShell flow={flow} nav={["Home", "Meetings", "Recordings"]} active="Meetings" title="Weekly sync · 851 2204 7731" sub="Waiting room is ON">
      <div className="ee-split ee-split--even">
        <Card title="Host view · Demo User" data-testid="host-panel">
          <Tiles people={inMeeting} testIdPrefix="host-tiles" />
          <div className="ee-divider" />
          <div className="ee-strong ee-small" data-testid="waiting-count">Waiting room ({s.guest === "waiting" ? 1 : 0})</div>
          {s.guest === "waiting" ? (
            <div className="ee-row ee-row--between" style={{ marginTop: 6 }} data-testid="waiting-entry"><span>{s.name}</span><span className="ee-row"><Btn size="sm" onClick={() => set({ ...s, guest: "admitted" })} data-testid="admit">Admit</Btn><Btn size="sm" variant="secondary" onClick={() => set({ ...s, guest: "removed" })} data-testid="remove">Remove</Btn></span></div>
          ) : <div className="ee-tiny ee-muted">Nobody is waiting.</div>}
          <div className="ee-small" style={{ marginTop: 8 }} data-testid="participant-count">Participants: {inMeeting.length}</div>
        </Card>
        <Card title="Guest view" data-testid="guest-panel">
          {s.guest === "outside" && (<div className="ee-stack">
            <Field label="Your name" htmlFor="guest-name"><Input id="guest-name" value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Btn onClick={() => set({ ...s, guest: "waiting", name: name.trim() || "Guest" })} data-testid="guest-join">Join meeting</Btn>
          </div>)}
          {s.guest === "waiting" && <div className="ee-center" data-testid="guest-waiting"><div style={{ fontSize: 40 }}>⏳</div><div className="ee-strong">Please wait, the meeting host will let you in soon.</div><div className="ee-small ee-muted">Weekly sync</div></div>}
          {s.guest === "admitted" && <div data-testid="guest-in-meeting"><Badge tone="ok">You're in the meeting</Badge><div style={{ height: 8 }} /><Tiles people={inMeeting} testIdPrefix="guest-tiles" /></div>}
          {s.guest === "removed" && <div className="ee-center" data-testid="guest-removed"><div className="ee-strong">The host has removed you from the waiting room.</div></div>}
        </Card>
      </div>
    </SaasShell>
  );
}
