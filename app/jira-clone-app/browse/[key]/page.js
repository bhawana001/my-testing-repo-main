"use client";
import { use, useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Badge, Banner, Row, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, STATUSES, RESOLUTIONS, useStore, transitionBlockers } from "../../shared";

export default function Browse({ params }) {
  const { key } = use(params);
  const [s, update] = useStore();
  const [target, setTarget] = useState("Done");
  const [resolution, setResolution] = useState("");
  const [notice, setNotice] = useState(null);

  const issue = s.issues.find((i) => i.key === key) || null;

  function transition() {
    if (!issue) return;
    const blockers = transitionBlockers(issue, target, { resolution: resolution || issue.resolution });
    if (blockers.length) {
      setNotice({ tone: "bad", msg: blockers.join(" ") });
      return;
    }
    const from = issue.status;
    update((st) => {
      const i = st.issues.find((x) => x.key === key);
      if (!i) return st;
      i.status = target;
      if (resolution) i.resolution = resolution;
      i.history.push({ at: "now", text: `Status: ${from} → ${target}${i.resolution ? ` (${i.resolution})` : ""}` });
      return st;
    });
    setNotice({ tone: "ok", msg: `${key} transitioned ${from} → ${target}.` });
  }

  if (!issue) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="Issue not found"><Empty>No issue with that key.</Empty></Page>
      </Shell>
    );
  }

  const blockers = transitionBlockers(issue, target, { resolution: resolution || issue.resolution });

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={`${issue.key} — ${issue.summary}`} sub={`${issue.type} in ${issue.component}`} wide>
        {notice && <Banner tone={notice.tone} testId="transition-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Details" testId="issue-details">
          <Row label="Key" value={issue.key} testId="detail-key" />
          <Row label="Type" value={issue.type} testId="detail-type" />
          <Row label="Priority" value={issue.priority} testId="detail-priority" />
          <Row label="Component" value={issue.component} testId="detail-component" />
          <Row label="Assignee" value={issue.assignee || "Unassigned"} testId="detail-assignee" />
          <Row label="Status" value={issue.status} testId="detail-status" />
          <Row label="Resolution" value={issue.resolution || "Unresolved"} testId="detail-resolution" />
        </Card>

        <Card title="Workflow" testId="workflow">
          <Field label="Transition to">
            <Select value={target} data-testid="transition-target" aria-label="Transition to"
                    onChange={(e) => { setTarget(e.target.value); setNotice(null); }}>
              {STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
            </Select>
          </Field>
          {target === "Done" && (
            <Field label="Resolution" hint="Required before an issue can be closed">
              <Select value={resolution || issue.resolution || ""} data-testid="resolution"
                      aria-label="Resolution" onChange={(e) => { setResolution(e.target.value); setNotice(null); }}>
                <option value="">None</option>
                {RESOLUTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </Select>
            </Field>
          )}
          {blockers.length > 0 && (
            <Banner tone="warn" title="This transition is blocked" testId="validation-warning">
              {blockers.join(" ")}
            </Banner>
          )}
          <div className="ck-card-actions">
            <Btn onClick={transition} data-testid="apply-transition">Apply transition</Btn>
          </div>
        </Card>

        <Card title="History" testId="issue-history">
          {issue.history.map((h, i) => (
            <Row key={i} label={h.at} value={h.text} testId={`history-${i}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
