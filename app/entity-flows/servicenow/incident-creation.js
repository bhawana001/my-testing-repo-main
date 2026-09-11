"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Field, Input, Select, Textarea, Alert, Table, Badge, KV } from "@/app/components/eval/ui";

// Assignment rules: category → assignment group; impact × urgency → priority.
const GROUPS = { Network: "Network Operations", Software: "Application Support", Hardware: "Desktop Support", Database: "DBA Team" };
export function priority(impact, urgency) { const s = Number(impact) + Number(urgency); return s <= 2 ? "1 - Critical" : s === 3 ? "2 - High" : s === 4 ? "3 - Moderate" : s === 5 ? "4 - Low" : "5 - Planning"; }
const seed = () => ({ incidents: [{ number: "INC0010041", short: "VPN drops every 10 minutes", category: "Network", priority: "3 - Moderate", group: "Network Operations", state: "In Progress" }], seq: 42, view: "list" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ caller: "Demo User", category: "", short: "", description: "", impact: "2", urgency: "2" }); const [err, setErr] = useState(null); const [last, setLast] = useState(null);
  function submit() {
    if (!f.category || !f.short.trim()) { setErr("Category and Short description are mandatory."); return; }
    setErr(null);
    const inc = { number: "INC00100" + s.seq, short: f.short.trim(), category: f.category, priority: priority(f.impact, f.urgency), group: GROUPS[f.category], state: "New" };
    set({ ...s, incidents: [inc, ...s.incidents], seq: s.seq + 1, view: "list" }); setLast(inc); setF({ ...f, category: "", short: "", description: "" });
  }
  return (
    <SaasShell flow={flow} nav={["Self-Service", "Incident", "Change", "Service Catalog", "Knowledge"]} active="Incident" title={s.view === "new" ? "Incident · New record" : "Incidents"} actions={s.view === "list" && <Btn size="sm" onClick={() => set({ ...s, view: "new" })} data-testid="new-incident">New</Btn>}>
      {last && s.view === "list" && <Alert tone="ok" data-testid="incident-created">Incident {last.number} created and assigned to {last.group}.</Alert>}
      {s.view === "new" ? (
        <Card data-testid="incident-form">
          <div className="ee-grid ee-grid--2">
            <Field label="Caller"><Input value={f.caller} readOnly aria-label="Caller" /></Field>
            <Field label="Category *" htmlFor="inc-cat"><Select id="inc-cat" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}><option value="">-- None --</option>{Object.keys(GROUPS).map((c) => <option key={c}>{c}</option>)}</Select></Field>
            <Field label="Impact" htmlFor="inc-impact"><Select id="inc-impact" value={f.impact} onChange={(e) => setF({ ...f, impact: e.target.value })}><option value="1">1 - High</option><option value="2">2 - Medium</option><option value="3">3 - Low</option></Select></Field>
            <Field label="Urgency" htmlFor="inc-urgency"><Select id="inc-urgency" value={f.urgency} onChange={(e) => setF({ ...f, urgency: e.target.value })}><option value="1">1 - High</option><option value="2">2 - Medium</option><option value="3">3 - Low</option></Select></Field>
            <div style={{ gridColumn: "1 / -1" }}><Field label="Short description *" htmlFor="inc-short"><Input id="inc-short" value={f.short} onChange={(e) => setF({ ...f, short: e.target.value })} /></Field></div>
            <div style={{ gridColumn: "1 / -1" }}><Field label="Description" htmlFor="inc-desc"><Textarea id="inc-desc" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></Field></div>
          </div>
          <KV k="Calculated priority" v={<Badge tone="warn" data-testid="calc-priority">{priority(f.impact, f.urgency)}</Badge>} />
          {err && <Alert tone="err">{err}</Alert>}
          <div className="ee-row" style={{ marginTop: 10 }}><Btn variant="secondary" onClick={() => set({ ...s, view: "list" })}>Cancel</Btn><Btn onClick={submit} data-testid="submit-incident">Submit</Btn></div>
        </Card>
      ) : (
        <Card data-testid="incident-list">
          <Table cols={[{ key: "number", label: "Number" }, { key: "short", label: "Short description" }, { key: "category", label: "Category" }, { key: "priority", label: "Priority" }, { key: "group", label: "Assignment group" }, { key: "state", label: "State", render: (r) => <Badge tone="info">{r.state}</Badge> }]} rows={s.incidents} rowKey={(r) => r.number} />
        </Card>
      )}
    </SaasShell>
  );
}
