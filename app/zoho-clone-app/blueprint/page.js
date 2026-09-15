"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Timeline, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BLUEPRINT, useStore } from "../shared";

export default function Blueprint() {
  const [s, update] = useStore();
  const [leadIdSel, setLeadIdSel] = useState(s.leads[0] ? s.leads[0].id : "");
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const lead = s.leads.find((l) => l.id === leadIdSel) || null;
  const stage = lead ? BLUEPRINT.find((b) => b.id === lead.stage) || BLUEPRINT[0] : null;
  const nextStage = stage && stage.next ? BLUEPRINT.find((b) => b.id === stage.next) : null;
  const stageIndex = stage ? BLUEPRINT.findIndex((b) => b.id === stage.id) : 0;

  function transition() {
    if (!lead || !nextStage) return;
    const missing = stage.requires.filter((r) => !String(inputs[r.id] || "").trim());
    if (missing.length) {
      setError(`This transition needs: ${missing.map((m) => m.label).join(", ")}.`);
      return;
    }
    update((st) => {
      const l = st.leads.find((x) => x.id === leadIdSel);
      if (!l) return st;
      l.blueprintData = { ...l.blueprintData, ...inputs };
      l.stage = nextStage.id;
      l.log.push({
        at: "2026-09-16",
        text: `Blueprint: ${stage.name} → ${nextStage.name} (${stage.requires
          .map((r) => `${r.label}: ${inputs[r.id]}`).join(", ") || "no inputs required"})`,
      });
      return st;
    });
    setError(null);
    setInputs({});
    setNotice({ tone: "ok", msg: `Moved to ${nextStage.name}.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Blueprint" sub="Each transition asks for what it needs before it will run" wide>
        {error && <Banner tone="bad" testId="blueprint-error">{error}</Banner>}
        {notice && <Banner tone={notice.tone} testId="blueprint-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Record">
          <Field label="Lead">
            <Select value={leadIdSel} data-testid="blueprint-lead" aria-label="Lead"
                    onChange={(e) => { setLeadIdSel(e.target.value); setInputs({}); setError(null); }}>
              {s.leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.id} — {`${l.firstName} ${l.lastName}`.trim()} ({(BLUEPRINT.find((b) => b.id === l.stage) || {}).name})
                </option>
              ))}
            </Select>
          </Field>
          {!lead && <Empty>No leads to move.</Empty>}
        </Card>

        {lead && stage && (
          <>
            <Card title="Progress" testId="blueprint-progress">
              <Timeline steps={BLUEPRINT.map((b) => b.name)} current={stageIndex} testId="blueprint-timeline" />
              <Row label="Current stage" value={stage.name} strong testId="current-stage" />
              <Row label="Next stage" value={nextStage ? nextStage.name : "This is the final stage"}
                   testId="next-stage" />
            </Card>

            {nextStage && (
              <Card title={`Move to ${nextStage.name}`} testId="transition-form">
                {stage.requires.length === 0 && <Empty>No inputs required for this transition.</Empty>}
                {stage.requires.map((r) => (
                  <Field key={r.id} label={r.label} hint="Required">
                    <Input type={r.type === "number" ? "text" : r.type} value={inputs[r.id] || ""}
                           data-testid={`input-${r.id}`} aria-label={r.label}
                           onChange={(e) => setInputs((v) => ({ ...v, [r.id]: e.target.value }))} />
                  </Field>
                ))}
                <div className="ck-card-actions">
                  <Btn onClick={transition} data-testid="apply-transition">
                    Move to {nextStage.name}
                  </Btn>
                </div>
              </Card>
            )}

            <Card title="Captured so far" testId="blueprint-data">
              {Object.keys(lead.blueprintData).length === 0 && <Empty>Nothing captured yet.</Empty>}
              {Object.entries(lead.blueprintData).map(([k, v]) => (
                <Row key={k} label={k} value={v} testId={`captured-${k}`} />
              ))}
            </Card>

            <Card title="Record log" testId="record-log">
              {lead.log.map((l, i) => <Row key={i} label={l.at} value={l.text} testId={`log-${i}`} />)}
            </Card>
          </>
        )}
      </Page>
    </Shell>
  );
}
