"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Field, Input, Textarea, Alert, Table, Badge, Segment } from "@/app/components/eval/ui";
import { STATUS_TONE } from "@/lib/seed/helpdesk";

const seed = () => ({ view: "mail", tickets: [{ id: 2044, subject: "Order #A-7731 not delivered", requester: "Maria Chen <maria@globex.test>", source: "Portal", status: "Open" }], sent: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [subject, setSubject] = useState(""); const [body, setBody] = useState(""); const [err, setErr] = useState(null);
  function send() {
    if (!subject.trim() || !body.trim()) { setErr("Add a subject and a message."); return; }
    setErr(null);
    const t = { id: 2044 + s.tickets.length + 7, subject: subject.trim(), requester: "Demo User <demo@evals.dev>", source: "Email", status: "Open", body: body.trim() };
    set({ ...s, tickets: [t, ...s.tickets], sent: { subject: t.subject, id: t.id } }); setSubject(""); setBody("");
  }
  return (
    <SaasShell flow={flow} nav={["Dashboard", "Tickets", "Contacts", "Admin"]} active="Tickets" title={s.view === "mail" ? "Mail client (simulated)" : "All tickets"} actions={<Segment options={[{ value: "mail", label: "Send email" }, { value: "tickets", label: "Helpdesk" }]} value={s.view} onChange={(v) => set({ ...s, view: v })} />}>
      {s.view === "mail" ? (
        <Card style={{ maxWidth: 640 }} data-testid="mail-client">
          <div className="ee-stack">
            <Field label="From"><Input readOnly value="Demo User <demo@evals.dev>" aria-label="From" /></Field>
            <Field label="To"><Input readOnly value="support@acme.freshdeskly.test" aria-label="To" /></Field>
            <Field label="Subject" htmlFor="ml-subject"><Input id="ml-subject" value={subject} onChange={(e) => setSubject(e.target.value)} /></Field>
            <Field label="Message" htmlFor="ml-body"><Textarea id="ml-body" value={body} onChange={(e) => setBody(e.target.value)} /></Field>
            {err && <Alert tone="err">{err}</Alert>}
            {s.sent && <Alert tone="ok" data-testid="mail-sent">Email “{s.sent.subject}” sent to support@acme.freshdeskly.test. Auto-reply: ticket #{s.sent.id} created.</Alert>}
            <Btn onClick={send} data-testid="mail-send">Send email</Btn>
          </div>
        </Card>
      ) : (
        <Card data-testid="ticket-list">
          <Table cols={[{ key: "id", label: "ID", render: (r) => `#${r.id}` }, { key: "subject", label: "Subject", render: (r) => <span data-testid={`ticket-subject-${r.id}`}>{r.subject}</span> }, { key: "requester", label: "Requester", render: (r) => <span data-testid={`ticket-requester-${r.id}`}>{r.requester}</span> }, { key: "source", label: "Source", render: (r) => <Badge>{r.source === "Email" ? "✉ Email" : r.source}</Badge> }, { key: "status", label: "Status", render: (r) => <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge> }]} rows={s.tickets} rowKey={(r) => r.id} />
        </Card>
      )}
    </SaasShell>
  );
}
