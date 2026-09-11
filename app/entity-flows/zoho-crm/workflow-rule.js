"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { DataTable } from "@/app/components/engines/Crud";
import { Card, KV, Badge } from "@/app/components/eval/ui";

const FIELDS = [
  { name: "lastName", label: "Last Name", required: true },
  { name: "company", label: "Company", required: true },
  { name: "source", label: "Lead Source", type: "select", required: true, options: ["Web", "Trade Show", "Cold Call", "Referral"] },
];
const seed = () => ({ rows: [{ id: "LD-1", lastName: "Chen", company: "Globex", source: "Web", rating: "Warm", owner: "Tom Alvarez", wf: false }], log: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  function onChange(rows) {
    const log = [...s.log];
    const next = rows.map((r) => {
      if (r.source === "Trade Show" && !r.wf) { log.unshift({ id: r.id, text: `Rule “Trade show leads” fired on ${r.id}: Rating → Hot, Owner → Priya Nair` }); return { ...r, rating: "Hot", owner: "Priya Nair", wf: true }; }
      return { rating: "Cold", owner: "Demo User", wf: false, ...r };
    });
    set({ rows: next, log });
  }
  return (
    <SaasShell flow={flow} nav={["Home", "Leads", "Setup · Workflow Rules"]} active="Leads" title="Leads">
      <Card title="Active workflow rule" data-testid="rule"><KV k="Rule" v="Trade show leads" /><KV k="When" v="A lead is created with Lead Source = Trade Show" /><KV k="Field updates" v="Rating = Hot · Lead Owner = Priya Nair" /></Card>
      <div style={{ height: 14 }} />
      <DataTable rows={s.rows} onChange={onChange} fields={FIELDS} idPrefix="LD" createLabel="Create Lead" testIdPrefix="zleads" canDelete={false} canEdit={false}
        columns={[{ key: "id", label: "Lead ID" }, { key: "lastName", label: "Last Name" }, { key: "company", label: "Company" }, { key: "source", label: "Lead Source" }, { key: "rating", label: "Rating", render: (r) => <span data-testid={`rating-${r.id}`}><Badge tone={r.rating === "Hot" ? "err" : r.rating === "Warm" ? "warn" : undefined}>{r.rating}</Badge>{r.wf && <span className="ee-tiny ee-muted"> · updated by workflow</span>}</span> }, { key: "owner", label: "Owner", render: (r) => <span data-testid={`owner-${r.id}`}>{r.owner}</span> }]} />
      <Card title="Workflow log" style={{ marginTop: 14 }} data-testid="wf-log">{s.log.length === 0 ? <div className="ee-tiny ee-muted">No rules have fired yet.</div> : s.log.map((l, i) => <div key={i} className="ee-small">{l.text}</div>)}</Card>
    </SaasShell>
  );
}
