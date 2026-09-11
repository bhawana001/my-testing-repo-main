"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Textarea, Alert, Table, Badge, Input, Modal } from "@/app/components/eval/ui";
import { ISSUES, runJql } from "./_data";

const seed = () => ({ jql: "", ran: null, filters: [{ id: 10001, name: "My open issues", jql: "assignee = \"Demo User\" AND status != Done" }] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState(s.jql); const [save, setSave] = useState(false); const [name, setName] = useState(""); const [saved, setSaved] = useState(null);
  const res = s.ran !== null ? runJql(s.ran, ISSUES) : null;
  return (
    <SaasShell flow={flow} nav={["Your work", "Projects", "Filters", "Dashboards"]} active="Filters" title="Search issues" sub="Advanced search (JQL)">
      <Card data-testid="jql-box">
        <Textarea value={q} onChange={(e) => setQ(e.target.value)} placeholder='project = WEB AND priority = High' aria-label="JQL query" style={{ fontFamily: "ui-monospace, monospace", minHeight: 60 }} />
        <div className="ee-row" style={{ marginTop: 8 }}><Btn onClick={() => set({ ...s, jql: q, ran: q.trim() })} data-testid="run-jql">Search</Btn>{res?.rows && <Btn variant="secondary" onClick={() => setSave(true)} data-testid="save-filter">Save filter</Btn>}</div>
      </Card>
      {res?.error && <Alert tone="err" data-testid="jql-error">{res.error}</Alert>}
      {saved && <Alert tone="ok" data-testid="filter-saved">Filter “{saved}” saved.</Alert>}
      {res?.rows && (
        <Card title={`${res.rows.length} issue${res.rows.length === 1 ? "" : "s"}`} style={{ marginTop: 12 }} data-testid="jql-results">
          <Table cols={[{ key: "key", label: "Key" }, { key: "summary", label: "Summary" }, { key: "priority", label: "Priority" }, { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> }]} rows={res.rows} rowKey={(r) => r.key} empty="No issues match this query" />
        </Card>
      )}
      <Card title="Starred filters" style={{ marginTop: 12 }} data-testid="saved-filters">
        {s.filters.map((f) => <div key={f.id} className="ee-row ee-row--between ee-small" data-testid={`filter-${f.id}`}><span><b>{f.name}</b> <span className="ee-mono ee-muted">{f.jql}</span></span><Btn size="sm" variant="ghost" onClick={() => { setQ(f.jql); set({ ...s, jql: f.jql, ran: f.jql }); }}>Run</Btn></div>)}
      </Card>
      <Modal open={save} title="Save filter" onClose={() => setSave(false)}>
        <div className="ee-stack"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Filter name" aria-label="Filter name" /><Btn disabled={!name.trim()} onClick={() => { set({ ...s, filters: [...s.filters, { id: 10001 + s.filters.length, name: name.trim(), jql: s.ran }] }); setSaved(name.trim()); setName(""); setSave(false); }} data-testid="save-filter-confirm">Save</Btn></div>
      </Modal>
    </SaasShell>
  );
}
