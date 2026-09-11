"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentLayout, PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn, Segment, RadioCard, Table } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

const AMOUNT = 60000;
const PLANS = [{ months: 3, rate: 0 }, { months: 6, rate: 12 }, { months: 9, rate: 13 }, { months: 12, rate: 14 }];
// Standard reducing-balance EMI: P*r*(1+r)^n / ((1+r)^n - 1)
export function emi(P, annualRate, n) {
  if (annualRate === 0) return round2(P / n);
  const r = annualRate / 12 / 100;
  return round2((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}
const seed = () => ({ paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [tab, setTab] = useState("EMI");
  const [pick, setPick] = useState(null);
  const rows = PLANS.map((p) => { const m = emi(AMOUNT, p.rate, p.months); return { id: String(p.months), months: p.months, rate: p.rate, monthly: m, total: round2(m * p.months), interest: round2(m * p.months - AMOUNT) }; });
  const chosen = rows.find((r) => r.id === pick);
  return (
    <PaymentLayout merchant="Nova Store" amount={AMOUNT} currency="INR" lines={[{ name: "Nova Book Pro 14 laptop", price: 60000, qty: 1 }]} note="High-value order: EMI tenures are computed with reducing-balance interest. 3 months is no-cost EMI.">
      {s.paid ? (
        <PaymentSuccess amount={AMOUNT} currency="INR" id={s.paid.id} method={`Card EMI · ${s.paid.months} months`} rows={[{ k: "Monthly instalment", v: money(s.paid.monthly, "INR"), testId: "success-emi" }, { k: "Total payable", v: money(s.paid.total, "INR"), testId: "success-total" }]}>
          <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => set(seed())}>Pay again</Btn>
        </PaymentSuccess>
      ) : (
        <div className="ee-stack" data-testid="payment-options">
          <Segment options={["UPI", "Card", "EMI", "Netbanking"]} value={tab} onChange={setTab} />
          {tab === "EMI" ? (
            <div className="ee-stack" data-testid="emi-plans">
              <Table cols={[{ key: "months", label: "Tenure", render: (r) => `${r.months} months` }, { key: "rate", label: "Interest", render: (r) => (r.rate === 0 ? "No cost" : `${r.rate}% p.a.`) }, { key: "monthly", label: "Per month", align: "right", render: (r) => money(r.monthly, "INR") }, { key: "interest", label: "Total interest", align: "right", render: (r) => money(r.interest, "INR") }, { key: "total", label: "Total", align: "right", render: (r) => money(r.total, "INR") }]} rows={rows} rowKey={(r) => r.id} onRowClick={(r) => setPick(r.id)} />
              <div className="ee-stack">
                {rows.map((r) => <RadioCard key={r.id} name="emi" value={r.id} checked={pick === r.id} onChange={setPick} title={`${r.months} × ${money(r.monthly, "INR")}`} desc={r.rate === 0 ? "No-cost EMI" : `${r.rate}% p.a. · interest ${money(r.interest, "INR")}`} right={money(r.total, "INR")} />)}
              </div>
              <Btn block disabled={!chosen} onClick={() => set({ paid: { id: "pay_EMI" + chosen.months, ...chosen } })} data-testid="emi-pay">{chosen ? `Pay ${money(chosen.monthly, "INR")}/month for ${chosen.months} months` : "Select a tenure"}</Btn>
            </div>
          ) : <div className="ee-empty">Switch to the EMI tab to see instalment plans for this order.</div>}
        </div>
      )}
    </PaymentLayout>
  );
}
