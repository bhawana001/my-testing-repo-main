"use client";
// Pipeline report with filters (28.3). Running the report applies the filters
// and the row count reflects them.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Select, Field, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, STAGES, USERS, useStore, money } from "../shared";

export default function ReportsPage() {
  const [s] = useStore();
  const [quarter, setQuarter] = useState("Q4");
  const [owner, setOwner] = useState("All");
  const [stage, setStage] = useState("All");
  const [run, setRun] = useState(null);

  function runReport() {
    const rows = s.opportunities.filter((o) =>
      (quarter === "All" || o.quarter === quarter) &&
      (owner === "All" || o.owner === owner) &&
      (stage === "All" || o.stage === stage)
    );
    setRun({ rows, quarter, owner, stage, total: rows.reduce((n, o) => n + o.amount, 0) });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/opportunities`, label: "Opportunities" }]} />
      <Page title="Pipeline by stage" sub="Standard report" wide>
        <Card title="Filters" testId="report-filters">
          <div className="ck-grid ck-grid--3">
            <Field label="Close quarter">
              <Select value={quarter} onChange={(e) => setQuarter(e.target.value)} aria-label="Close quarter" data-testid="filter-quarter">
                <option>All</option><option>Q4</option><option>Q1</option>
              </Select>
            </Field>
            <Field label="Opportunity owner">
              <Select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Opportunity owner" data-testid="filter-owner">
                <option>All</option>{USERS.map((u) => <option key={u}>{u}</option>)}
              </Select>
            </Field>
            <Field label="Stage">
              <Select value={stage} onChange={(e) => setStage(e.target.value)} aria-label="Stage" data-testid="filter-stage">
                <option value="All">All</option>{STAGES.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
              </Select>
            </Field>
          </div>
          <Btn onClick={runReport} data-testid="run-report">Run Report</Btn>
        </Card>

        {run && (
          <Card title="Report results" testId="report-results">
            <div className="ck-muted" data-testid="report-summary">
              {run.rows.length} record{run.rows.length === 1 ? "" : "s"} · filtered to quarter {run.quarter}
              {run.owner !== "All" && `, owner ${run.owner}`}
              {run.stage !== "All" && `, stage ${STAGES.find((x) => x.id === run.stage).name}`}
            </div>
            {run.rows.length === 0 ? <Empty>No records match these filters.</Empty> : (
              <table className="ck-table">
                <thead><tr><th>Opportunity</th><th>Account</th><th>Stage</th><th>Close date</th><th>Amount</th><th>Owner</th></tr></thead>
                <tbody>
                  {run.rows.map((o) => (
                    <tr key={o.id} data-testid={`report-row-${o.id}`}>
                      <td className="ck-strong">{o.name}</td>
                      <td>{o.account}</td>
                      <td>{STAGES.find((x) => x.id === o.stage).name}</td>
                      <td data-testid={`row-close-${o.id}`}>{o.closeDate}</td>
                      <td>{money(o.amount)}</td>
                      <td>{o.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Row label="Total amount" value={money(run.total)} strong testId="report-total" />
          </Card>
        )}
      </Page>
    </Shell>
  );
}
