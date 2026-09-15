"use client";
// Lead creation through the Lightning-style form (28.1). Required fields are
// enforced and the new lead lands in the list view with its owner.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Select, Badge, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, USERS, LEAD_SOURCES, LEAD_STATUSES, useStore, nextId } from "../shared";

export default function LeadsPage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", company: "", email: "", source: LEAD_SOURCES[0],
                               status: LEAD_STATUSES[0], owner: USERS[0] });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(null);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  function save() {
    const e = {};
    if (!f.name.trim()) e.name = "Complete this field.";
    if (!f.company.trim()) e.company = "Complete this field.";
    if (f.email && !f.email.includes("@")) e.email = "Enter a valid email address.";
    setErrors(e);
    if (Object.keys(e).length) return;
    const id = nextId("00Q", s.counter + 1);
    const lead = { id, ...f, name: f.name.trim(), company: f.company.trim(), createdAt: "2026-09-15" };
    update((st) => { st.leads.unshift(lead); st.counter += 1; return st; });
    setSaved(lead);
    setOpen(false);
    setF({ name: "", company: "", email: "", source: LEAD_SOURCES[0], status: LEAD_STATUSES[0], owner: USERS[0] });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/opportunities`, label: "Opportunities" }]} />
      <Page title="Leads" sub="All Open Leads" wide
            actions={<Btn onClick={() => setOpen(true)} data-testid="new-lead">New Lead</Btn>}>
        {saved && (
          <Banner tone="ok" title="Lead created" testId="lead-created">
            Lead <strong data-testid="new-lead-id">{saved.id}</strong> — {saved.name} ({saved.company}) owned by {saved.owner}.
          </Banner>
        )}

        {open && (
          <Card title="New Lead" testId="lead-form">
            <div className="ck-grid ck-grid--2">
              <Field label="Last Name *" error={errors.name}>
                <Input value={f.name} onChange={(e) => set("name", e.target.value)} aria-label="Last Name" data-testid="lead-name" />
              </Field>
              <Field label="Company *" error={errors.company}>
                <Input value={f.company} onChange={(e) => set("company", e.target.value)} aria-label="Company" data-testid="lead-company" />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input value={f.email} onChange={(e) => set("email", e.target.value)} aria-label="Email" data-testid="lead-email" />
              </Field>
              <Field label="Lead Source">
                <Select value={f.source} onChange={(e) => set("source", e.target.value)} aria-label="Lead Source" data-testid="lead-source">
                  {LEAD_SOURCES.map((x) => <option key={x}>{x}</option>)}
                </Select>
              </Field>
              <Field label="Lead Status">
                <Select value={f.status} onChange={(e) => set("status", e.target.value)} aria-label="Lead Status" data-testid="lead-status">
                  {LEAD_STATUSES.map((x) => <option key={x}>{x}</option>)}
                </Select>
              </Field>
              <Field label="Lead Owner">
                <Select value={f.owner} onChange={(e) => set("owner", e.target.value)} aria-label="Lead Owner" data-testid="lead-owner">
                  {USERS.map((x) => <option key={x}>{x}</option>)}
                </Select>
              </Field>
            </div>
            <div className="ck-card-actions">
              <Btn variant="secondary" onClick={() => setOpen(false)}>Cancel</Btn>
              <Btn onClick={save} data-testid="save-lead">Save</Btn>
            </div>
          </Card>
        )}

        <Card title={`All Open Leads (${s.leads.length})`} testId="lead-list">
          {s.leads.length === 0 ? <Empty>No leads.</Empty> : (
            <table className="ck-table">
              <thead><tr><th>Name</th><th>Company</th><th>Email</th><th>Source</th><th>Status</th><th>Owner</th></tr></thead>
              <tbody>
                {s.leads.map((l) => (
                  <tr key={l.id} data-testid={`lead-${l.id}`}>
                    <td className="ck-strong">{l.name}</td>
                    <td>{l.company}</td>
                    <td>{l.email || "—"}</td>
                    <td>{l.source}</td>
                    <td><Badge tone="info">{l.status}</Badge></td>
                    <td data-testid={`lead-owner-${l.id}`}>{l.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
