"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Select, Btn, KV, Badge, Skeleton, useDelay } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const BILLS = { "1002003004": { name: "Demo User", amount: 1842, due: "20 Sep 2026", period: "Aug 2026", units: 312 } };
const seed = () => ({ stage: "form", bill: null, paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const delay = useDelay();
  const [board, setBoard] = useState("BESCOM-ish (Bengaluru)"); const [cn, setCn] = useState(""); const [err, setErr] = useState(null); const [busy, setBusy] = useState(false);
  async function fetchBill() {
    if (!/^\d{10}$/.test(cn)) { setErr("Consumer number must be 10 digits."); return; }
    setErr(null); setBusy(true); await delay(700); setBusy(false);
    const b = BILLS[cn];
    if (!b) { setErr("No pending bill found for this consumer number. Try 1002003004."); return; }
    set({ ...s, stage: "bill", bill: { ...b, cn, board } });
  }
  return (
    <MobileShell flow={flow} title="Electricity bill" nav={["Home", "UPI", "Recharge", "Bills"]}>
      {s.stage === "form" && (<>
        <Field label="Electricity board" htmlFor="eb-board"><Select id="eb-board" value={board} onChange={(e) => setBoard(e.target.value)}>{["BESCOM-ish (Bengaluru)", "MSEB-ish (Mumbai)", "TATA Power-ish (Delhi)"].map((b) => <option key={b}>{b}</option>)}</Select></Field>
        <Field label="Consumer number" htmlFor="eb-cn" error={err} help="Demo: 1002003004"><Input id="eb-cn" inputMode="numeric" value={cn} onChange={(e) => setCn(e.target.value)} /></Field>
        {busy && <Skeleton h={40} />}
        <Btn block loading={busy} onClick={fetchBill} data-testid="eb-fetch">Fetch bill</Btn>
      </>)}
      {s.stage === "bill" && s.bill && (<div className="ee-stack" data-testid="fetched-bill">
        <Badge tone="info">Bill fetched</Badge>
        <KV k="Consumer" v={`${s.bill.name} · ${s.bill.cn}`} /><KV k="Board" v={s.bill.board} /><KV k="Billing period" v={`${s.bill.period} · ${s.bill.units} units`} /><KV k="Due date" v={s.bill.due} />
        <KV k="Bill amount" v={money(s.bill.amount, "INR")} total testId="bill-amount" />
        <Btn block onClick={() => set({ ...s, stage: "done", paid: { amount: s.bill.amount, ref: "EB" + s.bill.cn.slice(-4) + "0914" } })} data-testid="eb-pay">Pay {money(s.bill.amount, "INR")}</Btn>
      </div>)}
      {s.stage === "done" && s.paid && (<div className="ee-stack" data-testid="eb-success">
        <div className="ee-center"><div style={{ fontSize: 40 }}>✅</div><div className="ee-strong" style={{ fontSize: 18 }}>Bill paid</div></div>
        <KV k="Fetched amount" v={money(s.bill.amount, "INR")} testId="fetched-amount" /><KV k="Amount paid" v={money(s.paid.amount, "INR")} total testId="paid-amount" /><KV k="Reference" v={<span className="ee-mono">{s.paid.ref}</span>} />
        <Btn variant="secondary" size="sm" onClick={() => { setCn(""); set(seed()); }}>Pay another bill</Btn>
      </div>)}
    </MobileShell>
  );
}
