"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { DataTable, StatusBadge } from "@/app/components/engines/Crud";

const FIELDS = [
  { name: "name", label: "Name", required: true, placeholder: "Task name" },
  { name: "status", label: "Status", type: "select", required: true, options: ["Todo", "In progress", "Done"] },
  { name: "owner", label: "Owner", type: "select", required: true, options: ["Priya Nair", "Tom Alvarez", "Demo User"] },
  { name: "due", label: "Due date", type: "date" },
  { name: "notes", label: "Notes", type: "textarea" },
];
const seed = () => ({
  rows: [
    { id: "rec-1", name: "Write launch blog post", status: "In progress", owner: "Priya Nair", due: "2026-09-18", notes: "" },
    { id: "rec-2", name: "QA the checkout flow", status: "Todo", owner: "Demo User", due: "2026-09-16", notes: "Use test cards" },
    { id: "rec-3", name: "Design onboarding email", status: "Done", owner: "Tom Alvarez", due: "2026-09-10", notes: "" },
  ],
});

export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <>
      <Topbar entity={ent} nav={["Grid view", "Kanban", "Calendar", "Form"]} active="Grid view" light />
      <main className="ee-main ee-main--wide">
        <h1 className="ee-page-title">Launch tasks</h1>
        <p className="ee-page-sub">Base: Product launch · Table: Tasks · Records persist across reloads until you reset.</p>
        <DataTable
          title="Grid view"
          rows={s.rows}
          onChange={(rows) => set({ ...s, rows })}
          fields={FIELDS}
          idPrefix="rec"
          createLabel="Add record"
          defaults={{ status: "Todo", owner: "Demo User" }}
          searchKeys={["name", "owner", "notes"]}
          filters={[{ key: "status", label: "statuses", options: ["Todo", "In progress", "Done"] }]}
          testIdPrefix="grid"
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name", sortable: true },
            { key: "status", label: "Status", sortable: true, render: (r) => <StatusBadge value={r.status} map={{ Todo: "warn", "In progress": "info", Done: "ok" }} /> },
            { key: "owner", label: "Owner", sortable: true },
            { key: "due", label: "Due", sortable: true },
            { key: "notes", label: "Notes" },
          ]}
        />
      </main>
    </>
  );
}
