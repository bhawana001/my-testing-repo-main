"use client";
import { useState } from "react";
import { sendEmail } from "@/lib/inbox";
import { useFlowState, storageKey } from "@/lib/state";
import { Card, Btn, Badge, KV, Field, Input } from "@/app/components/eval/ui";
import { Calendar, Slots, fmt12, dateLabel } from "@/app/components/engines/Booking";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { money } from "@/lib/seed";

const PRICE = 75;
const seed = () => ({ step: "pick", day: null, slot: null, booking: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [name, setName] = useState("Demo User");
  return (
    <main className="ee-main">
      <Card style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="ee-row ee-row--between" style={{ marginBottom: 12 }}><div><div className="ee-small ee-muted">Tom Alvarez · Strategy Studio</div><h1 style={{ fontSize: 22 }}>Strategy Consultation</h1><div className="ee-small ee-muted">60 min · Eastern Time</div></div><Badge tone="accent" data-testid="event-price">{money(PRICE)}</Badge></div>
        {s.step === "pick" && (<div className="ee-split ee-split--slots"><Calendar availableDays={[15, 16, 22, 23]} selected={s.day} onSelect={(d) => set({ ...s, day: d, slot: null })} /><div>{s.day ? <><div className="ee-small ee-strong">{dateLabel(s.day)}</div><Slots slots={["10:00", "13:00", "15:00"]} hostTz="America/New_York" viewerTz="America/New_York" selected={s.slot} onSelect={(x) => set({ ...s, slot: x })} />{s.slot && <Btn block style={{ marginTop: 10 }} onClick={() => set({ ...s, step: "pay" })} data-testid="slot-next">Next</Btn>}</> : <div className="ee-small ee-muted">Select a day.</div>}</div></div>)}
        {s.step === "pay" && (<div className="ee-split" data-testid="pay-step"><div className="ee-stack"><div className="ee-strong">{fmt12(s.slot)} · {dateLabel(s.day)}</div><Field label="Name" htmlFor="pb-name"><Input id="pb-name" value={name} onChange={(e) => setName(e.target.value)} /></Field><Field label="Email"><Input readOnly value="demo@evals.dev" aria-label="Email" /></Field></div><div><PaymentForm amount={PRICE} allow3ds={false} buttonLabel={`Pay ${money(PRICE)} and schedule`} onSuccess={(p) => { sendEmail({ to: "demo@evals.dev", subject: "Receipt: Strategy Consultation · $75.00", body: `Receipt RCPT-${s.day}${s.slot.replace(":", "")} · Visa •••• ${p.last4}`, from: "receipts@calendlee.evals.dev", flow: "calendly/paid-booking" }); set({ ...s, step: "done", booking: { receipt: "RCPT-" + s.day + s.slot.replace(":", ""), card: p.last4, name } }); }} /></div></div>)}
        {s.step === "done" && s.booking && (<div className="ee-stack" data-testid="paid-confirmation"><Badge tone="ok">Booking confirmed</Badge><KV k="When" v={`${fmt12(s.slot)} · ${dateLabel(s.day)}`} testId="paid-when" /><Card tight data-testid="receipt"><div className="ee-strong">Payment receipt</div><KV k="Receipt #" v={s.booking.receipt} testId="receipt-no" /><KV k="Amount paid" v={money(PRICE)} testId="receipt-amount" /><KV k="Card" v={`Visa •••• ${s.booking.card}`} /><KV k="Billed to" v={s.booking.name} /></Card></div>)}
      </Card>
    </main>
  );
}
