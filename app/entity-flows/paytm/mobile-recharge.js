"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Btn, RadioCard, KV, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const PLANS = [{ id: "p239", price: 239, desc: "1.5 GB/day · 28 days · Unlimited calls" }, { id: "p479", price: 479, desc: "1.5 GB/day · 56 days · Unlimited calls" }, { id: "p719", price: 719, desc: "2 GB/day · 84 days · Unlimited calls" }];
const seed = () => ({ stage: "number", number: "", plan: null, receipt: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [err, setErr] = useState(null);
  const plan = PLANS.find((p) => p.id === s.plan);
  return (
    <MobileShell flow={flow} title="Mobile recharge" nav={["Home", "UPI", "Recharge", "Bills"]}>
      {s.stage === "number" && (<>
        <Field label="Prepaid mobile number" htmlFor="rc-num" error={err}><Input id="rc-num" inputMode="numeric" value={s.number} onChange={(e) => set({ ...s, number: e.target.value })} placeholder="10-digit number" /></Field>
        <Btn block onClick={() => { if (!/^\d{10}$/.test(s.number)) { setErr("Enter a 10-digit mobile number."); return; } setErr(null); set({ ...s, stage: "plans" }); }} data-testid="rc-continue">Browse plans</Btn>
      </>)}
      {s.stage === "plans" && (<>
        <div className="ee-small ee-muted">Plans for <b>{s.number}</b> · Jio-ish Prepaid</div>
        <div className="ee-stack" role="radiogroup" aria-label="Plans" data-testid="plans">
          {PLANS.map((p) => <RadioCard key={p.id} name="plan" value={p.id} checked={s.plan === p.id} onChange={(v) => set({ ...s, plan: v })} title={money(p.price, "INR")} desc={p.desc} />)}
        </div>
        <Btn block disabled={!plan} onClick={() => set({ ...s, stage: "pay" })} data-testid="rc-proceed">{plan ? `Proceed to pay ${money(plan.price, "INR")}` : "Select a plan"}</Btn>
      </>)}
      {s.stage === "pay" && plan && (<>
        <KV k="Number" v={s.number} /><KV k="Plan" v={plan.desc} /><KV k="Amount" v={money(plan.price, "INR")} total testId="pay-amount" />
        <div className="ee-small ee-muted">Paying from Paytum Wallet · balance ₹5,000.00</div>
        <Btn block onClick={() => set({ ...s, stage: "done", receipt: { id: "RC" + plan.price + "0914", charged: plan.price } })} data-testid="rc-pay">Pay {money(plan.price, "INR")}</Btn>
      </>)}
      {s.stage === "done" && s.receipt && (<div className="ee-stack" data-testid="rc-receipt">
        <div className="ee-center"><div style={{ fontSize: 40 }}>✅</div><div className="ee-strong" style={{ fontSize: 18 }}>Recharge successful</div></div>
        <KV k="Receipt" v={<span className="ee-mono">{s.receipt.id}</span>} testId="receipt-id" /><KV k="Number" v={s.number} /><KV k="Plan" v={plan.desc} />
        <KV k="Amount charged" v={money(s.receipt.charged, "INR")} total testId="receipt-charged" />
        <Badge tone="ok">Wallet debited {money(s.receipt.charged, "INR")}</Badge>
        <Btn variant="secondary" size="sm" onClick={() => set(seed())}>New recharge</Btn>
      </div>)}
    </MobileShell>
  );
}
