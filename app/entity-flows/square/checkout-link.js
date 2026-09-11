"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn } from "@/app/components/eval/ui";

const AMOUNT = 35.0;
const seed = () => ({ paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <PaymentLayout merchant="Bean There Coffee" amount={AMOUNT} lines={[{ name: "Coffee subscription · 1 bag/month", price: 35, qty: 1 }]} note="Squarely Online Checkout link · square.link/u/beanthere">
      {s.paid ? (
        <PaymentSuccess title="Receipt" amount={s.paid.amount} id={s.paid.id} method={`${s.paid.brand} •••• ${s.paid.last4}`} rows={[{ k: "Receipt #", v: "R-000731", testId: "receipt-number" }, { k: "Merchant", v: "Bean There Coffee", testId: "receipt-merchant" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Pay again</Btn>
        </PaymentSuccess>
      ) : (
        <>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>Pay with card</h2>
          <PaymentForm amount={AMOUNT} allow3ds={false} onSuccess={(p) => set({ paid: { ...p, id: "sq_pay_BT35" } })} />
        </>
      )}
    </PaymentLayout>
  );
}
