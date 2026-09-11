"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SlackShell } from "./_shell";
import { Message } from "@/app/components/engines/Feed";
import { Btn, Modal, Field, Input, Select, Textarea, Alert } from "@/app/components/eval/ui";

const seed = () => ({ messages: [{ id: "m1", author: "Priya Nair", time: "9:30 AM", text: "Use the ⚡ Request time off workflow for PTO." }], seq: 2 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [f, setF] = useState({ start: "", end: "", type: "Vacation", reason: "" }); const [err, setErr] = useState(null);
  function submit() {
    if (!f.start || !f.end) { setErr("Start and end dates are required."); return; }
    if (f.end < f.start) { setErr("End date must be on or after the start date."); return; }
    setErr(null);
    set((st) => ({ ...st, seq: st.seq + 1, messages: [...st.messages, { id: "m" + st.seq, author: "Workflow Bot", time: "10:0" + st.seq + " AM", text: `✅ Demo User requested time off: ${f.start} to ${f.end} (${f.type})${f.reason ? ` · “${f.reason}”` : ""}. Manager: Priya Nair has been notified.` }] }));
    setOpen(false); setF({ start: "", end: "", type: "Vacation", reason: "" });
  }
  return (
    <SlackShell flow={flow} active="general" header={<div className="ee-row ee-row--between" style={{ marginBottom: 12 }}><h1 style={{ fontSize: 18 }}># general</h1><Btn size="sm" variant="secondary" onClick={() => setOpen(true)} data-testid="open-workflow">⚡ Request time off</Btn></div>}>
      <div className="ee-feed" data-testid="message-list">{s.messages.map((m) => <Message key={m.id} msg={m} />)}</div>
      <Modal open={open} title="Request time off" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="workflow-form">
          <Field label="Start date" htmlFor="wf-start"><Input id="wf-start" type="date" value={f.start} onChange={(e) => setF({ ...f, start: e.target.value })} /></Field>
          <Field label="End date" htmlFor="wf-end"><Input id="wf-end" type="date" value={f.end} onChange={(e) => setF({ ...f, end: e.target.value })} /></Field>
          <Field label="Type" htmlFor="wf-type"><Select id="wf-type" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{["Vacation", "Sick leave", "Personal"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Reason (optional)" htmlFor="wf-reason"><Textarea id="wf-reason" value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })} /></Field>
          {err && <Alert tone="err">{err}</Alert>}
          <Btn onClick={submit} data-testid="workflow-submit">Submit</Btn>
        </div>
      </Modal>
    </SlackShell>
  );
}
