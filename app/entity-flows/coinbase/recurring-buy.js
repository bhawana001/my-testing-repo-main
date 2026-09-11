"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

// Today is Monday 14 Sep 2026. Next run = next occurrence of the chosen weekday (strictly after today).
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export function nextRun(freq, weekday) {
  const today = new Date(Date.UTC(2026, 8, 14));
  if (freq === "Daily") return new Date(today.getTime() + 86400000);
  if (freq === "Monthly") return new Date(Date.UTC(2026, 9, 14));
  let d = new Date(today.getTime() + 86400000);
  while (DAYS[d.getUTCDay()] !== weekday) d = new Date(d.getTime() + 86400000);
  return d;
}
const fmt = (d) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const STEPS = [
  { id: "setup", title: "Set up", heading: "Recurring buy", description: "Today is Monday, September 14, 2026.", fields: [
    { name: "asset", label: "Asset", type: "select", required: true, options: ["BTC", "ETH", "SOL"] },
    { name: "amount", label: "Amount (USD)", required: true, inputMode: "decimal", validate: (v) => (Number(v) >= 5 ? null : "Minimum $5.") },
    { name: "freq", label: "Frequency", type: "radio-cards", required: true, options: [{ value: "Daily", label: "Daily" }, { value: "Weekly", label: "Weekly" }, { value: "Monthly", label: "Monthly", desc: "On the 14th" }] },
    { name: "weekday", label: "Day of week", type: "select", required: true, options: DAYS, when: (v) => v.freq === "Weekly" },
  ] },
  { id: "review", title: "Review", heading: "Review recurring buy", summary: true, nextLabel: "Confirm" },
];
const seed = () => ({ rules: [], wiz: { ...SEED_WIZARD, values: { asset: "BTC" } } });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <TradeShell flow={flow} nav={["Home", "Trade", "Recurring"]} active="Recurring" right={<span />}>
      <div className="ee-split">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Confirm" testIdPrefix="recurring"
          onSubmit={(v) => { const r = { id: "RB-" + (s.rules.length + 1), asset: v.asset, amount: Number(v.amount), freq: v.freq, weekday: v.freq === "Weekly" ? v.weekday : null, next: fmt(nextRun(v.freq, v.weekday)), status: "Active" }; set((st) => ({ ...st, rules: [r, ...st.rules] })); return r; }}
          result={(r) => (
            <Card data-testid="recurring-confirmation">
              <Badge tone="ok">Recurring buy active</Badge>
              <h2 style={{ margin: "8px 0" }}>{money(r.amount)} of {r.asset}, {r.freq.toLowerCase()}{r.weekday ? ` on ${r.weekday}s` : ""}</h2>
              <KV k="Next buy" v={r.next} total testId="rb-next" />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set((st) => ({ ...st, wiz: { ...SEED_WIZARD, values: { asset: "BTC" } } }))}>Add another</Btn>
            </Card>
          )} />
        <Card title="Recurring buys" data-testid="rules">
          {s.rules.length === 0 ? <div className="ee-empty">No recurring buys.</div> : s.rules.map((r) => <div key={r.id} className="ee-stack ee-small" style={{ gap: 2, paddingBottom: 8, borderBottom: "1px solid var(--ee-border)" }} data-testid={`rule-${r.id}`}><div className="ee-row ee-row--between"><b>{money(r.amount)} {r.asset} · {r.freq}{r.weekday ? ` (${r.weekday})` : ""}</b><Badge tone="ok">{r.status}</Badge></div><div className="ee-muted">Next: {r.next}</div></div>)}
        </Card>
      </div>
    </TradeShell>
  );
}
