"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Select, Textarea, Table, Alert, Stepper, Badge } from "@/app/components/eval/ui";
import { useState } from "react";

const SAMPLE = "Full Name,E-mail,Org,Phone\nPriya Raman,priya@nimbus.test,Nimbus Labs,555-0101\nJon Park,jon@vertex.test,Vertex AI,555-0102\nLena Ortiz,lena@quanta.test,Quanta Foods,555-0103";
const CRM_FIELDS = [{ v: "", l: "— Do not import —" }, { v: "lastName", l: "Last Name" }, { v: "email", l: "Email" }, { v: "company", l: "Company" }, { v: "phone", l: "Phone" }];
const parse = (csv) => { const [h, ...rows] = csv.trim().split(/\r?\n/); const headers = h.split(",").map((x) => x.trim()); return { headers, rows: rows.map((r) => r.split(",").map((x) => x.trim())) }; };
const seed = () => ({ step: 0, csv: "", map: {}, leads: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [err, setErr] = useState(null);
  const data = s.csv.trim() ? parse(s.csv) : null;
  function toMap() { if (!data || data.rows.length === 0) { setErr("Paste CSV data or load the sample file."); return; } setErr(null); set({ ...s, step: 1, map: { "Full Name": "lastName", "E-mail": "email", Org: "", Phone: "phone" } }); }
  function toPreview() { const mapped = Object.values(s.map); if (!mapped.includes("lastName") || !mapped.includes("company")) { setErr("Map the mandatory fields: Last Name and Company."); return; } setErr(null); set({ ...s, step: 2 }); }
  const records = data ? data.rows.map((r, i) => { const rec = { id: "L-" + (i + 1) }; data.headers.forEach((h, j) => { if (s.map[h]) rec[s.map[h]] = r[j]; }); return rec; }) : [];
  return (
    <SaasShell flow={flow} nav={["Home", "Leads", "Contacts", "Deals", "Setup"]} active="Leads" title="Import Leads">
      <Stepper steps={["Upload file", "Map fields", "Preview & import"]} current={s.step === 3 ? 3 : s.step} />
      {s.step === 0 && (<Card data-testid="import-upload"><div className="ee-stack">
        <div className="ee-row"><Btn variant="secondary" size="sm" onClick={() => set({ ...s, csv: SAMPLE })} data-testid="load-sample">Load sample leads.csv</Btn><span className="ee-small ee-muted">or paste CSV below</span></div>
        <Textarea value={s.csv} onChange={(e) => set({ ...s, csv: e.target.value })} aria-label="CSV data" style={{ minHeight: 140, fontFamily: "ui-monospace, monospace" }} />
        {data && <div className="ee-small ee-muted" data-testid="row-count">{data.rows.length} rows · columns: {data.headers.join(", ")}</div>}
        {err && <Alert tone="err">{err}</Alert>}
        <Btn onClick={toMap} data-testid="to-mapping">Next</Btn>
      </div></Card>)}
      {s.step === 1 && data && (<Card title="Map CSV columns to Lead fields" data-testid="import-mapping"><div className="ee-stack">
        {data.headers.map((h) => <div key={h} className="ee-row ee-row--between"><span className="ee-mono">{h}</span><Select value={s.map[h] || ""} onChange={(e) => set({ ...s, map: { ...s.map, [h]: e.target.value } })} aria-label={`Map ${h}`} style={{ maxWidth: 240 }}>{CRM_FIELDS.map((f) => <option key={f.v} value={f.v}>{f.l}</option>)}</Select></div>)}
        {err && <Alert tone="err" data-testid="mapping-error">{err}</Alert>}
        <div className="ee-row"><Btn variant="secondary" onClick={() => set({ ...s, step: 0 })}>Back</Btn><Btn onClick={toPreview} data-testid="to-preview">Next</Btn></div>
      </div></Card>)}
      {s.step === 2 && (<Card title="Preview" data-testid="import-preview">
        <Table cols={[{ key: "lastName", label: "Last Name" }, { key: "email", label: "Email" }, { key: "company", label: "Company" }, { key: "phone", label: "Phone" }]} rows={records} rowKey={(r) => r.id} />
        <div className="ee-row" style={{ marginTop: 10 }}><Btn variant="secondary" onClick={() => set({ ...s, step: 1 })}>Back</Btn><Btn onClick={() => set({ ...s, step: 3, leads: records.map((r, i) => ({ ...r, id: "LD-" + (5001 + i), source: "Import" })) })} data-testid="do-import">Import {records.length} leads</Btn></div>
      </Card>)}
      {s.step === 3 && (<Card title="Leads" data-testid="imported-leads">
        <Alert tone="ok" data-testid="import-done">{s.leads.length} leads imported successfully. 0 skipped.</Alert>
        <div style={{ height: 8 }} />
        <Table cols={[{ key: "id", label: "Lead ID" }, { key: "lastName", label: "Last Name" }, { key: "email", label: "Email" }, { key: "company", label: "Company" }, { key: "phone", label: "Phone" }, { key: "source", label: "Source", render: (r) => <Badge>{r.source}</Badge> }]} rows={s.leads} rowKey={(r) => r.id} />
      </Card>)}
    </SaasShell>
  );
}
