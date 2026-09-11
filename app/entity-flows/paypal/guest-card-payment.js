"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess, PopupWindow } from "@/app/components/engines/PaymentPage";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { Btn, Field, Input } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const AMOUNT = 42.0;
const seed = () => ({ popup: false, stage: "choose", order: null, email: "" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <PaymentLayout merchant="Paper & Ink Studio" amount={AMOUNT} lines={[{ name: "Letterpress notebook", price: 21, qty: 2 }]} note="Choose “Pay with Debit or Credit Card” inside the PayPally window to pay without an account.">
      {s.order ? (
        <PaymentSuccess title="Payment complete" amount={s.order.amount} id={s.order.id} method={`Guest card · ${s.order.brand} •••• ${s.order.last4}`} rows={[{ k: "Account", v: "None (guest)", testId: "success-guest" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Start over</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack">
          <h2 style={{ fontSize: 18 }}>Checkout</h2>
          <Btn block pill style={{ background: "#ffc439", color: "#003087", fontWeight: 800 }} onClick={() => set({ ...s, popup: true, stage: "choose" })} data-testid="paypal-button">PayPally Checkout</Btn>
        </div>
      )}
      <PopupWindow open={s.popup} title="PayPally checkout" url="sandbox.paypally.com/checkoutnow?token=EC-GUEST1" onClose={() => set({ ...s, popup: false })} testId="paypal-popup">
        {s.stage === "choose" ? (
          <div className="ee-stack" style={{ maxWidth: 380, margin: "0 auto" }}>
            <div className="ee-logo" style={{ color: "#003087" }}><span className="ee-logo__mark" style={{ background: "#0070ba" }} />PayPally</div>
            <div className="ee-strong">Pay {money(AMOUNT)} to Paper & Ink Studio</div>
            <Btn block pill style={{ background: "#0070ba" }}>Log in to PayPally</Btn>
            <div className="ee-center ee-small ee-muted">or</div>
            <Btn block pill variant="secondary" onClick={() => set({ ...s, stage: "card" })} data-testid="paypal-guest-card">Pay with Debit or Credit Card</Btn>
          </div>
        ) : (
          <div className="ee-stack" style={{ maxWidth: 420, margin: "0 auto" }} data-testid="paypal-guest-form">
            <div className="ee-strong">Pay with debit or credit card</div>
            <div className="ee-small ee-muted">No PayPally account needed.</div>
            <Field label="Email for receipt" htmlFor="pp-guest-email"><Input id="pp-guest-email" type="email" value={s.email} onChange={(e) => set({ ...s, email: e.target.value })} placeholder="you@example.com" /></Field>
            <PaymentForm amount={AMOUNT} allow3ds={false} testIdPrefix="guest" buttonLabel={`Pay ${money(AMOUNT)}`} onSuccess={(p) => set({ ...s, popup: false, order: { amount: AMOUNT, id: "PAYID-GUEST42", brand: p.brand, last4: p.last4 } })} />
          </div>
        )}
      </PopupWindow>
    </PaymentLayout>
  );
}
