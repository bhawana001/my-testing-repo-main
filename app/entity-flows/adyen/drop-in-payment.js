"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn, Badge } from "@/app/components/eval/ui";

const AMOUNT = 210.0;
const METHODS = [{ id: "card", label: "Credit or debit card", icon: "💳" }, { id: "ideal", label: "iDEAL", icon: "🏦" }, { id: "paypally", label: "PayPally", icon: "🅿️" }];
const seed = () => ({ result: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState("card");
  return (
    <PaymentLayout merchant="Nordic Home" amount={AMOUNT} currency="EUR" lines={[{ name: "Oak side table", price: 210, qty: 1 }]} note="Adyenly Drop-in. Card 4000 0000 0000 3220 triggers a 3DS2 challenge (code 123456).">
      {s.result ? (
        <PaymentSuccess title={`Result: ${s.result.resultCode}`} amount={AMOUNT} currency="EUR" id={s.result.pspReference} method={s.result.method} rows={[{ k: "3DS2", v: s.result.threeDS ? "Challenge completed" : "Frictionless", testId: "success-3ds" }]} testIdPrefix="result">
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Pay again</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack" data-testid="dropin">
          <div className="ee-row ee-row--between"><h2 style={{ fontSize: 18 }}>Payment methods</h2><Badge>Drop-in</Badge></div>
          {METHODS.map((m) => (
            <div key={m.id} className="ee-card ee-card--flat ee-card--tight" data-testid={`dropin-${m.id}`}>
              <button type="button" className="ee-row" style={{ width: "100%", background: "none", border: 0, cursor: "pointer", textAlign: "left", padding: 0 }} onClick={() => setOpen(m.id)} aria-expanded={open === m.id}>
                <span style={{ fontSize: 22 }} aria-hidden="true">{m.icon}</span><span className="ee-strong">{m.label}</span>
              </button>
              {open === m.id && m.id === "card" && (
                <div style={{ marginTop: 12 }}>
                  <PaymentForm amount={AMOUNT} currency="EUR" allow3ds onSuccess={(p) => set({ result: { resultCode: "Authorised", pspReference: "8836" + p.last4 + "2201", method: `${p.brand} •••• ${p.last4}`, threeDS: !!p.threeDS } })} />
                </div>
              )}
              {open === m.id && m.id !== "card" && <div className="ee-small ee-muted" style={{ marginTop: 8 }}>Select card for this test. {m.label} is covered by its own flow.</div>}
            </div>
          ))}
        </div>
      )}
    </PaymentLayout>
  );
}
