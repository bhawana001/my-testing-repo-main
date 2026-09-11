"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn } from "@/app/components/eval/ui";

const AMOUNT = 64.5;
const seed = () => ({ paid: null, attempts: 0 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <PaymentLayout merchant="Bloom & Co." amount={AMOUNT} lines={[{ name: "Seasonal bouquet", price: 52.5, qty: 1 }, { name: "Delivery", price: 12, qty: 1 }]} note="Decline test: 4000 0000 0000 0002 is declined; retry with 4242 4242 4242 4242.">
      {s.paid ? (
        <PaymentSuccess amount={s.paid.amount} id={s.paid.id} method={`${s.paid.brand} •••• ${s.paid.last4}`} rows={[{ k: "Attempts", v: String(s.attempts + 1), testId: "success-attempts" }, { k: "Status", v: "Succeeded", testId: "success-status" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Start over</Btn>
        </PaymentSuccess>
      ) : (
        <>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>Pay with card</h2>
          {s.attempts > 0 && <div className="ee-small ee-muted" style={{ marginBottom: 8 }} data-testid="decline-count">{s.attempts} declined attempt{s.attempts === 1 ? "" : "s"} so far. The form stays editable so you can retry.</div>}
          <PaymentForm amount={AMOUNT} allow3ds={false} onDecline={() => set((st) => ({ ...st, attempts: st.attempts + 1 }))} onSuccess={(p) => set((st) => ({ ...st, paid: { ...p, id: "pi_recovered_4242" } }))} />
        </>
      )}
    </PaymentLayout>
  );
}
