"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Field, Input, Select, Textarea, Alert, Badge, KV, Segment, Timeline } from "@/app/components/eval/ui";

const seed = () => ({ role: "requester", chg: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ short: "", type: "Normal", risk: "Moderate", window: "2026-09-20", justification: "" }); const [err, setErr] = useState(null); const [comment, setComment] = useState("");
  function submit() {
    if (!f.short.trim() || !f.justification.trim()) { setErr("Short description and Justification are mandatory."); return; }
    setErr(null);
    set({ ...s, chg: { number: "CHG0030017", ...f, state: "Assess", approval: "Requested", history: [{ title: "Submitted for approval", meta: "Sep 14, 2026 · Demo User", state: "done" }, { title: "Awaiting CAB approval (Priya Nair)", meta: "Pending", state: "active" }] } });
  }
  function decide(ok) {
    if (!ok && !comment.trim()) { setErr("A comment is required when rejecting."); return; }
    setErr(null);
    set({ ...s, chg: { ...s.chg, state: ok ? "Scheduled" : "Canceled", approval: ok ? "Approved" : "Rejected", history: [{ title: ok ? "Approved by Priya Nair" : `Rejected by Priya Nair: ${comment}`, meta: "Sep 14, 2026", state: "done" }, ...s.chg.history.map((h) => ({ ...h, state: "done" }))] } });
  }
  const c = s.chg;
  return (
    <SaasShell flow={flow} nav={["Self-Service", "Incident", "Change", "Approvals"]} active="Change" title={c ? `${c.number} · ${c.short}` : "Change Request · New"} actions={<Segment options={[{ value: "requester", label: "As requester" }, { value: "approver", label: "As approver (Priya)" }]} value={s.role} onChange={(v) => set({ ...s, role: v })} />}>
      {!c ? (
        s.role === "requester" ? (
          <Card data-testid="change-form">
            <div className="ee-grid ee-grid--2">
              <div style={{ gridColumn: "1 / -1" }}><Field label="Short description *" htmlFor="chg-short"><Input id="chg-short" value={f.short} onChange={(e) => setF({ ...f, short: e.target.value })} /></Field></div>
              <Field label="Type" htmlFor="chg-type"><Select id="chg-type" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}><option>Normal</option><option>Standard</option><option>Emergency</option></Select></Field>
              <Field label="Risk" htmlFor="chg-risk"><Select id="chg-risk" value={f.risk} onChange={(e) => setF({ ...f, risk: e.target.value })}><option>Low</option><option>Moderate</option><option>High</option></Select></Field>
              <Field label="Planned start" htmlFor="chg-window"><Input id="chg-window" type="date" value={f.window} onChange={(e) => setF({ ...f, window: e.target.value })} /></Field>
              <div style={{ gridColumn: "1 / -1" }}><Field label="Justification *" htmlFor="chg-just"><Textarea id="chg-just" value={f.justification} onChange={(e) => setF({ ...f, justification: e.target.value })} /></Field></div>
            </div>
            {err && <Alert tone="err">{err}</Alert>}
            <Btn style={{ marginTop: 10 }} onClick={submit} data-testid="submit-change">Request approval</Btn>
          </Card>
        ) : <Card><div className="ee-empty">No approvals waiting for you.</div></Card>
      ) : (
        <div className="ee-split">
          <Card data-testid="change-record">
            <KV k="Number" v={c.number} /><KV k="State" v={<Badge tone={c.state === "Scheduled" ? "ok" : c.state === "Canceled" ? "err" : "warn"} data-testid="change-state">{c.state}</Badge>} /><KV k="Approval" v={<Badge tone={c.approval === "Approved" ? "ok" : c.approval === "Rejected" ? "err" : "warn"} data-testid="change-approval">{c.approval}</Badge>} /><KV k="Type" v={c.type} /><KV k="Risk" v={c.risk} /><KV k="Planned start" v={c.window} />
            {s.role === "approver" && c.approval === "Requested" && (
              <div className="ee-stack" style={{ marginTop: 12 }} data-testid="approver-actions">
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comments (required to reject)" aria-label="Approval comments" />
                {err && <Alert tone="err">{err}</Alert>}
                <div className="ee-row"><Btn variant="ok" onClick={() => decide(true)} data-testid="approve">Approve</Btn><Btn variant="danger" onClick={() => decide(false)} data-testid="reject">Reject</Btn></div>
              </div>
            )}
            {s.role === "requester" && c.approval === "Requested" && <Alert tone="info">Waiting for approval. Switch to “As approver” to act on it.</Alert>}
          </Card>
          <Card title="Approval history" data-testid="approval-history"><Timeline items={c.history} /></Card>
        </div>
      )}
    </SaasShell>
  );
}
