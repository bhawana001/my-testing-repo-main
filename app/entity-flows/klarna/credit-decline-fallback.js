"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { Btn, RadioCard, Alert } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";
import { KlarnaWindow } from "./pay-in-4";

const AMOUNT = 640.0;
const seed = () => ({ open: false, method: "klarna", declined: false, order: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <PaymentLayout merchant="Studio Lamps" amount={AMOUNT} lines={[{ name: "Designer pendant light", price: 640, qty: 1 }]} note="Use email decline@evals.dev in the Klarnah window to trigger a declined credit decision and see the merchant fallback.">
      {s.order ? (
        <PaymentSuccess title="Order confirmed" amount={AMOUNT} id="SL-ORD-640" method={s.order.method} rows={[{ k: "Fallback used", v: s.declined ? "Yes, after Klarnah decline" : "No", testId: "success-fallback" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Start over</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack" data-testid="merchant-methods">
          <h2 style={{ fontSize: 18 }}>Payment</h2>
          {s.declined && <Alert tone="warn" data-testid="fallback-banner">Klarnah couldn't approve Pay in 4 for this order. Please choose another payment method below.</Alert>}
          <RadioCard name="pm" value="klarna" checked={s.method === "klarna"} onChange={(v) => set({ ...s, method: v })} title="Klarnah · Pay in 4" desc={s.declined ? "Unavailable for this order" : `4 payments of ${money(round2(AMOUNT / 4))}`} />
          <RadioCard name="pm" value="card" checked={s.method === "card"} onChange={(v) => set({ ...s, method: v })} title="Credit or debit card" desc="Pay the full amount now" />
          {s.method === "klarna" && !s.declined && <Btn block style={{ background: "#ffb3c7", color: "#17120f" }} onClick={() => set({ ...s, open: true })} data-testid="klarna-open">Continue with Klarnah</Btn>}
          {s.method === "klarna" && s.declined && <Btn block disabled data-testid="klarna-disabled">Klarnah unavailable</Btn>}
          {s.method === "card" && <PaymentForm amount={AMOUNT} allow3ds={false} onSuccess={(p) => set({ ...s, order: { method: `${p.brand} •••• ${p.last4}` } })} />}
        </div>
      )}
      <KlarnaWindow open={s.open} amount={AMOUNT} onClose={() => set({ ...s, open: false, method: s.declined ? "card" : s.method })} onDecision={(d, sched) => { if (d === "declined") set({ ...s, declined: true }); else set({ ...s, open: false, order: { method: "Klarnah · Pay in 4" } }); }} />
    </PaymentLayout>
  );
}
