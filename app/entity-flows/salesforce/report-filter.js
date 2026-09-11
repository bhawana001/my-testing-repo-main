"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Table, Select, Field, Btn, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

// Fiscal calendar: today is 14 Sep 2026 → this quarter = Q3 2026 (Jul 1 – Sep 30).
const ROWS = [
  { id: 1, opp: "Globex · 200 seats", stage: "Negotiation", amount: 48000, close: "2026-09-22", owner: "Priya Nair" },
  { id: 2, opp: "Initech · Renewal", stage: "Proposal", amount: 22000, close: "2026-08-30", owner: "Tom Alvarez" },
  { id: 3, opp: "Umbrella · Pilot", stage: "Prospecting", amount: 9500, close: "2026-10-15", owner: "Demo User" },
  { id: 4, opp: "Hooli · Expansion", stage: "Closed Won", amount: 61000, close: "2026-07-18", owner: "Priya Nair" },
  { id: 5, opp: "Stark · Services", stage: "Qualification", amount: 15000, close: "2026-12-05", owner: "Tom Alvarez" },
  { id: 6, opp: "Wayne · Platform", stage: "Proposal", amount: 87000, close: "2026-06-28", owner: "Demo User" },
];
const RANGES = { all: ["0000", "9999"], thisq: ["2026-07-01", "2026-09-30"], nextq: ["2026-10-01", "2026-12-31"], lastq: ["2026-04-01", "2026-06-30"] };
const seed = () => ({ draft: "all", applied: "all", ran: false });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [a, b] = RANGES[s.applied];
  const rows = s.ran ? ROWS.filter((r) => r.close >= a && r.close <= b) : [];
  return (
    <SaasShell flow={flow} nav={["Home", "Opportunities", "Reports", "Dashboards"]} active="Reports" title="Pipeline by Close Date" sub="Report · Opportunities">
      <div className="ee-split ee-split--sidebar-left">
        <Card title="Filters" data-testid="report-filters">
          <div className="ee-stack">
            <Field label="Close Date" htmlFor="rp-range"><Select id="rp-range" value={s.draft} onChange={(e) => set({ ...s, draft: e.target.value })}><option value="all">All Time</option><option value="thisq">Current FQ (Jul 1 – Sep 30, 2026)</option><option value="nextq">Next FQ</option><option value="lastq">Previous FQ</option></Select></Field>
            <Btn onClick={() => set({ ...s, applied: s.draft, ran: true })} data-testid="run-report">Run Report</Btn>
          </div>
        </Card>
        <Card title={s.ran ? `Report results · ${rows.length} record${rows.length === 1 ? "" : "s"}` : "Report"} data-testid="report-results">
          {!s.ran ? <div className="ee-empty">Set filters and click Run Report.</div> : (<>
            <div className="ee-row" style={{ marginBottom: 8 }}><Badge tone="info" data-testid="applied-filter">Close Date: {s.applied === "all" ? "All Time" : s.applied === "thisq" ? "Current FQ" : s.applied === "nextq" ? "Next FQ" : "Previous FQ"}</Badge></div>
            <Table cols={[{ key: "opp", label: "Opportunity" }, { key: "stage", label: "Stage" }, { key: "close", label: "Close Date" }, { key: "owner", label: "Owner" }, { key: "amount", label: "Amount", align: "right", render: (r) => money(r.amount) }]} rows={rows} rowKey={(r) => r.id} />
            <div className="ee-kv ee-kv--total"><span className="ee-kv__k">Grand Total ({rows.length})</span><span className="ee-kv__v" data-testid="report-total">{money(rows.reduce((x, r) => x + r.amount, 0))}</span></div>
          </>)}
        </Card>
      </div>
    </SaasShell>
  );
}
