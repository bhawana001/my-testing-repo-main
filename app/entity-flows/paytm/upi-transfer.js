"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Btn, Alert, KV, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const PIN = "1234";
const seed = () => ({ history: [{ id: "h1", to: "ravi@okaxis", amount: 250, note: "Cab", when: "12 Sep, 6:10 PM" }], stage: "form", last: null, balance: 5000 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [vpa, setVpa] = useState(""); const [amt, setAmt] = useState(""); const [note, setNote] = useState(""); const [pin, setPin] = useState(""); const [err, setErr] = useState(null);
  function next() {
    if (!/^[\w.\-]{2,}@[a-z]{2,}$/i.test(vpa)) { setErr("Enter a valid UPI ID like name@bank."); return; }
    if (!(Number(amt) > 0) || Number(amt) > s.balance) { setErr("Enter an amount within your balance."); return; }
    setErr(null); set({ ...s, stage: "pin" });
  }
  function pay() {
    if (pin !== PIN) { setErr("Incorrect UPI PIN."); return; }
    const tx = { id: "h" + (s.history.length + 1), to: vpa, amount: Number(amt), note, when: "14 Sep, 10:05 AM", ref: "UPI" + String(300000000000 + s.history.length * 7).slice(-12) };
    set({ ...s, stage: "done", last: tx, history: [tx, ...s.history], balance: s.balance - tx.amount }); setErr(null);
  }
  return (
    <MobileShell flow={flow} title="Send money · UPI" nav={["Home", "UPI", "Recharge", "Bills"]}>
      {s.stage === "form" && (<>
        <Field label="Enter UPI ID" htmlFor="pt-vpa" error={err}><Input id="pt-vpa" value={vpa} onChange={(e) => setVpa(e.target.value)} placeholder="name@bank" /></Field>
        <Field label="Amount (₹)" htmlFor="pt-amt"><Input id="pt-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
        <Field label="Add a note" htmlFor="pt-note"><Input id="pt-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Lunch" /></Field>
        <Btn block onClick={next} data-testid="upi-proceed">Proceed to pay</Btn>
      </>)}
      {s.stage === "pin" && (<>
        <KV k="To" v={vpa} /><KV k="Amount" v={money(Number(amt), "INR")} />
        <Field label="Enter UPI PIN" htmlFor="pt-pin" error={err} help="Demo PIN 1234"><Input id="pt-pin" type="password" inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} /></Field>
        <Btn block onClick={pay} data-testid="upi-pay">Pay {money(Number(amt), "INR")}</Btn>
      </>)}
      {s.stage === "done" && s.last && (<div className="ee-stack" data-testid="upi-success">
        <div className="ee-center"><div style={{ fontSize: 40 }}>✅</div><div className="ee-strong" style={{ fontSize: 18 }}>Payment successful</div></div>
        <KV k="Paid to" v={s.last.to} testId="success-to" /><KV k="Amount" v={money(s.last.amount, "INR")} testId="success-amount" />{s.last.note && <KV k="Note" v={s.last.note} testId="success-note" />}<KV k="UPI ref" v={<span className="ee-mono">{s.last.ref}</span>} testId="success-ref" />
        <Btn variant="secondary" size="sm" onClick={() => { setVpa(""); setAmt(""); setNote(""); setPin(""); set({ ...s, stage: "form" }); }}>Send again</Btn>
      </div>)}
      <div className="ee-strong ee-small" style={{ marginTop: 6 }}>History</div>
      <div className="ee-stack" data-testid="history" style={{ gap: 6 }}>
        {s.history.map((h) => <div key={h.id} className="ee-row ee-row--between ee-small" data-testid={`history-${h.id}`}><span>Paid to <b>{h.to}</b>{h.note ? ` · ${h.note}` : ""}<div className="ee-tiny ee-muted">{h.when}</div></span><span className="ee-num">−{money(h.amount, "INR")}</span></div>)}
      </div>
    </MobileShell>
  );
}
