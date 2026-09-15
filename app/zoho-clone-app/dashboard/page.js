"use client";
import { Shell, Page, Card, Badge, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BLUEPRINT, useStore, money, reportNumbers } from "../shared";

/**
 * The KPI tiles and the report table below both read reportNumbers, so a number
 * on a card and the same number in the report cannot disagree.
 */
export default function Dashboard() {
  const [s] = useStore();
  const k = reportNumbers(s.leads);

  const tiles = [
    { id: "total", label: "Total leads", value: k.total },
    { id: "pipeline", label: "Pipeline value", value: money(k.pipeline) },
    { id: "hot", label: "Hot leads", value: k.hot },
    { id: "unassigned", label: "Unassigned", value: k.unassigned },
    { id: "avg", label: "Average deal", value: money(k.avg) },
    { id: "won", label: "Closed won", value: k.won },
  ];

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Dashboard" sub="Cards and report are computed from the same source" wide>
        <div className="ck-grid ck-grid--3">
          {tiles.map((t) => (
            <Card key={t.id} title={t.label} testId={`kpi-${t.id}`}>
              <div style={{ fontSize: 28, fontWeight: 700 }} data-testid={`kpi-value-${t.id}`}>{t.value}</div>
            </Card>
          ))}
        </div>

        <Card title="Leads by stage" testId="stage-report">
          {BLUEPRINT.map((b) => (
            <Row key={b.id} label={b.name} value={s.leads.filter((l) => l.stage === b.id).length}
                 testId={`stage-${b.id}`} />
          ))}
        </Card>

        <Card title="Underlying report" testId="report-table">
          <table className="ck-table">
            <thead><tr><th>Measure</th><th>Value</th></tr></thead>
            <tbody>
              <tr data-testid="report-total"><td>Total leads</td><td data-testid="report-total-value">{k.total}</td></tr>
              <tr data-testid="report-pipeline"><td>Pipeline value</td><td data-testid="report-pipeline-value">{money(k.pipeline)}</td></tr>
              <tr data-testid="report-hot"><td>Hot leads</td><td data-testid="report-hot-value">{k.hot}</td></tr>
              <tr data-testid="report-unassigned"><td>Unassigned</td><td data-testid="report-unassigned-value">{k.unassigned}</td></tr>
              <tr data-testid="report-avg"><td>Average deal</td><td data-testid="report-avg-value">{money(k.avg)}</td></tr>
              <tr data-testid="report-won"><td>Closed won</td><td data-testid="report-won-value">{k.won}</td></tr>
            </tbody>
          </table>
          <Badge tone="ok" testId="consistency-note">Cards and report share one calculation</Badge>
        </Card>
      </Page>
    </Shell>
  );
}
