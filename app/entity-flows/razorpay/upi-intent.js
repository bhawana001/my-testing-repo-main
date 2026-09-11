"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn, Field, Input, RadioCard, useDelay, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const AMOUNT = 349;
const seed = () => ({ paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const delay = useDelay();
  const [method, setMethod] = useState("upi");
  const [mode, setMode] = useState("vpa");
  const [vpa, setVpa] = useState("");
  const [err, setErr] = useState(null);
  const [checked, setChecked] = useState(null);
  const [busy, setBusy] = useState(false);
  async function verify() {
    if (!/^[\w.\-]{2,}@[a-z]{2,}$/i.test(vpa.trim())) { setErr("Invalid UPI ID. Format: name@bank"); setChecked(null); return; }
    setErr(null); setBusy(true); await delay(500); setBusy(false);
    setChecked({ vpa: vpa.trim(), name: "DEMO USER" });
  }
  async function pay() {
    setBusy(true); await delay(900); setBusy(false);
    set({ paid: { id: "pay_UPI" + Date.now().toString().slice(-4).replace(/\d/g, "7"), vpa: checked.vpa } });
  }
  return (
    <PaymentLayout merchant="QuickBite" amount={AMOUNT} currency="INR" lines={[{ name: "Paneer wrap combo", price: 349, qty: 1 }]} note="UPI intent flow: enter a VPA, verify it, then pay. Valid format name@bank.">
      {s.paid ? (
        <PaymentSuccess amount={AMOUNT} currency="INR" id={s.paid.id} method={`UPI · ${s.paid.vpa}`} rows={[{ k: "Status", v: "captured", testId: "success-status" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Pay again</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack" data-testid="upi-intent">
          <h2 style={{ fontSize: 18 }}>Choose payment method</h2>
          <RadioCard name="m" value="upi" checked={method === "upi"} onChange={setMethod} title="UPI" desc="Pay with any UPI app" />
          <RadioCard name="m" value="card" checked={method === "card"} onChange={setMethod} title="Card" desc="Disabled for this merchant" />
          {method === "upi" && (
            <div className="ee-stack" style={{ paddingLeft: 8 }}>
              <div className="ee-row">
                <button type="button" className="ee-chip" data-active={mode === "vpa" ? "true" : "false"} onClick={() => setMode("vpa")}>Enter UPI ID</button>
                <button type="button" className="ee-chip" data-active={mode === "intent" ? "true" : "false"} onClick={() => setMode("intent")}>Open UPI app</button>
              </div>
              {mode === "vpa" ? (
                <>
                  <Field label="UPI ID" htmlFor="vpa" error={err}><Input id="vpa" value={vpa} onChange={(e) => { setVpa(e.target.value); setChecked(null); setErr(null); }} placeholder="name@bank" invalid={!!err} /></Field>
                  {!checked ? <Btn variant="secondary" onClick={verify} loading={busy} data-testid="vpa-verify">Verify UPI ID</Btn>
                    : <div className="ee-row" data-testid="vpa-verified"><Badge tone="ok">Verified</Badge> <span className="ee-small">{checked.vpa} · {checked.name}</span></div>}
                  <Btn block disabled={!checked} loading={busy && !!checked} onClick={pay} data-testid="upi-pay">Pay {money(AMOUNT, "INR")}</Btn>
                </>
              ) : (
                <div className="ee-empty">On mobile web this opens your UPI app (intent). Use “Enter UPI ID” to test here.</div>
              )}
            </div>
          )}
        </div>
      )}
    </PaymentLayout>
  );
}
