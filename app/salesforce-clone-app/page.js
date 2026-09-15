"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, STAGES, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  const pipeline = s.opportunities.reduce((n, o) => n + o.amount, 0);
  const weighted = s.opportunities.reduce((n, o) => n + o.amount * (o.probability / 100), 0);
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/leads`, label: "Leads", testId: "nav-leads" },
        { href: `${BASE}/opportunities`, label: "Opportunities", testId: "nav-opps" },
        { href: `${BASE}/reports`, label: "Reports", testId: "nav-reports" },
        { href: `${BASE}/accounts`, label: "Accounts", testId: "nav-accounts" },
        { href: `${BASE}/flow`, label: "Intake flow", testId: "nav-flow" },
      ]} />
      <Page title="Sales home" sub="Your pipeline at a glance">
        <div className="ck-grid ck-grid--3">
          <Card title="Open pipeline"><div style={{ fontSize: 26, fontWeight: 700 }} data-testid="pipeline-total">{money(pipeline)}</div></Card>
          <Card title="Weighted forecast"><div style={{ fontSize: 26, fontWeight: 700 }} data-testid="weighted-total">{money(Math.round(weighted))}</div></Card>
          <Card title="Open leads"><div style={{ fontSize: 26, fontWeight: 700 }} data-testid="lead-count">{s.leads.length}</div></Card>
        </div>
        <Card title="Opportunities by stage">
          {STAGES.map((st) => {
            const list = s.opportunities.filter((o) => o.stage === st.id);
            return <Row key={st.id} label={`${st.name} (${st.probability}%)`} value={`${list.length} · ${money(list.reduce((n, o) => n + o.amount, 0))}`} testId={`stage-row-${st.id}`} />;
          })}
        </Card>
      </Page>
    </Shell>
  );
}
