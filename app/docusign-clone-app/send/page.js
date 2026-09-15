"use client";
// Envelope send for signature (43.1) and template reuse (43.3). Choosing a
// template prefills the subject, message and field list.
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Textarea, Select, Badge, Banner, Row } from "../../clones/kit/ui";
import { BRAND, BASE, FIELD_TYPES, TEMPLATES, useStore, nextEnvelopeId } from "../shared";

function SendInner() {
  const [s, update] = useStore();
  const params = useSearchParams();
  const preset = TEMPLATES.find((t) => t.id === params.get("tpl")) || null;

  const [templateId, setTemplateId] = useState(preset?.id || "");
  const [subject, setSubject] = useState(preset?.subject || "");
  const [message, setMessage] = useState(preset?.message || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fields, setFields] = useState(preset ? preset.fields.map((f) => ({ ...f })) : [
    { type: "signature", label: "Signature" },
    { type: "date", label: "Date signed" },
  ]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  function pickTemplate(id) {
    setTemplateId(id);
    const t = TEMPLATES.find((x) => x.id === id);
    if (!t) return;
    setSubject(t.subject);
    setMessage(t.message);
    setFields(t.fields.map((f) => ({ ...f })));
  }

  function send() {
    const e = {};
    if (!name.trim()) e.name = "Enter the recipient's name.";
    if (!email.includes("@")) e.email = "Enter a valid recipient email.";
    if (!subject.trim()) e.subject = "Enter a subject.";
    if (fields.length < 2) e.fields = "Add at least two fields for the signer to complete.";
    setErrors(e);
    if (Object.keys(e).length) return;
    const id = nextEnvelopeId(s.counter);
    const env = { id, subject: subject.trim(), message: message.trim(), recipient: email.trim(),
                  recipientName: name.trim(), status: "sent", sentAt: "2026-09-15", completedAt: null,
                  fields: fields.map((f) => ({ ...f, value: "" })),
                  fromTemplate: templateId ? TEMPLATES.find((t) => t.id === templateId).name : null, sealed: false };
    update((st) => { st.envelopes.unshift(env); st.counter += 1; return st; });
    setSent(env);
  }

  if (sent) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Envelopes" }]} />
        <Page>
          <Banner tone="ok" title="Envelope sent" testId="envelope-sent">
            <strong data-testid="sent-envelope-id">{sent.id}</strong> was sent to {sent.recipientName} ({sent.recipient}).
          </Banner>
          <Card title="Signing link" testId="signing-link-card">
            <Row label="Recipient" value={`${sent.recipientName} · ${sent.recipient}`} testId="sent-recipient" />
            <Row label="Fields to complete" value={String(sent.fields.length)} testId="sent-field-count" />
            {sent.fromTemplate && <Row label="From template" value={sent.fromTemplate} testId="sent-template" />}
            <Btn as="link" href={`${BASE}/sign?e=${sent.id}`} block data-testid="open-signing-link">
              Open the recipient's signing link
            </Btn>
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Envelopes" }, { href: `${BASE}/templates`, label: "Templates" }]} />
      <Page title="Send for signature">
        <div className="ck-split">
          <Card title="Document">
            <Field label="Start from a template">
              <Select value={templateId} onChange={(e) => pickTemplate(e.target.value)} aria-label="Template" data-testid="template-select">
                <option value="">Blank document</option>
                {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </Select>
            </Field>
            <Field label="Subject" error={errors.subject}>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Subject" data-testid="subject" />
            </Field>
            <Field label="Message to signer">
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} aria-label="Message" data-testid="message" />
            </Field>
            <div className="ck-strong" style={{ margin: "10px 0 6px" }}>Fields for the signer</div>
            {errors.fields && <div className="ck-field-error">{errors.fields}</div>}
            <div data-testid="field-list">
              {fields.map((f, i) => (
                <Row key={i} label={FIELD_TYPES.find((t) => t.id === f.type)?.label || f.type}
                     value={f.label} testId={`field-${i}`} />
              ))}
            </div>
            <div className="ck-card-actions">
              {FIELD_TYPES.map((t) => (
                <Btn key={t.id} size="sm" variant="secondary" data-testid={`add-field-${t.id}`}
                     onClick={() => setFields((v) => [...v, { type: t.id, label: t.label }])}>
                  + {t.label}
                </Btn>
              ))}
            </div>
          </Card>

          <Card title="Recipient">
            <Field label="Name" error={errors.name}>
              <Input value={name} onChange={(e) => setName(e.target.value)} aria-label="Recipient name" data-testid="recipient-name" />
            </Field>
            <Field label="Email" error={errors.email}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Recipient email" data-testid="recipient-email" />
            </Field>
            <Badge tone="info" testId="field-count">{fields.length} fields</Badge>
            <Btn block style={{ marginTop: 10 }} onClick={send} data-testid="send-envelope">Send for signature</Btn>
          </Card>
        </div>
      </Page>
    </Shell>
  );
}

export default function SendPage() {
  return <Suspense fallback={<div style={{ padding: 40 }}>Loading…</div>}><SendInner /></Suspense>;
}
