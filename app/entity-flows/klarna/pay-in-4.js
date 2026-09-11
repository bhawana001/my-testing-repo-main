"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess, PopupWindow } from "@/app/components/engines/PaymentPage";
import { Btn, Field, Input, KV, RadioCard, Alert, useDelay } from "@/app/components/eval/ui";
import { money, round2, OTP } from "@/lib/seed";

export const AMOUNT = 180.0;
export function schedule(amount, start = "Sep 14, 2026") {
  const per = round2(amount / 4);
  const dates = ["Sep 14, 2026", "Sep 28, 2026", "Oct 12, 2026", "Oct 26, 2026"];
  return dates.map((d, i) => ({ n: i + 1, date: d, amount: i === 3 ? round2(amount - per * 3) : per }));
}
export function KlarnaWindow({ open, onClose, amount, onDecision, declineEmail = "decline@evals.dev", testId = "klarna-popup" }) {
  const delay = useDelay();
  const [stage, setStage] = useState("contact");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const sched = schedule(amount);
  async function next() {
    setErr(null);
    if (stage === "contact") { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.replace(/\D/g, "").length < 10) { setErr("Enter a valid email and phone number."); return; } setStage("otp"); return; }
    if (stage === "otp") { if (code !== OTP) { setErr("Incorrect code."); return; } setBusy(true); await delay(700); setBusy(false); if (email.toLowerCase() === declineEmail) { setStage("declined"); onDecision?.("declined"); return; } setStage("plan"); return; }
    if (stage === "plan") { onDecision?.("approved", sched); }
  }
  return (
    <PopupWindow open={open} title="Klarnah" url="pay.klarnah.com/checkout/session/ks_2201" onClose={onClose} testId={testId}>
      <div style={{ maxWidth: 420, margin: "0 auto" }} className="ee-stack">
        <div className="ee-logo" style={{ color: "#17120f" }}><span className="ee-logo__mark" style={{ background: "#ffb3c7" }} />Klarnah · Pay in 4</div>
        {stage === "contact" && (<>
          <Field label="Email" htmlFor="kl-email"><Input id="kl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></Field>
          <Field label="Mobile number" htmlFor="kl-phone" error={err}><Input id="kl-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 010 0123" /></Field>
          <div className="ee-tiny ee-muted">Use decline@evals.dev to simulate a declined credit decision.</div>
          <Btn block onClick={next} data-testid={`${testId}-continue`}>Continue</Btn>
        </>)}
        {stage === "otp" && (<>
          <div className="ee-small">We texted a code to {phone}.</div>
          <Field label="Verification code" htmlFor="kl-otp" error={err}><Input id="kl-otp" inputMode="numeric" value={code} onChange={(e) => setCode(e.target.value)} placeholder="6-digit code" /></Field>
          <Btn block loading={busy} onClick={next} data-testid={`${testId}-verify`}>Verify</Btn>
        </>)}
        {stage === "plan" && (<div data-testid={`${testId}-schedule`}>
          <div className="ee-strong" style={{ marginBottom: 6 }}>Your payment schedule</div>
          {sched.map((p) => <KV key={p.n} k={`${p.n === 1 ? "Today" : `Payment ${p.n}`} · ${p.date}`} v={money(p.amount)} testId={`schedule-${p.n}`} />)}
          <KV k="Total" v={money(amount)} total testId="schedule-total" />
          <div className="ee-tiny ee-muted" style={{ margin: "8px 0" }}>No interest. No fees when you pay on time.</div>
          <Btn block onClick={next} data-testid={`${testId}-confirm`}>Confirm and pay {money(sched[0].amount)} today</Btn>
        </div>)}
        {stage === "declined" && (<div data-testid={`${testId}-declined`}>
          <Alert tone="err" title="We can't offer Pay in 4 for this purchase">Based on the information available, Klarnah could not approve this order. Please choose a different payment method with the merchant.</Alert>
          <Btn block variant="secondary" style={{ marginTop: 10 }} onClick={onClose} data-testid={`${testId}-back`}>Back to merchant</Btn>
        </div>)}
      </div>
    </PopupWindow>
  );
}
const seed = () => ({ open: false, method: "klarna", order: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <PaymentLayout merchant="Studio Lamps" amount={AMOUNT} lines={[{ name: "Arc floor lamp", price: 180, qty: 1 }]} note="Sandbox. Pay in 4 splits the total into four interest-free instalments every two weeks.">
      {s.order ? (
        <PaymentSuccess title="Order confirmed" amount={AMOUNT} id="KL-ORD-2201" method="Klarnah · Pay in 4" rows={s.order.schedule.map((p) => ({ k: `Instalment ${p.n} · ${p.date}`, v: money(p.amount), testId: `confirm-inst-${p.n}` }))}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Start over</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack" data-testid="merchant-methods">
          <h2 style={{ fontSize: 18 }}>Payment</h2>
          <RadioCard name="pm" value="card" checked={s.method === "card"} onChange={(v) => set({ ...s, method: v })} title="Credit or debit card" />
          <RadioCard name="pm" value="klarna" checked={s.method === "klarna"} onChange={(v) => set({ ...s, method: v })} title="Klarnah · Pay in 4" desc={`4 payments of ${money(round2(AMOUNT / 4))}, interest-free`} />
          <Btn block style={{ background: "#ffb3c7", color: "#17120f" }} disabled={s.method !== "klarna"} onClick={() => set({ ...s, open: true })} data-testid="klarna-open">Continue with Klarnah</Btn>
        </div>
      )}
      <KlarnaWindow open={s.open} amount={AMOUNT} onClose={() => set({ ...s, open: false })} onDecision={(d, sched) => { if (d === "approved") set({ ...s, open: false, order: { schedule: sched } }); }} />
    </PaymentLayout>
  );
}
