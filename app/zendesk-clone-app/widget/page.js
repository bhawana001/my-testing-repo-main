"use client";
// Web widget ticket submission (30.1). The widget is a launcher plus a form;
// submitting creates a ticket with the fields the agent side then sees.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Textarea, Select, Badge, Banner, Row } from "../../clones/kit/ui";
import { BRAND, BASE, PRIORITIES, TYPES, useStore } from "../shared";

export default function WidgetPage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [type, setType] = useState("Question");
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState(null);

  function submit() {
    const e = {};
    if (!email.includes("@")) e.email = "Enter a valid email address.";
    if (!subject.trim()) e.subject = "Enter a subject.";
    if (!description.trim()) e.description = "Describe your issue.";
    setErrors(e);
    if (Object.keys(e).length) return;
    const id = s.counter + 1;
    const ticket = { id, subject: subject.trim(), requester: email.trim(), description: description.trim(),
                     priority, status: "New", type, tags: ["web-widget"], createdAt: "2026-09-15 10:30",
                     minutesOpen: 0, comments: [] };
    update((st) => { st.tickets.unshift(ticket); st.counter = id; return st; });
    setCreated(ticket);
    setOpen(false);
    setSubject(""); setDescription("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/help`, label: "Help centre" }]} />
      <Page title="Northwind Software" sub="Marketing site with the Zendisk widget installed">
        {created && (
          <Banner tone="ok" title="Ticket received" testId="ticket-created">
            Your request <strong data-testid="ticket-id">#{created.id}</strong> has been created. We'll reply to {created.requester}.
          </Banner>
        )}

        <Card title="Welcome to Northwind">
          <p className="ck-muted">Nothing here but the support widget in the corner — that's the bit under test.</p>
        </Card>

        {created && (
          <Card title="Your request" testId="created-summary">
            <Row label="Subject" value={created.subject} testId="created-subject" />
            <Row label="Priority" value={created.priority} testId="created-priority" />
            <Row label="Type" value={created.type} testId="created-type" />
            <Row label="Status" value={created.status} testId="created-status" />
            <Row label="Requester" value={created.requester} testId="created-requester" />
          </Card>
        )}

        {!open ? (
          <Btn onClick={() => setOpen(true)} data-testid="widget-launcher">💬 Help</Btn>
        ) : (
          <Card title="How can we help?" testId="widget-form">
            <Field label="Your email" error={errors.email}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Your email" data-testid="widget-email" />
            </Field>
            <Field label="Subject" error={errors.subject}>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Subject" data-testid="widget-subject" />
            </Field>
            <Field label="How can we help?" error={errors.description}>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} aria-label="Description" data-testid="widget-description" />
            </Field>
            <div className="ck-grid ck-grid--2">
              <Field label="Priority">
                <Select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Priority" data-testid="widget-priority">
                  {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                </Select>
              </Field>
              <Field label="Type">
                <Select value={type} onChange={(e) => setType(e.target.value)} aria-label="Type" data-testid="widget-type">
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </Select>
              </Field>
            </div>
            <div className="ck-card-actions">
              <Btn variant="secondary" onClick={() => setOpen(false)}>Close</Btn>
              <Btn onClick={submit} data-testid="widget-submit">Submit</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
