"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Table, Segment, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const DEALS = [
  { id: 1, name: "Globex platform", owner: "Priya Nair", stage: "Closed Won", amount: 48000, month: "Sep" },
  { id: 2, name: "Initech renewal", owner: "Tom Alvarez", stage: "Closed Won", amount: 22000, month: "Sep" },
  { id: 3, name: "Umbrella pilot", owner: "Demo User", stage: "Negotiation", amount: 9500, month: "Sep" },
  { id: 4, name: "Hooli expansion", owner: "Priya Nair", stage: "Closed Won", amount: 61000, month: "Aug" },
  { id: 5, name: "Stark services", owner: "Tom Alvarez", stage: "Closed Lost", amount: 15000, month: "Aug" },
  { id: 6, name: "Wayne platform", owner: "Demo User", stage: "Proposal", amount: 87000, month: "Sep" },
  { id: 7, name: "Acme add-on", owner: "Demo User", stage: "Closed Won", amount: 7500, month: "Aug" },
];
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ period: "Sep" }));
  const rows = DEALS.filter((d) => s.period === "All" || d.month === s.period);
  const won = rows.filter((d) => d.stage === "Closed Won");
  const closed = rows.filter((d) => d.stage.startsWith("Closed"));
  const pipeline = rows.filter((d) => !d.stage.startsWith("Closed"));
  const kpi = { won: won.reduce((a, d) => a + d.amount, 0), wonCount: won.length, pipeline: pipeline.reduce((a, d) => a + d.amount, 0), winRate: closed.length ? Math.round((won.length / closed.length) * 1000) / 10 : 0 };
  const K = ({ label, value, id }) => <Card tight data-testid={`kpi-${id}`}><div className="ee-small ee-muted">{label}</div><div className="ee-price" style={{ fontSize: 24 }} data-testid={`kpi-${id}-value`}>{value}</div></Card>;
  return (
    <SaasShell flow={flow} nav={["Home", "Deals", "Reports", "Dashboards"]} active="Dashboards" title="Sales Dashboard" actions={<Segment options={[{ value: "Sep", label: "Sep 2026" }, { value: "Aug", label: "Aug 2026" }, { value: "All", label: "All" }]} value={s.period} onChange={(v) => set({ period: v })} />}>
      <div className="ee-grid ee-grid--4" style={{ marginBottom: 14 }}>
        <K label="Revenue won" value={money(kpi.won)} id="won" /><K label="Deals won" value={kpi.wonCount} id="won-count" /><K label="Open pipeline" value={money(kpi.pipeline)} id="pipeline" /><K label="Win rate" value={`${kpi.winRate}%`} id="winrate" />
      </div>
      <Card title={`Report: Deals by stage · ${s.period === "All" ? "All time" : s.period + " 2026"}`} data-testid="kpi-report">
        <Table cols={[{ key: "name", label: "Deal" }, { key: "owner", label: "Owner" }, { key: "stage", label: "Stage", render: (r) => <Badge tone={r.stage === "Closed Won" ? "ok" : r.stage === "Closed Lost" ? "err" : "info"}>{r.stage}</Badge> }, { key: "amount", label: "Amount", align: "right", render: (r) => money(r.amount) }]} rows={rows} rowKey={(r) => r.id} />
        <div className="ee-kv"><span className="ee-kv__k">Sum of Closed Won amounts</span><span className="ee-kv__v ee-strong" data-testid="report-won-sum">{money(kpi.won)}</span></div>
        <div className="ee-kv"><span className="ee-kv__k">Sum of open deal amounts</span><span className="ee-kv__v ee-strong" data-testid="report-pipeline-sum">{money(kpi.pipeline)}</span></div>
      </Card>
    </SaasShell>
  );
}
