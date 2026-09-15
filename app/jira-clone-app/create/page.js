"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Textarea, Field, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, PROJECT, TYPES, PRIORITIES, COMPONENTS, PEOPLE, useStore, nextKey } from "../shared";

export default function Create() {
  const [s, update] = useStore();
  const [type, setType] = useState("Bug");
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("High");
  const [component, setComponent] = useState(COMPONENTS[0]);
  const [assignee, setAssignee] = useState(PEOPLE[0]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);

  function create() {
    if (!summary.trim()) { setError("Summary is required."); return; }
    // The key is derived from the counter we already hold: assigning it inside
    // the updater would leave the confirmation below with nothing to show.
    const key = nextKey(s.counter);
    const issue = {
      key, type, summary: summary.trim(), priority, component, assignee,
      description: description.trim(), status: "To Do", resolution: null,
      history: [{ at: "now", text: `Created as ${type} with priority ${priority}` }],
    };
    update((st) => { st.issues.push(issue); st.counter += 1; return st; });
    setError(null);
    setCreated(issue);
    setSummary(""); setDescription("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Create issue" sub={`Project ${PROJECT.key} — ${PROJECT.name}`}>
        {error && <Banner tone="bad" testId="create-error">{error}</Banner>}
        {created && (
          <Banner tone="ok" title="Issue created" testId="create-success" onClose={() => setCreated(null)}>
            <span data-testid="created-key">{created.key}</span> — {created.summary}{" "}
            <Link href={`${BASE}/browse/${created.key}`} data-testid="open-created">Open it</Link>
          </Banner>
        )}

        <Card title="Details">
          <Field label="Issue type">
            <Select value={type} data-testid="issue-type" aria-label="Issue type" onChange={(e) => setType(e.target.value)}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="Summary">
            <Input value={summary} placeholder="Coupon field rejects valid codes" data-testid="issue-summary"
                   aria-label="Summary" onChange={(e) => setSummary(e.target.value)} />
          </Field>
          <Field label="Priority">
            <Select value={priority} data-testid="issue-priority" aria-label="Priority"
                    onChange={(e) => setPriority(e.target.value)}>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          <Field label="Component">
            <Select value={component} data-testid="issue-component" aria-label="Component"
                    onChange={(e) => setComponent(e.target.value)}>
              {COMPONENTS.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Assignee">
            <Select value={assignee} data-testid="issue-assignee" aria-label="Assignee"
                    onChange={(e) => setAssignee(e.target.value)}>
              {PEOPLE.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          <Field label="Description" hint="Optional">
            <Textarea value={description} data-testid="issue-description" aria-label="Description"
                      onChange={(e) => setDescription(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={create} data-testid="create-issue">Create</Btn>
          </div>
        </Card>

        {created && (
          <Card title="Created issue" testId="created-summary">
            <Row label="Key" value={created.key} testId="detail-key" />
            <Row label="Type" value={created.type} testId="detail-type" />
            <Row label="Priority" value={created.priority} testId="detail-priority" />
            <Row label="Component" value={created.component} testId="detail-component" />
            <Row label="Status" value={created.status} testId="detail-status" />
          </Card>
        )}
      </Page>
    </Shell>
  );
}
