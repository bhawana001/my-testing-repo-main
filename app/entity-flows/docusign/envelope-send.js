"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn, Check } from "@/app/components/eval/ui";
import { isValidEmail } from "@/lib/seed";

const STEPS = [
  { id: "doc", title: "Add documents", heading: "Add documents", render: ({ values, setValue, errors }) => (<div className="ee-stack">{values.doc ? <Badge tone="info" data-testid="doc-added">📄 {values.doc} · 2 pages</Badge> : <Btn size="sm" variant="secondary" onClick={() => setValue("doc", "Mutual-NDA.pdf")} data-testid="add-sample-doc">+ Add sample Mutual-NDA.pdf</Btn>}{errors.doc && <div className="ee-error">{errors.doc}</div>}</div>), validate: (v) => (v.doc ? null : { doc: "Add at least one document." }) },
  { id: "recipients", title: "Recipients", heading: "Add recipients", fields: [{ name: "name", label: "Recipient name", required: true }, { name: "email", label: "Recipient email", required: true, validate: (v) => (isValidEmail(v) ? null : "Enter a valid email.") }, { name: "role", label: "Action", type: "select", required: true, options: ["Needs to sign", "Receives a copy"] }] },
  { id: "fields", title: "Place fields", heading: "Place fields on page 2", render: ({ values, setValue, errors }) => (<div className="ee-stack" data-testid="field-palette"><div className="ee-small ee-muted">Drag-free placement: tick the fields to place for the signer.</div>{["Signature", "Date Signed", "Initial", "Company"].map((f) => <Check key={f} label={f} checked={(values.fields || []).includes(f)} onChange={(e) => setValue("fields", e.target.checked ? [...(values.fields || []), f] : (values.fields || []).filter((x) => x !== f))} />)}{errors.fields && <div className="ee-error">{errors.fields}</div>}</div>), validate: (v) => ((v.fields || []).includes("Signature") ? null : { fields: "Place a Signature field for the signer." }) },
  { id: "message", title: "Message", heading: "Email subject and message", fields: [{ name: "subject", label: "Email subject", required: true }, { name: "message", label: "Message", type: "textarea" }] },
  { id: "review", title: "Review", heading: "Review and send", summary: true, nextLabel: "Send" },
];
const seed = () => ({ wiz: { ...SEED_WIZARD, values: { role: "Needs to sign", subject: "Please DocuSign: Mutual-NDA.pdf", fields: [] } } });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <SaasShell flow={flow} nav={["Home", "Agreements", "Templates", "Reports"]} active="Agreements" title="New envelope">
      <div style={{ maxWidth: 720 }}>
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Send" testIdPrefix="envelope"
          onSubmit={(v) => ({ id: "ENV-7F31A2", v })}
          result={({ id, v }) => (
            <div className="ee-stack">
              <Card data-testid="envelope-sent"><Badge tone="ok" data-testid="envelope-status">Sent</Badge><h2 style={{ margin: "8px 0" }}>Your envelope was sent</h2><KV k="Envelope ID" v={<span className="ee-mono">{id}</span>} /><KV k="Recipient" v={`${v.name} <${v.email}> · ${v.role}`} /><KV k="Fields placed" v={v.fields.join(", ")} testId="envelope-fields" /></Card>
              <Card title={`Inbox · ${v.email} (simulated)`} data-testid="recipient-inbox">
                <div className="ee-strong">{v.subject}</div>
                <div className="ee-small ee-muted">From Demo User via DocuSigned · just now</div>
                <p className="ee-small" style={{ margin: "8px 0" }}>{v.message || "Please review and sign this document."}</p>
                <a className="ee-btn ee-btn--sm" href={`/docusign/signing-ceremony?envelope=${id}&reset=true`} data-testid="signing-link">Review document</a>
              </Card>
              <Btn variant="secondary" size="sm" onClick={() => set(seed())}>Send another</Btn>
            </div>
          )} />
      </div>
    </SaasShell>
  );
}
