"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn, Select, Field, Card, Badge, KV } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const AMOUNT = 58.9;
const BANKS = ["Test Issuer (Success)", "Test Issuer (Cancelled)", "ABN Bankly", "ING Bankly", "Rabo Bankly"];
const seed = () => ({ stage: "select", bank: "", result: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  if (s.stage === "issuer") {
    return (
      <main className="ee-main ee-main--narrow">
        <Card data-testid="issuer-page">
          <div className="ee-row ee-row--between"><span className="ee-strong">🏦 {s.bank}</span><Badge>Issuer simulation</Badge></div>
          <div className="ee-small ee-muted ee-mono" style={{ margin: "6px 0 14px" }}>ideal-test.adyenly.com/issuer?txid=IDL-7731</div>
          <KV k="Pay to" v="Nordic Home" /><KV k="Amount" v={money(AMOUNT, "EUR")} />
          <div className="ee-row" style={{ marginTop: 14 }}>
            <Btn onClick={() => set({ ...s, stage: "return", result: s.bank.includes("Cancelled") ? "Cancelled" : "Authorised" })} data-testid="issuer-confirm">Confirm payment</Btn>
            <Btn variant="secondary" onClick={() => set({ ...s, stage: "return", result: "Cancelled" })} data-testid="issuer-cancel">Cancel</Btn>
          </div>
        </Card>
      </main>
    );
  }
  return (
    <PaymentLayout merchant="Nordic Home" amount={AMOUNT} currency="EUR" lines={[{ name: "Linen napkins (set of 6)", price: 58.9, qty: 1 }]} note="iDEAL redirects to the issuer, then returns to the merchant with the result.">
      {s.stage === "return" ? (
        s.result === "Authorised" ? (
          <PaymentSuccess title="Result: Authorised" amount={AMOUNT} currency="EUR" id="IDL-7731" method={`iDEAL · ${s.bank}`} rows={[{ k: "Returned from", v: "issuer redirect", testId: "success-return" }]} testIdPrefix="result">
            <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Pay again</Btn>
          </PaymentSuccess>
        ) : (
          <div className="ee-stack" data-testid="result-cancelled">
            <div className="ee-alert ee-alert--err">Result: Cancelled. The issuer did not authorise the payment.</div>
            <Btn variant="secondary" onClick={() => set(seed())}>Choose another method</Btn>
          </div>
        )
      ) : (
        <div className="ee-stack" data-testid="ideal-select">
          <h2 style={{ fontSize: 18 }}>Pay with iDEAL</h2>
          <Field label="Select your bank" htmlFor="ideal-bank">
            <Select id="ideal-bank" value={s.bank} onChange={(e) => set({ ...s, bank: e.target.value })}>
              <option value="">Choose a bank…</option>
              {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
            </Select>
          </Field>
          <Btn block disabled={!s.bank} onClick={() => set({ ...s, stage: "issuer" })} data-testid="ideal-continue">Continue to {s.bank || "bank"}</Btn>
        </div>
      )}
    </PaymentLayout>
  );
}
