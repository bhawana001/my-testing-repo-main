"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Field, Input, Select, Textarea, Btn, Alert, Table, Segment, Badge } from "@/app/components/eval/ui";
import { isValidEmail } from "@/lib/seed";

const seed = () => ({ view: "form", rows: [{ id: "rec-1", name: "Maria Chen", email: "maria@globex.test", rating: "4", feedback: "Love the new dashboard.", via: "Form" }], submitted: false });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ name: "", email: "", rating: "", feedback: "" }); const [err, setErr] = useState(null);
  function submit() {
    if (!f.name.trim() || !f.rating) { setErr("Name and Rating are required."); return; }
    if (!isValidEmail(f.email)) { setErr("Please enter a valid email."); return; }
    setErr(null);
    set({ ...s, rows: [...s.rows, { id: "rec-" + (s.rows.length + 1), ...f, via: "Form" }], submitted: true }); setF({ name: "", email: "", rating: "", feedback: "" });
  }
  return (
    <>
      <Topbar entity={ent} nav={["Grid view", "Form"]} light right={<Segment options={[{ value: "form", label: "Shared form" }, { value: "grid", label: "Grid view" }]} value={s.view} onChange={(v) => set({ ...s, view: v })} />} />
      <main className="ee-main">
        {s.view === "form" ? (
          <Card style={{ maxWidth: 560, margin: "0 auto" }} data-testid="shared-form">
            <div style={{ height: 6, background: "#fcb400", borderRadius: 6, marginBottom: 12 }} />
            <h1 style={{ fontSize: 24 }}>Product feedback</h1>
            <p className="ee-small ee-muted" style={{ marginBottom: 14 }}>Tell us how we're doing. Takes 1 minute.</p>
            {s.submitted ? (<div className="ee-stack"><Alert tone="ok" data-testid="form-thanks">Thanks for submitting the form!</Alert><Btn variant="secondary" size="sm" onClick={() => set({ ...s, submitted: false })}>Submit another response</Btn></div>) : (
            <div className="ee-stack">
              <Field label="Name *" htmlFor="af-name"><Input id="af-name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
              <Field label="Email *" htmlFor="af-email"><Input id="af-email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
              <Field label="Rating *" htmlFor="af-rating"><Select id="af-rating" value={f.rating} onChange={(e) => setF({ ...f, rating: e.target.value })}><option value="">Choose…</option>{["1", "2", "3", "4", "5"].map((r) => <option key={r} value={r}>{"★".repeat(Number(r))} ({r})</option>)}</Select></Field>
              <Field label="Feedback" htmlFor="af-feedback"><Textarea id="af-feedback" value={f.feedback} onChange={(e) => setF({ ...f, feedback: e.target.value })} /></Field>
              {err && <Alert tone="err">{err}</Alert>}
              <Btn onClick={submit} data-testid="form-submit" style={{ background: "#2d7ff9" }}>Submit</Btn>
            </div>)}
          </Card>
        ) : (
          <Card title="Feedback · Grid view" data-testid="grid">
            <Table cols={[{ key: "id", label: "ID" }, { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "rating", label: "Rating", render: (r) => `${r.rating} ★` }, { key: "feedback", label: "Feedback" }, { key: "via", label: "Source", render: (r) => <Badge>{r.via}</Badge> }]} rows={s.rows} rowKey={(r) => r.id} />
            <div className="ee-small ee-muted" style={{ marginTop: 8 }} data-testid="grid-count">{s.rows.length} records</div>
          </Card>
        )}
      </main>
    </>
  );
}
