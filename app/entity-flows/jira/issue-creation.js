"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Modal, Field, Input, Select, Textarea, Alert, KV, Badge } from "@/app/components/eval/ui";

const seed = () => ({ next: 128, issues: [], open: null, toast: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [modal, setModal] = useState(false); const [f, setF] = useState({ type: "Bug", summary: "", priority: "Medium", component: "", description: "" }); const [err, setErr] = useState(null);
  function create() {
    if (!f.summary.trim()) { setErr("Summary is required."); return; }
    if (f.type === "Bug" && !f.component) { setErr("Component is required for Bugs."); return; }
    setErr(null);
    const issue = { key: "WEB-" + s.next, ...f, summary: f.summary.trim(), status: "To Do", reporter: "Demo User" };
    set({ ...s, next: s.next + 1, issues: [issue, ...s.issues], open: issue.key, toast: `${issue.key} has been created` }); setModal(false); setF({ type: "Bug", summary: "", priority: "Medium", component: "", description: "" });
  }
  const iss = s.issues.find((i) => i.key === s.open);
  return (
    <SaasShell flow={flow} nav={["Your work", "Projects · Website", "Filters", "Dashboards"]} active="Projects · Website" title={iss ? `${iss.key} · ${iss.summary}` : "Website · Issues"} actions={<Btn size="sm" onClick={() => setModal(true)} data-testid="create-issue">Create</Btn>}>
      {s.toast && <Alert tone="ok" data-testid="create-toast">{s.toast}</Alert>}
      {iss ? (
        <Card style={{ marginTop: 10 }} data-testid="issue-view">
          <KV k="Key" v={<span className="ee-mono" data-testid="issue-key">{iss.key}</span>} /><KV k="Type" v={<span data-testid="issue-type">{iss.type}</span>} /><KV k="Priority" v={<Badge tone={iss.priority === "Highest" || iss.priority === "High" ? "err" : "warn"} data-testid="issue-priority">{iss.priority}</Badge>} /><KV k="Component" v={<span data-testid="issue-component">{iss.component || "None"}</span>} /><KV k="Status" v={<Badge>{iss.status}</Badge>} /><KV k="Reporter" v={iss.reporter} />
        </Card>
      ) : <Card style={{ marginTop: 10 }}><div className="ee-empty">No issues created in this session. Click Create.</div></Card>}
      <Modal open={modal} title="Create issue" onClose={() => setModal(false)} wide>
        <div className="ee-grid ee-grid--2" data-testid="create-form">
          <Field label="Project"><Select value="WEB" readOnly aria-label="Project"><option value="WEB">Website (WEB)</option></Select></Field>
          <Field label="Issue type" htmlFor="ji-type"><Select id="ji-type" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{["Bug", "Story", "Task"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
          <div style={{ gridColumn: "1 / -1" }}><Field label="Summary *" htmlFor="ji-summary"><Input id="ji-summary" value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} /></Field></div>
          <Field label="Priority" htmlFor="ji-priority"><Select id="ji-priority" value={f.priority} onChange={(e) => setF({ ...f, priority: e.target.value })}>{["Highest", "High", "Medium", "Low", "Lowest"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
          <Field label={`Component${f.type === "Bug" ? " *" : ""}`} htmlFor="ji-component"><Select id="ji-component" value={f.component} onChange={(e) => setF({ ...f, component: e.target.value })}><option value="">None</option>{["Frontend", "Payments", "Auth", "Reports"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
          <div style={{ gridColumn: "1 / -1" }}><Field label="Description" htmlFor="ji-desc"><Textarea id="ji-desc" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></Field></div>
          {err && <div style={{ gridColumn: "1 / -1" }}><Alert tone="err" data-testid="create-error">{err}</Alert></div>}
          <div className="ee-row ee-row--end" style={{ gridColumn: "1 / -1" }}><Btn variant="secondary" onClick={() => setModal(false)}>Cancel</Btn><Btn onClick={create} data-testid="create-submit">Create</Btn></div>
        </div>
      </Modal>
    </SaasShell>
  );
}
