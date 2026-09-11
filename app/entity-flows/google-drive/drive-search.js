"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Input, Btn, Chips, Table, Badge } from "@/app/components/eval/ui";
import { highlightText } from "@/app/components/engines/Feed";

const FILES = [
  { id: 1, name: "2026 Budget", type: "Sheets", icon: "📊", text: "Marketing budget by quarter", owner: "me" },
  { id: 2, name: "Budget review notes", type: "Docs", icon: "📝", text: "Notes from the budget review meeting", owner: "Priya Nair" },
  { id: 3, name: "Travel budget tracker", type: "Sheets", icon: "📊", text: "Team travel budget and spend", owner: "Tom Alvarez" },
  { id: 4, name: "Vendor contract", type: "PDFs", icon: "📕", text: "Includes budget cap clause", owner: "me" },
  { id: 5, name: "Headcount plan", type: "Sheets", icon: "📊", text: "Hiring plan for 2026", owner: "me" },
  { id: 6, name: "Offsite photo", type: "Images", icon: "🖼️", text: "Team photo", owner: "Priya Nair" },
];
const seed = () => ({ q: "", type: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState(s.q);
  const rows = FILES.filter((f) => (!s.q || (f.name + " " + f.text).toLowerCase().includes(s.q.toLowerCase())) && (!s.type || f.type === s.type));
  return (
    <SaasShell flow={flow} nav={["My Drive", "Shared with me", "Recent"]} active="My Drive" title="Search in Drively">
      <form className="ee-row" onSubmit={(e) => { e.preventDefault(); set({ ...s, q: q.trim() }); }} style={{ marginBottom: 10 }}><Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search in Drive" aria-label="Search in Drive" style={{ flex: 1 }} /><Btn type="submit" data-testid="drive-search">Search</Btn></form>
      <div style={{ marginBottom: 10 }}><Chips options={["Docs", "Sheets", "PDFs", "Images"]} value={s.type} onChange={(v) => set({ ...s, type: v })} /></div>
      <div className="ee-small ee-muted" data-testid="drive-count">{rows.length} result{rows.length === 1 ? "" : "s"}{s.q ? ` for “${s.q}”` : ""}{s.type ? ` · Type: ${s.type}` : ""}</div>
      <Card style={{ marginTop: 8 }} data-testid="drive-results"><Table cols={[{ key: "name", label: "Name", render: (r) => <span>{r.icon} {highlightText(r.name, s.q)}</span> }, { key: "type", label: "Type", render: (r) => <Badge data-testid={`type-${r.id}`}>{r.type}</Badge> }, { key: "text", label: "Content", render: (r) => <span className="ee-small">{highlightText(r.text, s.q)}</span> }, { key: "owner", label: "Owner" }]} rows={rows} rowKey={(r) => r.id} empty="No files match" /></Card>
    </SaasShell>
  );
}
