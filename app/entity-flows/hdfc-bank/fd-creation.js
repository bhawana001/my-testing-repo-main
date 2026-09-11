"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

const RATES = { 6: 5.5, 12: 6.6, 24: 7.0, 36: 7.1 };
// Quarterly compounding, as printed on the receipt.
export function maturity(P, months) {
  const r = RATES[months] / 100; const n = 4; const t = months / 12;
  return round2(P * Math.pow(1 + r / n, n * t));
}
const STEPS = [
  { id: "amount", title: "Amount", heading: "Open a fixed deposit", fields: [
    { name: "from", label: "Debit from", type: "select", required: true, options: [{ value: "sav", label: "Savings Account •••• 7712 · ₹1,84,250.40" }] },
    { name: "amount", label: "Deposit amount (INR)", required: true, inputMode: "numeric", validate: (v) => (Number(v) >= 5000 && Number(v) <= 184250 ? null : "Minimum ₹5,000, up to your available balance.") },
  ] },
  { id: "tenure", title: "Tenure", heading: "Choose a tenure", fields: [{ name: "months", label: "Tenure", type: "radio-cards", required: true, options: Object.entries(RATES).map(([m, r]) => ({ value: m, label: `${m} months`, desc: `${r}% p.a., compounded quarterly`, right: `${r}%` })) }, { name: "payout", label: "On maturity", type: "radio-cards", required: true, options: [{ value: "credit", label: "Credit principal and interest to savings" }, { value: "renew", label: "Auto-renew principal and interest" }] }] },
  { id: "review", title: "Review", heading: "Confirm your deposit", summary: true, nextLabel: "Open deposit" },
];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD, values: { from: "sav" } } }));
  return (
    <BankShell entity={ent} nav={["NetBanking", "Accounts", "Deposits"]} active="Deposits" title="Fixed deposit">
      <div style={{ maxWidth: 640 }}>
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Open deposit" testIdPrefix="fd"
          onSubmit={(v) => { const P = Number(v.amount), m = Number(v.months); return { P, m, rate: RATES[m], maturity: maturity(P, m), id: "FD" + String(P).slice(0, 4) + m, date: m === 6 ? "14 Mar 2027" : m === 12 ? "14 Sep 2027" : m === 24 ? "14 Sep 2028" : "14 Sep 2029" }; }}
          result={(r) => (
            <Card data-testid="fd-receipt">
              <Badge tone="ok">Deposit opened</Badge>
              <h2 style={{ margin: "8px 0" }}>Fixed deposit receipt</h2>
              <KV k="FD number" v={<span className="ee-mono" data-testid="fd-number">{r.id}</span>} />
              <KV k="Principal" v={money(r.P, "INR")} testId="fd-principal" />
              <KV k="Tenure" v={`${r.m} months at ${r.rate}% p.a.`} testId="fd-tenure" />
              <KV k="Maturity date" v={r.date} testId="fd-date" />
              <KV k="Maturity amount" v={money(r.maturity, "INR")} total testId="fd-maturity" />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD, values: { from: "sav" } } })}>Open another</Btn>
            </Card>
          )} />
      </div>
    </BankShell>
  );
}
