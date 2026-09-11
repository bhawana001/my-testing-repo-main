"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Field, Input, Select, Btn, Alert, Table, Segment, KV } from "@/app/components/eval/ui";
import { isValidEmail } from "@/lib/seed";

const seed = () => ({ view: "landing", contacts: [{ id: "c-1", first: "Maria", last: "Chen", email: "maria@globex.test", company: "Globex", size: "201–1000", source: "Organic search", created: "Sep 10, 2026" }], selected: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ first: "", last: "", email: "", company: "", size: "" }); const [err, setErr] = useState(null); const [ok, setOk] = useState(false);
  function submit(e) {
    e.preventDefault();
    if (!f.first || !f.last || !f.company || !f.size) { setErr("Please complete all required fields."); return; }
    if (!isValidEmail(f.email)) { setErr("Please enter a valid email address."); return; }
    setErr(null);
    const c = { id: "c-" + (s.contacts.length + 1), ...f, source: "Form: Ebook download", created: "Sep 14, 2026" };
    set({ ...s, contacts: [c, ...s.contacts] }); setOk(true); setF({ first: "", last: "", email: "", company: "", size: "" });
  }
  const sel = s.contacts.find((c) => c.id === s.selected);
  return (
    <SaasShell flow={flow} nav={["Contacts", "Companies", "Deals", "Marketing"]} active={s.view === "crm" ? "Contacts" : "Marketing"} title={s.view === "landing" ? "Landing page preview · 2026 Growth Playbook" : "Contacts"} actions={<Segment options={[{ value: "landing", label: "Landing page" }, { value: "crm", label: "CRM" }]} value={s.view} onChange={(v) => set({ ...s, view: v, selected: null })} />}>
      {s.view === "landing" ? (
        <Card style={{ maxWidth: 560 }} data-testid="landing-form">
          <h2 style={{ fontSize: 22, marginBottom: 6 }}>Download the 2026 Growth Playbook</h2>
          <p className="ee-small ee-muted" style={{ marginBottom: 12 }}>Get 40 pages of tactics from 500 fast-growing teams.</p>
          {ok ? <Alert tone="ok" data-testid="form-thanks">Thanks! Check your inbox for the playbook.</Alert> : (
          <form onSubmit={submit} className="ee-stack">
            <div className="ee-grid ee-grid--2" style={{ gap: 10 }}>
              <Field label="First name*" htmlFor="lf-first"><Input id="lf-first" value={f.first} onChange={(e) => setF({ ...f, first: e.target.value })} /></Field>
              <Field label="Last name*" htmlFor="lf-last"><Input id="lf-last" value={f.last} onChange={(e) => setF({ ...f, last: e.target.value })} /></Field>
            </div>
            <Field label="Work email*" htmlFor="lf-email"><Input id="lf-email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
            <Field label="Company*" htmlFor="lf-company"><Input id="lf-company" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} /></Field>
            <Field label="Company size*" htmlFor="lf-size"><Select id="lf-size" value={f.size} onChange={(e) => setF({ ...f, size: e.target.value })}><option value="">Please select</option>{["1–10", "11–50", "51–200", "201–1000", "1000+"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
            {err && <Alert tone="err">{err}</Alert>}
            <Btn type="submit" data-testid="form-submit">Download now</Btn>
          </form>)}
        </Card>
      ) : sel ? (
        <Card data-testid="contact-record">
          <button className="ee-link ee-small" onClick={() => set({ ...s, selected: null })}>← Contacts</button>
          <h2 style={{ margin: "8px 0" }}>{sel.first} {sel.last}</h2>
          <KV k="Email" v={sel.email} testId="rec-email" /><KV k="Company" v={sel.company} testId="rec-company" /><KV k="Company size" v={sel.size} testId="rec-size" /><KV k="Original source" v={sel.source} testId="rec-source" /><KV k="Create date" v={sel.created} />
        </Card>
      ) : (
        <Card data-testid="contacts-table">
          <Table cols={[{ key: "name", label: "Name", render: (r) => <button className="ee-link" onClick={() => set({ ...s, selected: r.id })} data-testid={`contact-${r.email}`}>{r.first} {r.last}</button> }, { key: "email", label: "Email" }, { key: "company", label: "Company" }, { key: "source", label: "Original source" }, { key: "created", label: "Create date" }]} rows={s.contacts} rowKey={(r) => r.id} />
        </Card>
      )}
    </SaasShell>
  );
}
