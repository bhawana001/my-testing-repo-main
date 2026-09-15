"use client";
// Signing ceremony (43.2) and decline (43.4). Every required field must be
// completed and a signature adopted before finishing; declining records the
// reason the sender then sees.
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Select, Textarea, Row, Badge, Banner, Empty, Modal, Radio } from "../../clones/kit/ui";
import { BRAND, BASE, DECLINE_REASONS, useStore } from "../shared";

const STYLES = ["Caveat", "Dancing", "Signature", "Formal"];

function SignInner() {
  const [s, update] = useStore();
  const params = useSearchParams();
  const envId = params.get("e");
  const env = s.envelopes.find((e) => e.id === envId) || null;

  const [values, setValues] = useState({});
  const [adopted, setAdopted] = useState(null);
  const [adoptOpen, setAdoptOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [style, setStyle] = useState(STYLES[0]);
  const [err, setErr] = useState("");
  const [declineOpen, setDeclineOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [result, setResult] = useState(null);

  if (!env) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Envelopes" }]} />
        <Page title="Signing link"><Empty>That signing link isn't valid. Open an envelope from the list.</Empty></Page>
      </Shell>
    );
  }

  const needsSignature = env.fields.some((f) => f.type === "signature" || f.type === "initials");

  function adopt() {
    if (!typed.trim()) { setErr("Type your name to adopt a signature."); return; }
    setErr("");
    setAdopted({ name: typed.trim(), style });
    setAdoptOpen(false);
  }

  function finish() {
    const missing = env.fields.filter((f) => {
      if (f.type === "signature" || f.type === "initials") return !adopted;
      return !String(values[f.label] || "").trim();
    });
    if (missing.length) {
      setErr(`Complete every field first — ${missing.length} remaining.`);
      return;
    }
    setErr("");
    update((st) => {
      const e = st.envelopes.find((x) => x.id === env.id);
      e.status = "completed";
      e.completedAt = "2026-09-15";
      e.sealed = true;
      e.fields = e.fields.map((f) =>
        (f.type === "signature" || f.type === "initials")
          ? { ...f, value: adopted.name }
          : { ...f, value: values[f.label] || "" });
      return st;
    });
    setResult({ kind: "completed" });
  }

  function decline() {
    if (!reason) { setErr("Choose a reason for declining."); return; }
    update((st) => {
      const e = st.envelopes.find((x) => x.id === env.id);
      e.status = "declined";
      e.declineReason = reason;
      e.declineNote = note.trim();
      e.declinedAt = "2026-09-15";
      return st;
    });
    setDeclineOpen(false);
    setResult({ kind: "declined", reason, note: note.trim() });
  }

  if (result) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Envelopes" }]} />
        <Page>
          {result.kind === "completed" ? (
            <>
              <Banner tone="ok" title="You're done" testId="signing-complete">
                Envelope <strong data-testid="completed-id">{env.id}</strong> is completed. A sealed PDF has been sent to everyone.
              </Banner>
              <Card title="Completed document" testId="completed-card">
                <Row label="Status" value="completed" testId="completed-status" />
                <Badge tone="ok" testId="pdf-sealed">PDF sealed</Badge>
                {env.fields.map((f, i) => (
                  <Row key={i} label={f.label}
                       value={(f.type === "signature" || f.type === "initials") ? adopted.name : (values[f.label] || "")}
                       testId={`completed-field-${i}`} />
                ))}
              </Card>
            </>
          ) : (
            <>
              <Banner tone="bad" title="You declined to sign" testId="decline-complete">
                The sender has been notified that <strong data-testid="declined-id">{env.id}</strong> was declined.
              </Banner>
              <Card title="What the sender sees" testId="decline-card">
                <Row label="Status" value="declined" testId="declined-status" />
                <Row label="Reason" value={result.reason} testId="declined-reason" />
                {result.note && <Row label="Note" value={result.note} testId="declined-note" />}
              </Card>
            </>
          )}
          <Btn as="link" href={BASE} variant="secondary">Back to envelopes</Btn>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Envelopes" }]} />
      <Page title={env.subject} sub={`From Northwind Software · envelope ${env.id}`}>
        <div className="ck-split">
          <Card title="Document" testId="document">
            <p className="ck-muted">{env.message}</p>
            <div className="ck-tile" style={{ minHeight: 160 }}>
              <div className="ck-strong">AGREEMENT</div>
              <p className="ck-muted">This document is provided for demonstration. Complete the fields on the right to sign.</p>
            </div>
          </Card>

          <Card title="Complete these fields" testId="fields-panel">
            {err && <div className="ck-field-error" role="alert" data-testid="sign-error">{err}</div>}
            {env.fields.map((f, i) => (
              <div key={i} data-testid={`sign-field-${i}`}>
                {(f.type === "signature" || f.type === "initials") ? (
                  <Field label={f.label}>
                    {adopted ? (
                      <Badge tone="ok" testId="adopted-signature">Adopted: {adopted.name} ({adopted.style})</Badge>
                    ) : (
                      <Btn size="sm" onClick={() => setAdoptOpen(true)} data-testid="adopt-signature">Adopt and sign</Btn>
                    )}
                  </Field>
                ) : f.type === "date" ? (
                  <Field label={f.label}>
                    <Input type="date" value={values[f.label] || ""} aria-label={f.label} data-testid={`input-${i}`}
                           onChange={(e) => setValues({ ...values, [f.label]: e.target.value })} />
                  </Field>
                ) : (
                  <Field label={f.label}>
                    <Input value={values[f.label] || ""} aria-label={f.label} data-testid={`input-${i}`}
                           onChange={(e) => setValues({ ...values, [f.label]: e.target.value })} />
                  </Field>
                )}
              </div>
            ))}
            <div className="ck-card-actions">
              <Btn onClick={finish} data-testid="finish-signing">Finish</Btn>
              <Btn variant="secondary" onClick={() => setDeclineOpen(true)} data-testid="decline-signing">Decline to sign</Btn>
            </div>
          </Card>
        </div>

        <Modal open={adoptOpen} title="Adopt your signature" onClose={() => setAdoptOpen(false)} testId="adopt-modal"
               actions={<>
                 <Btn variant="secondary" onClick={() => setAdoptOpen(false)}>Cancel</Btn>
                 <Btn onClick={adopt} data-testid="confirm-adopt">Adopt and sign</Btn>
               </>}>
          <Field label="Full name" error={err}>
            <Input value={typed} onChange={(e) => setTyped(e.target.value)} aria-label="Full name" data-testid="signature-name" />
          </Field>
          <Field label="Style">
            <Select value={style} onChange={(e) => setStyle(e.target.value)} aria-label="Signature style" data-testid="signature-style">
              {STYLES.map((x) => <option key={x}>{x}</option>)}
            </Select>
          </Field>
          {typed && <div className="ck-tile" data-testid="signature-preview" style={{ fontStyle: "italic", fontSize: 22 }}>{typed}</div>}
        </Modal>

        <Modal open={declineOpen} title="Decline to sign" onClose={() => setDeclineOpen(false)} testId="decline-modal"
               actions={<>
                 <Btn variant="secondary" onClick={() => setDeclineOpen(false)}>Cancel</Btn>
                 <Btn variant="danger" onClick={decline} data-testid="confirm-decline">Decline</Btn>
               </>}>
          <p>The sender will be told you declined, along with your reason.</p>
          {DECLINE_REASONS.map((r) => (
            <Radio key={r} name="reason" label={r} testId={`reason-${r.slice(0, 10).replace(/\s+/g, "-").toLowerCase()}`}
                   checked={reason === r} onChange={() => setReason(r)} />
          ))}
          <Field label="Anything to add? (optional)">
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} aria-label="Decline note" data-testid="decline-note" />
          </Field>
        </Modal>
      </Page>
    </Shell>
  );
}

export default function SignPage() {
  return <Suspense fallback={<div style={{ padding: 40 }}>Loading…</div>}><SignInner /></Suspense>;
}
