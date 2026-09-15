"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Textarea, Field, Badge, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, SUPPORT_ADDRESS, useStore } from "../shared";

/**
 * A simulated mail client. Sending here is the same path a real inbound email
 * takes: subject becomes the ticket subject, From becomes the requester.
 */
export default function Inbound() {
  const [s, update] = useStore();
  const [from, setFrom] = useState("Leo Marsh <leo@harbourfreight.test>");
  const [subject, setSubject] = useState("Login link never arrives");
  const [body, setBody] = useState("I have asked for the magic link three times and nothing lands in my inbox.");
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);

  function parseFrom(value) {
    const m = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
    if (m) return { name: m[1] || m[2], email: m[2] };
    return { name: value.split("@")[0], email: value.trim() };
  }

  function send() {
    if (!subject.trim()) { setError("An email needs a subject — it becomes the ticket subject."); return; }
    const sender = parseFrom(from);
    if (!sender.email.includes("@")) { setError("Enter a valid From address."); return; }
    const ticket = {
      id: `#${s.counter}`, subject: subject.trim(), requester: sender.name, email: sender.email,
      status: "Open", priority: "Medium", source: "Email", mergedFrom: [],
      thread: [{ from: sender.name, type: "public", text: body.trim(), at: "2026-09-16 09:00" }],
    };
    update((st) => { st.tickets.unshift(ticket); st.counter += 1; return st; });
    setError(null);
    setCreated(ticket);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Inbound email" sub={`Anything sent to ${SUPPORT_ADDRESS} becomes a ticket`}>
        {error && <Banner tone="bad" testId="email-error">{error}</Banner>}
        {created && (
          <Card title="Ticket created" tone="ok" testId="ticket-created">
            <Row label="Ticket id" value={created.id} testId="created-id" />
            <Row label="Subject" value={created.subject} testId="created-subject" />
            <Row label="Requester" value={created.requester} testId="created-requester" />
            <Row label="Requester email" value={created.email} testId="created-email" />
            <Row label="Source" value={created.source} testId="created-source" />
            <Badge tone="ok" testId="created-status">{created.status}</Badge>
            <div className="ck-card-actions">
              <Link href={`${BASE}/tickets`} className="ck-btn ck-btn--primary" data-testid="open-tickets">
                Open it in the ticket list
              </Link>
            </div>
          </Card>
        )}

        <Card title="Compose">
          <Field label="From">
            <Input value={from} data-testid="email-from" aria-label="From"
                   onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="To">
            <Input value={SUPPORT_ADDRESS} readOnly data-testid="email-to" aria-label="To" />
          </Field>
          <Field label="Subject">
            <Input value={subject} data-testid="email-subject" aria-label="Subject"
                   onChange={(e) => setSubject(e.target.value)} />
          </Field>
          <Field label="Message">
            <Textarea value={body} rows={4} data-testid="email-body" aria-label="Message"
                      onChange={(e) => setBody(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={send} data-testid="send-email">Send the email</Btn>
          </div>
        </Card>
      </Page>
    </Shell>
  );
}
