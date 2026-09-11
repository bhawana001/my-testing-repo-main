"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess, PopupWindow } from "@/app/components/engines/PaymentPage";
import { Btn, Field, Input, Alert, KV } from "@/app/components/eval/ui";
import { DEMO_USER, money } from "@/lib/seed";

const AMOUNT = 89.99;
const seed = () => ({ popup: false, stage: "login", order: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(null);
  function login(e) {
    e.preventDefault();
    if (email.trim().toLowerCase() !== DEMO_USER.email || pw !== DEMO_USER.password) { setErr("Some of your info isn't correct. Please try again."); return; }
    setErr(null);
    set({ ...s, stage: "review" });
  }
  return (
    <PaymentLayout merchant="Trailhead Outfitters" amount={AMOUNT} lines={[{ name: "Ultralight tent stakes (12)", price: 29.99, qty: 1 }, { name: "Down beanie", price: 60, qty: 1 }]} note="Merchant sandbox. Approve in the PayPally popup to complete the order.">
      {s.order ? (
        <PaymentSuccess title="Order complete" amount={s.order.amount} id={s.order.id} method="PayPally · demo@evals.dev" rows={[{ k: "Merchant order", v: s.order.merchantRef, testId: "success-merchant-ref" }, { k: "Popup", v: "Approved and closed", testId: "success-popup" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Start over</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack">
          <h2 style={{ fontSize: 18 }}>Express checkout</h2>
          <Btn block pill style={{ background: "#ffc439", color: "#003087", fontWeight: 800 }} onClick={() => set({ ...s, popup: true, stage: "login" })} data-testid="paypal-button">Pay with PayPally</Btn>
          <Btn block pill variant="secondary">Debit or credit card</Btn>
          <div className="ee-tiny ee-muted ee-center">Sandbox buyer: demo@evals.dev / Demo123!</div>
        </div>
      )}
      <PopupWindow open={s.popup} title="PayPally checkout" url="sandbox.paypally.com/checkoutnow?token=EC-8XJ2" onClose={() => set({ ...s, popup: false })} testId="paypal-popup">
        {s.stage === "login" ? (
          <form onSubmit={login} className="ee-stack" style={{ maxWidth: 360, margin: "0 auto" }}>
            <div className="ee-logo" style={{ color: "#003087" }}><span className="ee-logo__mark" style={{ background: "#0070ba" }} />PayPally</div>
            <Field label="Email" htmlFor="pp-email"><Input id="pp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
            <Field label="Password" htmlFor="pp-pw" error={err}><Input id="pp-pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} /></Field>
            <Btn type="submit" block pill style={{ background: "#0070ba" }} data-testid="paypal-login">Log In</Btn>
          </form>
        ) : (
          <div className="ee-stack" style={{ maxWidth: 400, margin: "0 auto" }} data-testid="paypal-review">
            <div className="ee-strong">Pay {money(AMOUNT)} to Trailhead Outfitters</div>
            <KV k="Pay with" v="Balance · $250.00 available" />
            <KV k="Ship to" v="Demo User, 1200 Market St, San Francisco" />
            <Btn block pill style={{ background: "#0070ba" }} onClick={() => set({ ...s, popup: false, order: { amount: AMOUNT, id: "PAYID-8XJ2Q7", merchantRef: "TO-55019" } })} data-testid="paypal-approve">Pay Now</Btn>
            <button className="ee-link ee-small" onClick={() => set({ ...s, popup: false })}>Cancel and return to merchant</button>
          </div>
        )}
      </PopupWindow>
    </PaymentLayout>
  );
}
