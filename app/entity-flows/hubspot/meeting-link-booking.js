"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Card, Btn, Field, Input, Alert, KV, Badge } from "@/app/components/eval/ui";
import { Calendar, Slots, fmt12, dateLabel } from "@/app/components/engines/Booking";
import { isValidEmail } from "@/lib/seed";

const AVAIL = [15, 16, 17, 18, 22, 23, 24];
const SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00"];
const BUSY = { 16: ["10:00", "11:00"] };
const seed = () => ({ day: null, slot: null, meetings: [], step: "pick" });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ first: "", last: "", email: "" }); const [err, setErr] = useState(null);
  function book() {
    if (!f.first || !f.last || !isValidEmail(f.email)) { setErr("Enter your first name, last name and a valid email."); return; }
    setErr(null);
    const m = { id: "MTG-" + s.day + s.slot.replace(":", ""), who: `${f.first} ${f.last}`, email: f.email, day: s.day, slot: s.slot };
    set({ ...s, meetings: [m, ...s.meetings], step: "done" });
  }
  const last = s.meetings[0];
  return (
    <main className="ee-main">
      <Card style={{ maxWidth: 880, margin: "0 auto" }} data-testid="meeting-page">
        <div className="ee-row" style={{ marginBottom: 14 }}><span className="ee-avatar ee-avatar--round">PN</span><div><div className="ee-strong">Priya Nair · {ent.skin} Sales</div><div className="ee-small ee-muted">Product demo · 30 min · Eastern Time</div></div></div>
        {s.step === "done" && last ? (
          <div className="ee-stack" data-testid="meeting-confirmed">
            <Badge tone="ok">Booking confirmed</Badge>
            <h2 style={{ fontSize: 20 }}>You're booked with Priya Nair</h2>
            <KV k="When" v={`${fmt12(last.slot)} · ${dateLabel(last.day)}`} testId="meeting-when" /><KV k="Invitee" v={`${last.who} (${last.email})`} /><KV k="Meeting ID" v={<span className="ee-mono">{last.id}</span>} testId="meeting-id" />
            <Alert tone="info">A calendar invite has been sent. The meeting also appears on the contact record in the CRM.</Alert>
            <Btn variant="secondary" size="sm" onClick={() => set({ ...s, step: "pick", day: null, slot: null })}>Book another time</Btn>
          </div>
        ) : s.step === "details" ? (
          <div className="ee-stack" data-testid="meeting-details" style={{ maxWidth: 420 }}>
            <div className="ee-strong">{fmt12(s.slot)} · {dateLabel(s.day)}</div>
            <Field label="First name" htmlFor="mt-first"><Input id="mt-first" value={f.first} onChange={(e) => setF({ ...f, first: e.target.value })} /></Field>
            <Field label="Last name" htmlFor="mt-last"><Input id="mt-last" value={f.last} onChange={(e) => setF({ ...f, last: e.target.value })} /></Field>
            <Field label="Email" htmlFor="mt-email"><Input id="mt-email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
            {err && <Alert tone="err">{err}</Alert>}
            <div className="ee-row"><Btn variant="secondary" onClick={() => set({ ...s, step: "pick" })}>Back</Btn><Btn onClick={book} data-testid="confirm-meeting">Confirm</Btn></div>
          </div>
        ) : (
          <div className="ee-split ee-split--slots">
            <Calendar availableDays={AVAIL} selected={s.day} onSelect={(d) => set({ ...s, day: d, slot: null })} />
            <div>{s.day ? (<><div className="ee-small ee-strong" style={{ marginBottom: 8 }} data-testid="slots-day">{dateLabel(s.day)}</div><Slots slots={SLOTS} busy={BUSY[s.day] || []} hostTz="America/New_York" viewerTz="America/New_York" selected={s.slot} onSelect={(slot) => set({ ...s, slot, step: "details" })} /></>) : <div className="ee-small ee-muted">Select a day to see times.</div>}</div>
          </div>
        )}
      </Card>
    </main>
  );
}
