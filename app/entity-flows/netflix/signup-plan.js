"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge, KV, RadioCard, Field, Input, Stepper, Alert } from "@/app/components/eval/ui";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { money, isValidEmail } from "@/lib/seed";
import { useState } from "react";

const PLANS = [{ id: "basic", name: "Standard with ads", price: 6.99, q: "1080p · ads" }, { id: "standard", name: "Standard", price: 15.49, q: "1080p · 2 screens · no ads" }, { id: "premium", name: "Premium", price: 22.99, q: "4K + HDR · 4 screens" }];
const seed = () => ({ step: 0, plan: "standard", email: "", account: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [pw, setPw] = useState(""); const [err, setErr] = useState(null);
  const plan = PLANS.find((p) => p.id === s.plan);
  return (
    <>
      <Topbar entity={ent} light={false} />
      <main className="ee-main ee-main--narrow">
        {s.account ? (
          <Card data-testid="account">
            <Badge tone="ok" data-testid="account-status">Membership active</Badge>
            <h1 style={{ fontSize: 22, margin: "8px 0" }}>Welcome to Netflixy, {s.account.email}</h1>
            <KV k="Your plan" v={<span data-testid="account-plan">{s.account.plan.name}</span>} /><KV k="Price" v={`${money(s.account.plan.price)}/month`} testId="account-price" /><KV k="Next billing date" v="October 14, 2026" /><KV k="Payment" v={`Visa •••• ${s.account.card}`} />
          </Card>
        ) : (<>
          <Stepper steps={["Choose plan", "Create account", "Payment"]} current={s.step} />
          {s.step === 0 && (<Card title="Choose the plan that's right for you" data-testid="plans">
            <div className="ee-stack" role="radiogroup">{PLANS.map((p) => <RadioCard key={p.id} name="plan" value={p.id} checked={s.plan === p.id} onChange={(v) => set({ ...s, plan: v })} title={p.name} desc={p.q} right={`${money(p.price)}/mo`} />)}</div>
            <Btn block style={{ marginTop: 12, background: "#e50914" }} onClick={() => set({ ...s, step: 1 })} data-testid="plan-next">Next</Btn>
          </Card>)}
          {s.step === 1 && (<Card title="Create a password to start your membership" data-testid="account-form"><div className="ee-stack">
            <Field label="Email" htmlFor="nf-email"><Input id="nf-email" type="email" value={s.email} onChange={(e) => set({ ...s, email: e.target.value })} /></Field>
            <Field label="Password" htmlFor="nf-pw" help="At least 8 characters"><Input id="nf-pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} /></Field>
            {err && <Alert tone="err">{err}</Alert>}
            <Btn style={{ background: "#e50914" }} onClick={() => { if (!isValidEmail(s.email)) { setErr("Enter a valid email."); return; } if (pw.length < 8) { setErr("Password must be at least 8 characters."); return; } setErr(null); set({ ...s, step: 2 }); }} data-testid="account-next">Next</Btn>
          </div></Card>)}
          {s.step === 2 && (<Card title="Set up your credit or debit card" data-testid="payment-step">
            <KV k="Plan" v={`${plan.name} · ${money(plan.price)}/month`} testId="pay-plan" />
            <PaymentForm amount={plan.price} allow3ds={false} buttonLabel="Start Membership" onSuccess={(p) => set({ ...s, account: { email: s.email, plan, card: p.last4 } })} />
          </Card>)}
        </>)}
      </main>
    </>
  );
}
