"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { sendEmail } from "@/lib/inbox";
import { Card, Btn, Badge, KV, Alert } from "@/app/components/eval/ui";
import { Calendar, Slots, fmt12, dateLabel } from "@/app/components/engines/Booking";

const SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00"];
const AVAIL = [15, 16, 18, 21, 22];
const seed = () => ({ booking: { day: 15, slot: "09:00", ref: "CAL-150900" }, taken: { 16: ["10:00"] }, view: "inbox", day: null, slot: null, history: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const takenFor = (d) => [...(s.taken[d] || []), ...(s.booking.day === d ? [s.booking.slot] : [])];
  function confirm() { sendEmail({ to: "demo@evals.dev", subject: "Updated: 30 Minute Meeting with Priya Nair", body: `New time: September ${s.day}, 2026 · ${s.slot} Eastern.`, from: "notifications@calendlee.evals.dev", flow: "calendly/reschedule" }); const old = s.booking; set({ ...s, booking: { day: s.day, slot: s.slot, ref: `CAL-${s.day}${s.slot.replace(":", "")}` }, history: [{ from: old, to: { day: s.day, slot: s.slot } }, ...s.history], view: "done", day: null, slot: null }); }
  const b = s.booking;
  return (
    <main className="ee-main">
      {s.view === "inbox" && (
        <Card style={{ maxWidth: 640, margin: "0 auto" }} data-testid="email">
          <div className="ee-small ee-muted">Inbox · demo@evals.dev</div>
          <h2 style={{ fontSize: 18, margin: "6px 0" }}>Confirmed: 30 Minute Meeting with Priya Nair</h2>
          <KV k="When" v={<span data-testid="current-booking">{fmt12(b.slot)} · {dateLabel(b.day)} (Eastern)</span>} /><KV k="Reference" v={b.ref} />
          <div className="ee-row" style={{ marginTop: 10 }}><Btn onClick={() => set({ ...s, view: "pick" })} data-testid="reschedule-link">Reschedule</Btn><Btn variant="secondary">Cancel</Btn></div>
        </Card>
      )}
      {s.view === "pick" && (
        <Card style={{ maxWidth: 900, margin: "0 auto" }} data-testid="reschedule-page">
          <Alert tone="info">Rescheduling your {fmt12(b.slot)} {dateLabel(b.day)} meeting. Pick a new time.</Alert>
          <div className="ee-split ee-split--slots" style={{ marginTop: 12 }}>
            <Calendar availableDays={AVAIL} selected={s.day} onSelect={(d) => set({ ...s, day: d, slot: null })} />
            <div>{s.day ? <><div className="ee-small ee-strong" data-testid="slots-day">{dateLabel(s.day)}</div><Slots slots={SLOTS} busy={takenFor(s.day)} hostTz="America/New_York" viewerTz="America/New_York" selected={s.slot} onSelect={(x) => set({ ...s, slot: x })} />{s.slot && <Btn block style={{ marginTop: 10 }} onClick={confirm} data-testid="confirm-reschedule">Confirm new time</Btn>}</> : <div className="ee-small ee-muted">Select a day.</div>}</div>
          </div>
        </Card>
      )}
      {s.view === "done" && (
        <Card style={{ maxWidth: 640, margin: "0 auto" }} data-testid="rescheduled">
          <Badge tone="ok">Rescheduled</Badge>
          <KV k="New time" v={<span data-testid="new-time">{fmt12(b.slot)} · {dateLabel(b.day)}</span>} />
          <KV k="Previous time (released)" v={<span data-testid="old-time">{fmt12(s.history[0].from.slot)} · {dateLabel(s.history[0].from.day)}</span>} />
          <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ ...s, view: "pick", day: s.history[0].from.day })} data-testid="check-old-day">Check availability on the old day</Btn>
        </Card>
      )}
    </main>
  );
}
