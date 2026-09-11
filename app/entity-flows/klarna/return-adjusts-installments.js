"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Badge, KV, Btn, Check, Alert, Select, Field } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";
import { useState } from "react";

const ITEMS = [{ id: "lamp", name: "Arc floor lamp", price: 120 }, { id: "shade", name: "Linen lamp shade", price: 60 }];
const DATES = ["Sep 14, 2026", "Sep 28, 2026", "Oct 12, 2026", "Oct 26, 2026"];
export function recalc(total, paid, returned) {
  const remaining = round2(total - paid - returned);
  const per = round2(remaining / 3);
  return [{ n: 1, date: DATES[0], amount: paid, status: "Paid" }, ...[2, 3, 4].map((n, i) => ({ n, date: DATES[n - 1], amount: i === 2 ? round2(remaining - per * 2) : per, status: "Upcoming" }))];
}
const seed = () => ({ returned: [], view: "order" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [pick, setPick] = useState([]); const [reason, setReason] = useState("");
  const total = 180, paid = 45;
  const retAmt = ITEMS.filter((i) => s.returned.includes(i.id)).reduce((a, i) => a + i.price, 0);
  const sched = recalc(total, paid, retAmt);
  return (
    <MobileShell flow={flow} title="Studio Lamps order" nav={["Home", "Purchases"]}>
      <KV k="Order" v="KL-ORD-2201" /><KV k="Original total" v={money(total)} /><KV k="Returned" v={retAmt ? `−${money(retAmt)}` : "None"} testId="returned-amount" /><KV k="Remaining balance" v={money(total - paid - retAmt)} total testId="remaining" />
      {s.view === "order" && s.returned.length === 0 && <Btn variant="secondary" onClick={() => set({ ...s, view: "return" })} data-testid="report-return">Report a return</Btn>}
      {s.view === "return" && (<div className="ee-stack" data-testid="return-form">
        <div className="ee-strong ee-small">Which items are you returning?</div>
        {ITEMS.map((i) => <Check key={i.id} label={`${i.name} · ${money(i.price)}`} checked={pick.includes(i.id)} onChange={(e) => setPick(e.target.checked ? [...pick, i.id] : pick.filter((x) => x !== i.id))} />)}
        <Field label="Reason" htmlFor="ret-reason"><Select id="ret-reason" value={reason} onChange={(e) => setReason(e.target.value)}><option value="">Choose…</option><option>Changed my mind</option><option>Damaged</option><option>Wrong item</option></Select></Field>
        <Btn block disabled={!pick.length || !reason} onClick={() => { set({ ...s, returned: pick, view: "order" }); }} data-testid="submit-return">Register return</Btn>
      </div>)}
      {s.returned.length > 0 && <Alert tone="ok" data-testid="return-registered">Return registered for {ITEMS.filter((i) => s.returned.includes(i.id)).map((i) => i.name).join(", ")}. Your remaining payments were recalculated.</Alert>}
      <div className="ee-strong ee-small">Payment schedule</div>
      {sched.map((p) => <div key={p.n} className="ee-row ee-row--between ee-small" data-testid={`inst-${p.n}`}><span>{p.n}. {p.date}</span><span className="ee-row"><b className="ee-num">{money(p.amount)}</b><Badge tone={p.status === "Paid" ? "ok" : undefined}>{p.status}</Badge></span></div>)}
    </MobileShell>
  );
}
