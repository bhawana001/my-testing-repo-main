"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Banner, Empty, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, WORKFLOWS, ME, useStore, nextId } from "../shared";

export default function Workflows() {
  const [s, update] = useStore();
  const [openId, setOpenId] = useState(null);
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  const wf = WORKFLOWS.find((w) => w.id === openId) || null;

  function submit() {
    const missing = wf.fields.filter((f) => !String(values[f.id] || "").trim());
    if (missing.length) {
      setError(`Fill in: ${missing.map((m) => m.label).join(", ")}`);
      return;
    }
    const summary = wf.fields.map((f) => `${f.label}: ${values[f.id]}`).join(" · ");
    const text = `${ME.name} submitted “${wf.name}” — ${summary}`;
    update((st) => {
      st.workflowRuns.unshift({ id: nextId(st.counter++), workflow: wf.name, channel: wf.channel, summary, at: "now" });
      st.messages[wf.channel].push({ id: nextId(st.counter++), user: "Workflow Bot", at: "now", text, replies: [] });
      return st;
    });
    setError(null);
    setDone({ channel: wf.channel, text });
    setOpenId(null);
    setValues({});
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Workflows" sub="Forms that post their result back into a channel">
        {done && (
          <Banner tone="ok" title="Confirmation posted" testId="workflow-confirmation" onClose={() => setDone(null)}>
            Posted to <Link href={`${BASE}/channel/${done.channel}`}>#{done.channel}</Link>: {done.text}
          </Banner>
        )}

        <Card title="Available workflows">
          {WORKFLOWS.map((w) => (
            <div key={w.id} className="ck-row">
              <span><strong>{w.name}</strong> <span className="ck-muted">posts to #{w.channel}</span></span>
              <Btn size="sm" data-testid={`trigger-${w.id}`}
                   onClick={() => { setOpenId(w.id); setValues({}); setError(null); setDone(null); }}>
                Start
              </Btn>
            </div>
          ))}
        </Card>

        {wf && (
          <Card title={wf.name} testId="workflow-form">
            {error && <Banner tone="bad" testId="workflow-error">{error}</Banner>}
            {wf.fields.map((f) => (
              <Field key={f.id} label={f.label}>
                {f.type === "select" ? (
                  <Select value={values[f.id] || ""} data-testid={`field-${f.id}`} aria-label={f.label}
                          onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}>
                    <option value="">Choose…</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </Select>
                ) : (
                  <Input value={values[f.id] || ""} placeholder={f.placeholder} data-testid={`field-${f.id}`}
                         aria-label={f.label}
                         onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))} />
                )}
              </Field>
            ))}
            <div className="ck-card-actions">
              <Btn onClick={submit} data-testid="workflow-submit">Submit</Btn>
              <Btn variant="ghost" onClick={() => setOpenId(null)}>Cancel</Btn>
            </div>
          </Card>
        )}

        <Card title="Submissions" testId="workflow-runs">
          {s.workflowRuns.length === 0 && <Empty>Nothing submitted yet.</Empty>}
          {s.workflowRuns.map((r) => (
            <Row key={r.id} label={`${r.workflow} → #${r.channel}`} value={r.summary} testId={`run-${r.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
