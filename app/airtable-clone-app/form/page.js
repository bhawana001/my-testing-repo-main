"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Textarea, Field, Banner, Row } from "../../clones/kit/ui";
import { BRAND, BASE, STAGES, OWNERS, useStore, nextRecordId } from "../shared";

/** The shared form view: no base chrome, because a respondent never sees it. */
export default function FormView() {
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [owner, setOwner] = useState(OWNERS[0]);
  const [effort, setEffort] = useState("5");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  function submit() {
    if (!name.trim()) { setError("Name is required."); return; }
    const id = nextRecordId(s.counter);
    const record = { id, name: name.trim(), owner, stage: STAGES[0], effort: Number(effort), notes: notes.trim() };
    update((st) => {
      st.records.push(record);
      st.counter += 1;
      st.formSubmissions += 1;
      return st;
    });
    setError(null);
    setDone(record);
    setName(""); setNotes("");
  }

  return (
    <Shell brand={BRAND}>
      <Page title="Submit a product idea" sub="Airtabel form view — responses land in the base">
        {error && <Banner tone="bad" testId="form-error">{error}</Banner>}

        {!done && (
          <Card title="Form" testId="form-view">
            <Field label="Name">
              <Input value={name} data-testid="form-name" aria-label="Name" onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Owner">
              <Select value={owner} data-testid="form-owner" aria-label="Owner" onChange={(e) => setOwner(e.target.value)}>
                {OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </Field>
            <Field label="Effort">
              <Select value={effort} data-testid="form-effort" aria-label="Effort" onChange={(e) => setEffort(e.target.value)}>
                {["1", "2", "3", "5", "8", "13"].map((n) => <option key={n} value={n}>{n}</option>)}
              </Select>
            </Field>
            <Field label="Notes" hint="Optional">
              <Textarea value={notes} data-testid="form-notes" aria-label="Notes" onChange={(e) => setNotes(e.target.value)} />
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={submit} data-testid="form-submit">Submit</Btn>
            </div>
          </Card>
        )}

        {done && (
          <Card title="Thanks — your response was recorded" tone="ok" testId="form-confirmation">
            <Row label="Record id" value={done.id} testId="created-record-id" />
            <Row label="Name" value={done.name} testId="created-record-name" />
            <Row label="Owner" value={done.owner} />
            <Row label="Stage" value={done.stage} />
            <Row label="Records in base" value={s.records.length} testId="base-record-count" />
            <div className="ck-card-actions">
              <Link href={`${BASE}/grid`} className="ck-btn ck-btn--primary" data-testid="view-in-grid">
                See it in the grid
              </Link>
              <Btn variant="ghost" onClick={() => setDone(null)} data-testid="submit-another">Submit another</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
