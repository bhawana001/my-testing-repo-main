"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess, PopupWindow } from "@/app/components/engines/PaymentPage";
import { Btn, Field, Input, Segment, KV, useDelay } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const AMOUNT = 1499;
export function RazorModal({ amount, open, onClose, onSuccess, merchant = "Chai Point", testId = "rzp-modal", tabs = ["UPI", "Card", "Netbanking"] }) {
  const delay = useDelay();
  const [tab, setTab] = useState("UPI");
  const [vpa, setVpa] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  async function payUpi() {
    if (!/^[\w.\-]{2,}@[a-z]{2,}$/i.test(vpa.trim())) { setErr("Enter a valid UPI ID (e.g. name@bank)."); return; }
    setErr(null); setBusy(true); await delay(900); setBusy(false);
    if (/fail/i.test(vpa)) { setErr("Payment failed: collect request was declined by the bank."); return; }
    onSuccess({ method: "UPI", vpa: vpa.trim(), id: "pay_RZP" + vpa.replace(/\W/g, "").slice(0, 6).toUpperCase() });
  }
  return (
    <PopupWindow open={open} title="Razorpaid checkout" url="api.razorpaid.com/v1/checkout/embedded" onClose={onClose} testId={testId}>
      <div style={{ maxWidth: 420, margin: "0 auto" }} className="ee-stack">
        <div className="ee-row ee-row--between"><span className="ee-strong">{merchant}</span><span className="ee-price">{money(amount, "INR")}</span></div>
        <Segment options={tabs} value={tab} onChange={setTab} />
        {tab === "UPI" && (
          <div className="ee-stack" data-testid={`${testId}-upi`}>
            <Field label="UPI ID / VPA" htmlFor="rzp-vpa" error={err} help="success@razorpaid succeeds · anything with “fail” is declined">
              <Input id="rzp-vpa" value={vpa} onChange={(e) => { setVpa(e.target.value); setErr(null); }} placeholder="name@bank" invalid={!!err} />
            </Field>
            <Btn block loading={busy} onClick={payUpi} data-testid={`${testId}-pay`}>Pay {money(amount, "INR")}</Btn>
          </div>
        )}
        {tab !== "UPI" && <div className="ee-empty">{tab} is not enabled for this merchant in test mode. Use UPI.</div>}
        <div className="ee-tiny ee-muted ee-center">Secured by Razorpaid · test mode</div>
      </div>
    </PopupWindow>
  );
}
const seed = () => ({ open: false, paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <PaymentLayout merchant="Chai Point" amount={AMOUNT} currency="INR" lines={[{ name: "Masala chai subscription · 1 month", price: 1499, qty: 1 }]} note="Clicking Pay opens the Razorpaid standard checkout. Use UPI ID success@razorpaid.">
      {s.paid ? (
        <PaymentSuccess title="Payment successful" amount={AMOUNT} currency="INR" id={s.paid.id} method={`UPI · ${s.paid.vpa}`} rows={[{ k: "Callback", v: "handler(response) received", testId: "success-callback" }, { k: "Receipt", v: "rcpt_CP_1499", testId: "success-receipt" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Pay again</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack">
          <h2 style={{ fontSize: 18 }}>Complete your order</h2>
          <KV k="Amount" v={money(AMOUNT, "INR")} />
          <Btn block onClick={() => set({ ...s, open: true })} data-testid="rzp-open">Pay {money(AMOUNT, "INR")}</Btn>
        </div>
      )}
      <RazorModal amount={AMOUNT} open={s.open} onClose={() => set({ ...s, open: false })} onSuccess={(p) => set({ open: false, paid: p })} />
    </PaymentLayout>
  );
}
