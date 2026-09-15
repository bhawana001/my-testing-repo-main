"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Textarea, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import {
  BRAND, ME, CATEGORIES, IMPACT, URGENCY, useStore,
  derivePriority, routeCategory, incidentNumber,
} from "../shared";

export default function Incidents() {
  const [s, update] = useStore();
  const [shortDescription, setShort] = useState("");
  const [category, setCategory] = useState("Software");
  const [impact, setImpact] = useState("2 - Medium");
  const [urgency, setUrgency] = useState("1 - High");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);

  const priority = derivePriority(impact, urgency);
  const group = routeCategory(category);

  function create() {
    if (!shortDescription.trim()) { setError("Short description is mandatory."); return; }
    const incident = {
      number: incidentNumber(s.incidents.length), shortDescription: shortDescription.trim(),
      category, impact, urgency, priority,
      assignmentGroup: group.name, assignedTo: group.members[0],
      state: "New", callerId: ME, description: description.trim(), openedAt: "2026-09-16 09:00",
    };
    update((st) => { st.incidents.unshift(incident); return st; });
    setError(null);
    setCreated(incident);
    setShort(""); setDescription("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Incidents" sub="Priority is derived from impact and urgency" wide>
        {error && <Banner tone="bad" testId="incident-error">{error}</Banner>}

        {created && (
          <Card title="Incident created" tone="ok" testId="incident-created">
            <Row label="Number" value={created.number} testId="incident-number" />
            <Row label="Short description" value={created.shortDescription} testId="incident-short" />
            <Row label="Category" value={created.category} testId="incident-category" />
            <Row label="Impact" value={created.impact} testId="incident-impact" />
            <Row label="Urgency" value={created.urgency} testId="incident-urgency" />
            <Row label="Priority" value={created.priority} strong testId="incident-priority" />
            <Row label="Assignment group" value={created.assignmentGroup} testId="incident-group" />
            <Row label="Assigned to" value={created.assignedTo} testId="incident-assignee" />
            <Badge tone="info" testId="incident-state">{created.state}</Badge>
          </Card>
        )}

        <Card title="New incident">
          <Field label="Caller">
            <Input value={ME} readOnly data-testid="caller" aria-label="Caller" />
          </Field>
          <Field label="Short description">
            <Input value={shortDescription} placeholder="Cannot connect to the warehouse portal"
                   data-testid="short-description" aria-label="Short description"
                   onChange={(e) => setShort(e.target.value)} />
          </Field>
          <Field label="Category">
            <Select value={category} data-testid="category" aria-label="Category"
                    onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Impact">
            <Select value={impact} data-testid="impact" aria-label="Impact"
                    onChange={(e) => setImpact(e.target.value)}>
              {IMPACT.map((i) => <option key={i} value={i}>{i}</option>)}
            </Select>
          </Field>
          <Field label="Urgency">
            <Select value={urgency} data-testid="urgency" aria-label="Urgency"
                    onChange={(e) => setUrgency(e.target.value)}>
              {URGENCY.map((u) => <option key={u} value={u}>{u}</option>)}
            </Select>
          </Field>
          <Row label="Priority (derived)" value={priority} strong testId="derived-priority" />
          <Row label="Routes to" value={group.name} testId="derived-group" />
          <Field label="Description" hint="Optional">
            <Textarea value={description} data-testid="description" aria-label="Description"
                      onChange={(e) => setDescription(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={create} data-testid="submit-incident">Submit</Btn>
          </div>
        </Card>

        <Card title="All incidents" testId="incident-list">
          <Row label="Incident count" value={s.incidents.length} testId="incident-count" />
          {s.incidents.length === 0 && <Empty>No incidents raised.</Empty>}
          <table className="ck-table">
            <thead><tr><th>Number</th><th>Short description</th><th>Priority</th><th>Assignment group</th><th>State</th></tr></thead>
            <tbody>
              {s.incidents.map((i) => (
                <tr key={i.number} data-testid={`row-${i.number}`}>
                  <td data-testid={`row-number-${i.number}`}>{i.number}</td>
                  <td>{i.shortDescription}</td>
                  <td data-testid={`row-priority-${i.number}`}>{i.priority}</td>
                  <td data-testid={`row-group-${i.number}`}>{i.assignmentGroup}</td>
                  <td><Badge tone="info">{i.state}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Page>
    </Shell>
  );
}
