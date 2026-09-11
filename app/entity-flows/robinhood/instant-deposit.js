"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const INSTANT_LIMIT = 1000;
const STEPS = [
  { id: "amount", title: "Amount", heading: "Deposit funds", description: "Instant deposits up to $1,000 are available to trade right away.", fields: [
    { name: "from", label: "From", type: "select", required: true, options: [{ value: "chaise", label: "Chaise Checking •••• 4821" }] },
    { name: "amount", label: "Amount", required: true, inputMode: "decimal", validate: (v) => (Number(v) >= 1 && Number(v) <= 50000 ? null : "Enter between $1 and $50,000.") },
    { name: "freq", label: "Frequency", type: "select", required: true, options: ["Just once", "Weekly", "Monthly"] },
  ] },
  { id: "review", title: "Review", heading: "Review deposit", summary: true, nextLabel: "Deposit" },
];
const seed = () => ({ bp: 250, wiz: { ...SEED_WIZARD, values: { from: "chaise", freq: "Just once" } } });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <TradeShell flow={flow} nav={["Investing", "Transfers", "Account"]} active="Transfers" right={<span className="ee-small">Buying power <b data-testid="buying-power">{money(s.bp)}</b></span>}>
      <div style={{ maxWidth: 620 }}>
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Deposit" testIdPrefix="deposit"
          onSubmit={(v) => { const amt = Number(v.amount); const instant = Math.min(INSTANT_LIMIT, amt); const before = s.bp; set((st) => ({ ...st, bp: st.bp + instant })); return { amt, instant, pending: amt - instant, before, after: before + instant }; }}
          result={(r) => (
            <Card data-testid="deposit-result">
              <Badge tone="ok">Deposit initiated</Badge>
              <h2 style={{ margin: "8px 0" }}>{money(r.instant)} available instantly</h2>
              <KV k="Deposit amount" v={money(r.amt)} testId="dep-amount" />
              <KV k="Instant buying power credit" v={money(r.instant)} testId="dep-instant" />
              {r.pending > 0 && <KV k="Available in 3 business days" v={money(r.pending)} testId="dep-pending" />}
              <KV k="Buying power before" v={money(r.before)} testId="dep-before" />
              <KV k="Buying power now" v={money(r.after)} total testId="dep-after" />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set((st) => ({ ...st, wiz: { ...SEED_WIZARD, values: { from: "chaise", freq: "Just once" } } }))}>New deposit</Btn>
            </Card>
          )} />
      </div>
    </TradeShell>
  );
}
