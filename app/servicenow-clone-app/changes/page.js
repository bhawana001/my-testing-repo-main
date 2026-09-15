"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Timeline, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, ME, APPROVERS, useStore, changeNumber } from "../shared";

const STATES = ["New", "Assess", "Awaiting approval", "Approved", "Rejected", "Scheduled"];
const RISKS = ["Low", "Moderate", "High"];

export default function Changes() {
  const [s, update] = useStore();
  const [summary, setSummary] = useState("");
  const [risk, setRisk] = useState("Moderate");
  const [approver, setApprover] = useState(APPROVERS[0]);
  const [window, setWindow] = useState("2026-09-22 23:00 to 01:00");
  const [actingAs, setActingAs] = useState(APPROVERS[0]);
  const [openId, setOpenId] = useState(null);
  const [notice, setNotice] = useState(null);

  const change = s.changes.find((c) => c.id === openId) || s.changes[0] || null;

  function create() {
    if (!summary.trim()) { setNotice({ tone: "bad", msg: "A change needs a short description." }); return; }
    const record = {
      id: changeNumber(s.changes.length), summary: summary.trim(), risk, approver,
      state: "New", requestedBy: ME, approvals: [], window,
      log: [{ at: "2026-09-16", text: `Created in New, approver ${approver}` }],
    };
    update((st) => { st.changes.unshift(record); return st; });
    setOpenId(record.id);
    setSummary("");
    setNotice({ tone: "ok", msg: `${record.id} created. Submit it for approval when you are ready.` });
  }

  function submitForApproval() {
    if (!change) return;
    update((st) => {
      const c = st.changes.find((x) => x.id === change.id);
      c.state = "Awaiting approval";
      c.log.push({ at: "2026-09-16", text: `Submitted for approval to ${c.approver}` });
      return st;
    });
    setNotice({ tone: "info", msg: `Sent to ${change.approver} for approval.` });
  }

  function decide(decision) {
    if (!change) return;
    if (actingAs !== change.approver) {
      setNotice({ tone: "bad", msg: `Only ${change.approver} can approve this change. You are acting as ${actingAs}.` });
      return;
    }
    if (change.state !== "Awaiting approval") {
      setNotice({ tone: "bad", msg: "This change is not waiting for approval." });
      return;
    }
    update((st) => {
      const c = st.changes.find((x) => x.id === change.id);
      c.approvals.push({ by: actingAs, decision, at: "2026-09-16" });
      c.state = decision === "Approved" ? "Approved" : "Rejected";
      c.log.push({ at: "2026-09-16", text: `${decision} by ${actingAs}` });
      return st;
    });
    setNotice({ tone: decision === "Approved" ? "ok" : "warn",
      msg: `${change.id} is now ${decision === "Approved" ? "Approved" : "Rejected"}.` });
  }

  const stateIndex = change ? Math.max(0, STATES.indexOf(change.state)) : 0;

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Change requests" sub="State moves only when the named approver decides" wide>
        {notice && <Banner tone={notice.tone} testId="change-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Raise a change">
          <Field label="Short description">
            <Input value={summary} placeholder="Patch the database cluster" data-testid="change-summary"
                   aria-label="Short description" onChange={(e) => setSummary(e.target.value)} />
          </Field>
          <Field label="Risk">
            <Select value={risk} data-testid="change-risk" aria-label="Risk" onChange={(e) => setRisk(e.target.value)}>
              {RISKS.map((r) => <option key={r} value={r}>{r}</option>)}
            </Select>
          </Field>
          <Field label="Approver">
            <Select value={approver} data-testid="change-approver" aria-label="Approver"
                    onChange={(e) => setApprover(e.target.value)}>
              {APPROVERS.map((a) => <option key={a} value={a}>{a}</option>)}
            </Select>
          </Field>
          <Field label="Change window">
            <Input value={window} data-testid="change-window" aria-label="Change window"
                   onChange={(e) => setWindow(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={create} data-testid="create-change">Create</Btn>
          </div>
        </Card>

        <Card title="Change requests" testId="change-list">
          {s.changes.length === 0 && <Empty>No changes.</Empty>}
          {s.changes.map((c) => (
            <div key={c.id} className="ck-row" data-testid={`change-${c.id}`}>
              <span>
                <button className="ck-btn ck-btn--ghost ck-btn--sm" data-testid={`open-${c.id}`}
                        onClick={() => setOpenId(c.id)}><strong>{c.id}</strong></button>
                <div className="ck-muted">{c.summary} · risk {c.risk} · approver {c.approver}</div>
              </span>
              <Badge tone={c.state === "Approved" ? "ok" : c.state === "Rejected" ? "bad" : "warn"}
                     testId={`change-state-${c.id}`}>{c.state}</Badge>
            </div>
          ))}
        </Card>

        {change && (
          <>
            <Card title={`${change.id} — ${change.summary}`} testId="change-detail">
              <Timeline steps={["New", "Awaiting approval", "Approved"]}
                        current={change.state === "Approved" ? 2 : change.state === "Awaiting approval" ? 1 : 0}
                        testId="change-timeline" />
              <Row label="State" value={change.state} strong testId="detail-state" />
              <Row label="Requested by" value={change.requestedBy} testId="detail-requested-by" />
              <Row label="Approver" value={change.approver} testId="detail-approver" />
              <Row label="Risk" value={change.risk} testId="detail-risk" />
              <Row label="Window" value={change.window} testId="detail-window" />
              <div className="ck-card-actions">
                <Btn onClick={submitForApproval} data-testid="submit-approval"
                     disabled={change.state === "Awaiting approval" || change.state === "Approved"}>
                  Submit for approval
                </Btn>
              </div>
            </Card>

            <Card title="Approval" testId="approval-panel">
              <Field label="Acting as" hint="Only the named approver can decide">
                <Select value={actingAs} data-testid="acting-as" aria-label="Acting as"
                        onChange={(e) => setActingAs(e.target.value)}>
                  {APPROVERS.map((a) => <option key={a} value={a}>{a}</option>)}
                </Select>
              </Field>
              <Row label="Approvals recorded" value={change.approvals.length} testId="approval-count" />
              {change.approvals.map((a, i) => (
                <Row key={i} label={a.by} value={`${a.decision} on ${a.at}`} testId={`approval-${i}`} />
              ))}
              <div className="ck-card-actions">
                <Btn onClick={() => decide("Approved")} data-testid="approve">Approve</Btn>
                <Btn variant="danger" onClick={() => decide("Rejected")} data-testid="reject">Reject</Btn>
              </div>
            </Card>

            <Card title="Activity" testId="change-log">
              {change.log.map((l, i) => <Row key={i} label={l.at} value={l.text} testId={`log-${i}`} />)}
            </Card>
          </>
        )}
      </Page>
    </Shell>
  );
}
