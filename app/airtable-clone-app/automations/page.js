"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Badge, Row, Check, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, STAGES, useStore, runAutomations } from "../shared";

export default function Automations() {
  const [s, update] = useStore();
  const [recordId, setRecordId] = useState("");
  const [to, setTo] = useState("Shipped");

  const target = s.records.find((r) => r.id === recordId) || null;

  function trigger() {
    if (!target) return;
    const from = target.stage;
    update((st) => {
      const r = st.records.find((x) => x.id === recordId);
      if (!r) return st;
      r.stage = to;
      st.runLog.unshift(...runAutomations(st.automations, r, { field: "stage", from, to }));
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Automations" sub="A record change fires the automation and writes a run entry">
        <Card title="Configured automations" testId="automation-list">
          {s.automations.map((a) => (
            <div key={a.id} className="ck-row" data-testid={`automation-${a.id}`}>
              <span>
                <strong>{a.name}</strong>
                <div className="ck-muted">{a.trigger} → {a.action}</div>
              </span>
              <Check checked={a.enabled} testId={`enabled-${a.id}`} label={a.enabled ? "On" : "Off"}
                     onChange={() => update((st) => {
                       const x = st.automations.find((y) => y.id === a.id);
                       if (x) x.enabled = !x.enabled;
                       return st;
                     })} />
            </div>
          ))}
        </Card>

        <Card title="Change a record to fire it">
          <Field label="Record">
            <Select value={recordId} data-testid="trigger-record" aria-label="Record"
                    onChange={(e) => setRecordId(e.target.value)}>
              <option value="">Choose a record…</option>
              {s.records.map((r) => <option key={r.id} value={r.id}>{r.id} — {r.name} ({r.stage})</option>)}
            </Select>
          </Field>
          <Field label="New stage">
            <Select value={to} data-testid="trigger-stage" aria-label="New stage" onChange={(e) => setTo(e.target.value)}>
              {STAGES.map((st) => <option key={st} value={st}>{st}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={trigger} disabled={!target} data-testid="apply-change">Apply the change</Btn>
          </div>
        </Card>

        <Card title="Run history" testId="run-log">
          <Row label="Runs logged" value={s.runLog.length} testId="run-count" />
          {s.runLog.length === 0 && <Empty>No automation has run yet.</Empty>}
          {s.runLog.map((r) => (
            <div key={r.id} className="ck-row" data-testid={`run-${r.id}`}>
              <span>
                <strong>{r.automation}</strong>
                <div className="ck-muted">{r.detail}</div>
              </span>
              <Badge tone="ok" testId={`run-status-${r.id}`}>{r.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
