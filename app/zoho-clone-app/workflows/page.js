"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, FIELDS, WORKFLOW_RULES, useStore, money, leadId } from "../shared";

export default function Workflows() {
  const [s, update] = useStore();
  const [firstName, setFirstName] = useState("Dana");
  const [lastName, setLastName] = useState("Ellery");
  const [company, setCompany] = useState("Summit Royals");
  const [source, setSource] = useState("Web");
  const [amount, setAmount] = useState("62000");
  const [created, setCreated] = useState(null);

  function create() {
    const draft = {
      id: leadId(s.counter), firstName, lastName, company, email: "", phone: "",
      source, rating: "Cold", amount: Number(amount) || 0, owner: "Unassigned",
      stage: "qualification", blueprintData: {},
      log: [{ at: "2026-09-16", text: "Lead created manually" }],
    };
    // Rules are evaluated against the draft before it is saved, which is what
    // makes the field update visible on the record the moment it appears.
    const fired = WORKFLOW_RULES.filter((r) => r.test(draft));
    for (const r of fired) {
      draft[r.field] = r.value;
      draft.log.push({ at: "2026-09-16", text: `Workflow “${r.name}” set ${r.field} to ${r.value}` });
    }
    update((st) => {
      st.leads.push(draft);
      st.counter += 1;
      for (const r of fired) {
        st.ruleRuns.unshift({ id: `run_${st.ruleRuns.length + 1}`, rule: r.name, lead: draft.id,
          detail: `${r.field} set to ${r.value}`, at: "2026-09-16" });
      }
      return st;
    });
    setCreated({ lead: draft, fired });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Workflow rules" sub="Create a record that matches a rule and watch the field update" wide>
        {created && (
          <Banner tone={created.fired.length ? "ok" : "info"} title="Record saved" testId="workflow-result">
            {created.fired.length
              ? `${created.fired.length} rule${created.fired.length > 1 ? "s" : ""} fired: ${
                  created.fired.map((r) => r.name).join(", ")}.`
              : "No rule criteria matched this record."}
          </Banner>
        )}

        <Card title="Active rules" testId="rule-list">
          {WORKFLOW_RULES.map((r) => (
            <div key={r.id} className="ck-row" data-testid={`rule-${r.id}`}>
              <span>
                <strong>{r.name}</strong>
                <div className="ck-muted">
                  When {r.when} → set {(FIELDS.find((f) => f.id === r.field) || { label: r.field }).label} to “{r.value}”
                </div>
              </span>
              <Badge tone="ok">Active</Badge>
            </div>
          ))}
        </Card>

        <Card title="Create a lead">
          <Field label="First name">
            <Input value={firstName} data-testid="new-first-name" aria-label="First name"
                   onChange={(e) => setFirstName(e.target.value)} />
          </Field>
          <Field label="Last name">
            <Input value={lastName} data-testid="new-last-name" aria-label="Last name"
                   onChange={(e) => setLastName(e.target.value)} />
          </Field>
          <Field label="Company">
            <Input value={company} data-testid="new-company" aria-label="Company"
                   onChange={(e) => setCompany(e.target.value)} />
          </Field>
          <Field label="Lead source" hint="Web routes the lead to Priya Nair">
            <Select value={source} data-testid="new-source" aria-label="Lead source"
                    onChange={(e) => setSource(e.target.value)}>
              {["Web", "Referral", "Trade show", "Cold call"].map((x) => <option key={x} value={x}>{x}</option>)}
            </Select>
          </Field>
          <Field label="Deal amount" hint="50,000 or more is flagged Hot">
            <Input value={amount} data-testid="new-amount" aria-label="Deal amount"
                   onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={create} data-testid="save-lead">Save the lead</Btn>
          </div>
        </Card>

        {created && (
          <Card title="The saved record" testId="saved-record">
            <Row label="Lead id" value={created.lead.id} testId="saved-id" />
            <Row label="Name" value={`${created.lead.firstName} ${created.lead.lastName}`} testId="saved-name" />
            <Row label="Deal Amount" value={money(created.lead.amount)} testId="saved-amount" />
            <Row label="Lead Source" value={created.lead.source} testId="saved-source" />
            <Row label="Rating" value={created.lead.rating} strong testId="saved-rating" />
            <Row label="Owner" value={created.lead.owner} strong testId="saved-owner" />
            <div data-testid="saved-log">
              {created.lead.log.map((l, i) => (
                <Row key={i} label={l.at} value={l.text} testId={`saved-log-${i}`} />
              ))}
            </div>
          </Card>
        )}

        <Card title="Rule run history" testId="rule-runs">
          <Row label="Runs" value={s.ruleRuns.length} testId="run-count" />
          {s.ruleRuns.length === 0 && <Empty>No rule has fired yet.</Empty>}
          {s.ruleRuns.map((r) => (
            <Row key={r.id} label={`${r.rule} on ${r.lead}`} value={r.detail} testId={`run-${r.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
