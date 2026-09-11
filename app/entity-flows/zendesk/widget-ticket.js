"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Field, Input, Select, Textarea, Alert, Badge, Table, Segment, KV } from "@/app/components/eval/ui";
import { isValidEmail } from "@/lib/seed";
import { PRIORITY_TONE, STATUS_TONE } from "@/lib/seed/helpdesk";

const seed = () => ({ view: "site", open: false, tickets: [{ id: 1041, subject: "Can't export invoices", requester: "Ahmed Khan", email: "ahmed@initech.test", priority: "Normal", status: "Open", channel: "Email" }], created: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ name: "", email: "", subject: "", description: "", priority: "Normal" }); const [err, setErr] = useState(null);
  function submit() {
    if (!f.name.trim() || !f.subject.trim() || !f.description.trim()) { setErr("Name, subject and description are required."); return; }
    if (!isValidEmail(f.email)) { setErr("Enter a valid email address."); return; }
    setErr(null);
    const t = { id: 1041 + s.tickets.length + 1, subject: f.subject.trim(), requester: f.name.trim(), email: f.email.trim(), priority: f.priority, status: "New", channel: "Web widget", description: f.description.trim() };
    set({ ...s, tickets: [t, ...s.tickets], created: t }); setF({ name: "", email: "", subject: "", description: "", priority: "Normal" });
  }
  return (
    <>
      <Topbar entity={ent} nav={["Product", "Pricing", "Support"]} light right={<Segment options={[{ value: "site", label: "Customer site" }, { value: "agent", label: "Agent view" }]} value={s.view} onChange={(v) => set({ ...s, view: v })} />} />
      <main className="ee-main">
        {s.view === "site" ? (
          <>
            <h1 className="ee-page-title">Acme Cloud Support</h1>
            <p className="ee-page-sub">Browse our guides or contact us using the Help button in the corner.</p>
            <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 60, width: s.open ? "min(380px, calc(100vw - 40px))" : "auto" }}>
              {s.open ? (
                <Card data-testid="widget" style={{ boxShadow: "0 20px 50px rgba(0,0,0,.25)" }}>
                  <div className="ee-row ee-row--between" style={{ marginBottom: 10 }}><span className="ee-strong">Leave us a message</span><button className="ee-link" onClick={() => set({ ...s, open: false })} aria-label="Close widget">✕</button></div>
                  {s.created ? (
                    <div className="ee-stack" data-testid="widget-success"><Alert tone="ok" title="Thanks for reaching out">Your request <b>#{s.created.id}</b> was received. We'll email {s.created.email}.</Alert><Btn variant="secondary" size="sm" onClick={() => set({ ...s, created: null })}>Send another</Btn></div>
                  ) : (
                    <div className="ee-stack">
                      <Field label="Your name" htmlFor="wg-name"><Input id="wg-name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
                      <Field label="Email address" htmlFor="wg-email"><Input id="wg-email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
                      <Field label="Subject" htmlFor="wg-subject"><Input id="wg-subject" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} /></Field>
                      <Field label="How can we help?" htmlFor="wg-desc"><Textarea id="wg-desc" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></Field>
                      <Field label="Priority" htmlFor="wg-priority"><Select id="wg-priority" value={f.priority} onChange={(e) => setF({ ...f, priority: e.target.value })}>{["Low", "Normal", "High", "Urgent"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
                      {err && <Alert tone="err">{err}</Alert>}
                      <Btn onClick={submit} data-testid="widget-send">Send</Btn>
                    </div>
                  )}
                </Card>
              ) : <Btn pill size="lg" onClick={() => set({ ...s, open: true })} data-testid="help-launcher">? Help</Btn>}
            </div>
          </>
        ) : (
          <Card title="Agent workspace · All unsolved tickets" data-testid="agent-tickets">
            <Table cols={[{ key: "id", label: "ID", render: (r) => `#${r.id}` }, { key: "subject", label: "Subject" }, { key: "requester", label: "Requester", render: (r) => `${r.requester} (${r.email})` }, { key: "priority", label: "Priority", render: (r) => <Badge tone={PRIORITY_TONE[r.priority]}>{r.priority}</Badge> }, { key: "status", label: "Status", render: (r) => <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge> }, { key: "channel", label: "Channel" }]} rows={s.tickets} rowKey={(r) => r.id} />
          </Card>
        )}
      </main>
    </>
  );
}
