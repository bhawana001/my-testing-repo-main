"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn, RadioCard, Badge, useDelay } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";
import { useState } from "react";

const AMOUNT = 39.0;
const STORED = { token: "8415 stored token", brand: "Visa", last4: "1111", exp: "03/30" };
const seed = () => ({ result: null, history: [{ id: "8836123456781111", when: "Sep 2, 2026", amount: 39 }] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const delay = useDelay();
  const [busy, setBusy] = useState(false);
  const [choice, setChoice] = useState("stored");
  async function pay() { setBusy(true); await delay(600); setBusy(false); set({ ...s, result: { pspReference: "8836" + String(1000 + s.history.length), method: `Stored ${STORED.brand} •••• ${STORED.last4}` } }); }
  return (
    <PaymentLayout merchant="Nordic Home" amount={AMOUNT} currency="EUR" lines={[{ name: "Monthly candle box", price: 39, qty: 1 }]} note="A card stored during a previous payment is offered for one-click reuse. No card entry needed.">
      {s.result ? (
        <PaymentSuccess title="Result: Authorised" amount={AMOUNT} currency="EUR" id={s.result.pspReference} method={s.result.method} rows={[{ k: "Card entry", v: "Not required (token)", testId: "success-noentry" }]} testIdPrefix="result">
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Pay again</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack" data-testid="stored-methods">
          <h2 style={{ fontSize: 18 }}>Payment methods</h2>
          <RadioCard name="pm" value="stored" checked={choice === "stored"} onChange={setChoice} title={`${STORED.brand} •••• ${STORED.last4}`} desc={`Stored card · expires ${STORED.exp}`} right={<Badge tone="ok">Stored</Badge>} />
          <RadioCard name="pm" value="new" checked={choice === "new"} onChange={setChoice} title="Use a new card" desc="Enter card details" />
          {choice === "stored" ? <Btn block loading={busy} onClick={pay} data-testid="pay-stored">Pay {money(AMOUNT, "EUR")} with stored card</Btn> : <div className="ee-empty">New card entry is covered by the Drop-in flow.</div>}
        </div>
      )}
    </PaymentLayout>
  );
}
