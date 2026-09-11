"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Alert, Btn } from "@/app/components/eval/ui";

const AMOUNT = 120.0;
const seed = () => ({ paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <PaymentLayout merchant="Northwind Travel" amount={AMOUNT} lines={[{ name: "Airport transfer · 2 passengers", price: 120, qty: 1 }]} note="3-D Secure test: use card 4000 0000 0000 3220 and code 123456 to approve the challenge.">
      {s.paid ? (
        <PaymentSuccess amount={s.paid.amount} id={s.paid.id} method={`${s.paid.brand} •••• ${s.paid.last4}`} rows={[{ k: "3-D Secure", v: s.paid.threeDS ? "Authenticated" : "Not required", testId: "success-3ds" }, { k: "Status", v: "Succeeded", testId: "success-status" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Pay again</Btn>
        </PaymentSuccess>
      ) : (
        <>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>Pay with card</h2>
          <PaymentForm amount={AMOUNT} allow3ds onSuccess={(p) => set({ paid: { ...p, id: p.threeDS ? "pi_3ds_3220_ok" : "pi_no3ds_ok" } })} />
        </>
      )}
    </PaymentLayout>
  );
}
