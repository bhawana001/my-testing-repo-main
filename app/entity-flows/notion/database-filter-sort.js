"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { NotionShell } from "./_shell";
import { Select, Table, Badge, Btn } from "@/app/components/eval/ui";

const ROWS = [
  { id: 1, name: "Write launch blog", status: "In progress", date: "2026-09-18", owner: "Priya" },
  { id: 2, name: "QA checkout", status: "Not started", date: "2026-09-16", owner: "Demo" },
  { id: 3, name: "Pricing page copy", status: "Done", date: "2026-09-10", owner: "Tom" },
  { id: 4, name: "Onboarding emails", status: "In progress", date: "2026-09-15", owner: "Demo" },
  { id: 5, name: "Partner webinar", status: "In progress", date: "2026-09-22", owner: "Priya" },
  { id: 6, name: "Changelog", status: "Not started", date: "2026-09-25", owner: "Tom" },
];
const TONE = { "Not started": undefined, "In progress": "info", Done: "ok" };
const seed = () => ({ status: "", sort: "" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  let rows = ROWS.filter((r) => !s.status || r.status === s.status);
  if (s.sort) rows = [...rows].sort((a, b) => (s.sort === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
  return (
    <NotionShell flow={flow} pages={[{ id: "db", title: "Launch tasks", icon: "🗂️" }]} active="db">
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>🗂️ Launch tasks</h1>
      <div className="ee-row" style={{ marginBottom: 10 }} data-testid="view-controls">
        <Select value={s.status} onChange={(e) => set({ ...s, status: e.target.value })} aria-label="Filter Status" style={{ width: "auto" }}><option value="">Filter: Status (all)</option>{["Not started", "In progress", "Done"].map((x) => <option key={x} value={x}>Status is {x}</option>)}</Select>
        <Select value={s.sort} onChange={(e) => set({ ...s, sort: e.target.value })} aria-label="Sort by Date" style={{ width: "auto" }}><option value="">Sort: none</option><option value="asc">Date ↑ ascending</option><option value="desc">Date ↓ descending</option></Select>
        {(s.status || s.sort) && <Btn size="sm" variant="ghost" onClick={() => set(seed())}>Clear</Btn>}
        <span className="ee-small ee-muted" data-testid="db-count">{rows.length} of {ROWS.length}</span>
      </div>
      <div data-testid="db-table"><Table cols={[{ key: "name", label: "Name" }, { key: "status", label: "Status", render: (r) => <Badge tone={TONE[r.status]}>{r.status}</Badge> }, { key: "date", label: "Date" }, { key: "owner", label: "Owner" }]} rows={rows} rowKey={(r) => r.id} /></div>
    </NotionShell>
  );
}
