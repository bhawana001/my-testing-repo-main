"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, KV, Field, Input, Alert } from "@/app/components/eval/ui";
import { useState } from "react";
import { isValidEmail } from "@/lib/seed";

const TEMPLATES = [
  { id: "tpl-offer", name: "Offer letter", doc: "Offer-Letter.pdf", role: "Candidate", subject: "Your offer from Acme Inc", fields: { Title: "Senior Engineer", "Base salary": "$165,000", "Start date": "2026-10-05", Manager: "Priya Nair" } },
  { id: "tpl-nda", name: "Mutual NDA", doc: "Mutual-NDA.pdf", role: "Signer", subject: "Please sign our NDA", fields: { Term: "2 years", Jurisdiction: "California" } },
];
const seed = () => ({ tpl: null, sent: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [err, setErr] = useState(null);
  const t = TEMPLATES.find((x) => x.id === s.tpl);
  function send() { if (!name.trim() || !isValidEmail(email)) { setErr("Enter the candidate's name and a valid email."); return; } setErr(null); set({ ...s, sent: { id: "ENV-" + t.id.slice(4).toUpperCase() + "-0914", name: name.trim(), email: email.trim() } }); }
  return (
    <SaasShell flow={flow} nav={["Home", "Agreements", "Templates"]} active="Templates" title={t ? `Use template · ${t.name}` : "Templates"}>
      {!t ? (
        <div className="ee-grid ee-grid--2" data-testid="templates">{TEMPLATES.map((x) => <Card key={x.id} tight><div className="ee-strong">📑 {x.name}</div><div className="ee-small ee-muted">{x.doc} · Role: {x.role}</div><Btn size="sm" style={{ marginTop: 8 }} onClick={() => set({ ...s, tpl: x.id })} data-testid={`use-${x.id}`}>Use</Btn></Card>)}</div>
      ) : s.sent ? (
        <Card data-testid="template-sent"><Badge tone="ok">Sent</Badge><h2 style={{ margin: "8px 0" }}>Envelope sent from template “{t.name}”</h2><KV k="Envelope" v={s.sent.id} /><KV k="To" v={`${s.sent.name} <${s.sent.email}>`} />{Object.entries(t.fields).map(([k, v]) => <KV key={k} k={k} v={v} testId={`sent-field-${k.replace(/\s+/g, "-").toLowerCase()}`} />)}</Card>
      ) : (
        <div className="ee-split">
          <Card title="Prefilled from template" data-testid="prefilled">
            <KV k="Document" v={t.doc} testId="pre-doc" /><KV k="Email subject" v={t.subject} testId="pre-subject" /><KV k="Recipient role" v={t.role} testId="pre-role" />
            {Object.entries(t.fields).map(([k, v]) => <KV key={k} k={k} v={v} testId={`pre-field-${k.replace(/\s+/g, "-").toLowerCase()}`} />)}
          </Card>
          <Card title={`${t.role} details`} data-testid="recipient-form">
            <div className="ee-stack">
              <Field label="Name" htmlFor="tp-name"><Input id="tp-name" value={name} onChange={(e) => setName(e.target.value)} /></Field>
              <Field label="Email" htmlFor="tp-email"><Input id="tp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
              {err && <Alert tone="err">{err}</Alert>}
              <Btn onClick={send} data-testid="template-send">Send</Btn>
            </div>
          </Card>
        </div>
      )}
    </SaasShell>
  );
}
