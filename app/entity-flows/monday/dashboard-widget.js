"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { MondayShell, STATUS, StatusPill } from "./_shell";
import { Card, Btn, Modal, RadioCard, Table } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";
import { useState } from "react";

const ITEMS = [
  { id: 1, name: "Press release", status: "Done", budget: 1200 }, { id: 2, name: "Venue", status: "Working on it", budget: 8000 }, { id: 3, name: "Swag", status: "Stuck", budget: 2500 },
  { id: 4, name: "Webinar", status: "Working on it", budget: 1500 }, { id: 5, name: "Ads", status: "Done", budget: 4000 }, { id: 6, name: "Blog series", status: "Done", budget: 600 }, { id: 7, name: "Partner kit", status: "Not started", budget: 900 },
];
const seed = () => ({ widgets: [] });
function StatusChart() {
  const counts = Object.keys(STATUS).map((k) => ({ k, n: ITEMS.filter((i) => i.status === k).length }));
  const max = Math.max(...counts.map((c) => c.n));
  return (
    <div data-testid="chart-status">
      <svg viewBox="0 0 320 170" width="100%" style={{ maxWidth: 420 }} role="img" aria-label="Items by status bar chart">
        {counts.map((c, i) => { const h = (c.n / max) * 110; return <g key={c.k}><rect x={20 + i * 75} y={130 - h} width="50" height={h} fill={STATUS[c.k]} rx="4" /><text x={45 + i * 75} y={124 - h} textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">{c.n}</text><text x={45 + i * 75} y="150" textAnchor="middle" fontSize="10" fill="currentColor">{c.k}</text></g>; })}
      </svg>
      <div className="ee-small">{counts.map((c) => <span key={c.k} style={{ marginRight: 10 }} data-testid={`chart-${c.k.replace(/\s+/g, "-").toLowerCase()}`}>{c.k}: <b>{c.n}</b></span>)}</div>
    </div>
  );
}
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [pick, setPick] = useState("status");
  return (
    <MondayShell flow={flow} active="Dashboards" title="Marketing overview · Dashboard" actions={<Btn size="sm" onClick={() => setOpen(true)} data-testid="add-widget">+ Add widget</Btn>}>
      <div className="ee-split">
        <div className="ee-stack" data-testid="widgets">
          {s.widgets.length === 0 && <Card><div className="ee-empty">No widgets yet. Add a chart from your board data.</div></Card>}
          {s.widgets.includes("status") && <Card title="Chart · Items by Status (Marketing plan)"><StatusChart /></Card>}
          {s.widgets.includes("budget") && <Card title="Numbers · Total budget" data-testid="widget-budget"><div className="ee-price" style={{ fontSize: 30 }} data-testid="budget-total">{money(ITEMS.reduce((a, i) => a + i.budget, 0))}</div></Card>}
        </div>
        <Card title="Board: Marketing plan (source data)" data-testid="board-data">
          <Table cols={[{ key: "name", label: "Item" }, { key: "status", label: "Status", render: (r) => <StatusPill v={r.status} /> }, { key: "budget", label: "Budget", align: "right", render: (r) => money(r.budget) }]} rows={ITEMS} rowKey={(r) => r.id} />
        </Card>
      </div>
      <Modal open={open} title="Add widget" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="widget-picker">
          <RadioCard name="w" value="status" checked={pick === "status"} onChange={setPick} title="Chart" desc="Items by Status from Marketing plan" />
          <RadioCard name="w" value="budget" checked={pick === "budget"} onChange={setPick} title="Numbers" desc="Sum of Budget column" />
          <Btn onClick={() => { set({ widgets: s.widgets.includes(pick) ? s.widgets : [...s.widgets, pick] }); setOpen(false); }} data-testid="add-widget-confirm">Add to dashboard</Btn>
        </div>
      </Modal>
    </MondayShell>
  );
}
