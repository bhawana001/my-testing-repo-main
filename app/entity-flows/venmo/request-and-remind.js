"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Select, Btn, Badge, Alert } from "@/app/components/eval/ui";

const seed = () => ({ requests: [], seq: 1 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [to, setTo] = useState("Priya Nair"); const [amt, setAmt] = useState(""); const [note, setNote] = useState(""); const [err, setErr] = useState(null);
  function request() {
    if (!(Number(amt) > 0)) { setErr("Enter an amount."); return; }
    setErr(null);
    set({ ...s, seq: s.seq + 1, requests: [{ id: "r" + s.seq, to, amount: Number(amt), note, status: "Pending", reminders: 0 }, ...s.requests] }); setAmt(""); setNote("");
  }
  const remind = (id) => set({ ...s, requests: s.requests.map((r) => (r.id === id ? { ...r, reminders: r.reminders + 1, lastReminder: "Just now" } : r)) });
  return (
    <MobileShell flow={flow} title="Request" nav={["Feed", "Pay", "Cards"]}>
      <Field label="From" htmlFor="rq-to"><Select id="rq-to" value={to} onChange={(e) => setTo(e.target.value)}>{["Priya Nair", "Tom Alvarez", "Sam Lee"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
      <Field label="Amount" htmlFor="rq-amt" error={err}><Input id="rq-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="$0" /></Field>
      <Field label="Note" htmlFor="rq-note"><Input id="rq-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Your half of dinner" /></Field>
      <Btn block onClick={request} data-testid="rq-send">Request</Btn>
      <div className="ee-strong ee-small">Outgoing requests</div>
      {s.requests.length === 0 && <div className="ee-tiny ee-muted">No requests yet.</div>}
      {s.requests.map((r) => (
        <div key={r.id} className="ee-card ee-card--flat ee-card--tight ee-small" data-testid={`req-${r.id}`}>
          <div className="ee-row ee-row--between"><span><b>{r.to}</b> · ${r.amount.toFixed(2)}{r.note ? ` · ${r.note}` : ""}</span><Badge tone="warn" data-testid={`req-${r.id}-status`}>{r.status}</Badge></div>
          <div className="ee-row ee-row--between" style={{ marginTop: 6 }}>
            <span className="ee-tiny ee-muted" data-testid={`req-${r.id}-reminder`}>{r.reminders ? `Reminder sent (${r.reminders}) · ${r.lastReminder}` : "No reminder sent"}</span>
            <Btn size="sm" variant="secondary" onClick={() => remind(r.id)} data-testid={`req-${r.id}-remind`}>Remind</Btn>
          </div>
        </div>
      ))}
    </MobileShell>
  );
}
