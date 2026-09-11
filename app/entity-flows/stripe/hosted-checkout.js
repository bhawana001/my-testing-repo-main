"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn } from "@/app/components/eval/ui";

const LINES = [{ name: "Pro plan · monthly", price: 49.0, qty: 1 }, { name: "Extra seat", price: 15.0, qty: 2 }];
const AMOUNT = 79.0;
const seed = () => ({ paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <PaymentLayout merchant="Acme Cloud" amount={AMOUNT} lines={LINES} note="Powered by Stripely Checkout · test mode">
      {s.paid ? (
        <PaymentSuccess amount={s.paid.amount} id={s.paid.id} method={`${s.paid.brand} •••• ${s.paid.last4}`} rows={[{ k: "Status", v: "Succeeded", testId: "success-status" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Back to merchant</Btn>
        </PaymentSuccess>
      ) : (
        <>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>Pay with card</h2>
          <PaymentForm amount={AMOUNT} allow3ds onSuccess={(p) => set({ paid: { ...p, id: "pi_3Nq7Hosted4242" } })} buttonLabel={`Pay $${AMOUNT.toFixed(2)}`} />
        </>
      )}
    </PaymentLayout>
  );
}
