"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Textarea, Field, Check, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import {
  BRAND, AGENT, STATUSES, PRIORITIES, CANNED, useStore, resolvePlaceholders, mergeThreads,
} from "../shared";

export default function Tickets() {
  const [s, update] = useStore();
  const [openId, setOpenId] = useState(null);
  const [reply, setReply] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [cannedId, setCannedId] = useState(CANNED[0].id);
  const [mergeInto, setMergeInto] = useState("");
  const [notice, setNotice] = useState(null);

  const ticket = s.tickets.find((t) => t.id === openId) || s.tickets[0] || null;

  function insertCanned() {
    if (!ticket) return;
    const template = CANNED.find((c) => c.id === cannedId);
    // Placeholders are resolved as the text is inserted, so the agent sees the
    // real names and ids in the editor rather than raw braces.
    setReply(resolvePlaceholders(template.body, ticket));
    setNotice({ tone: "ok", msg: `“${template.name}” inserted with placeholders resolved.` });
  }

  function send() {
    const body = reply.trim();
    if (!body || !ticket) return;
    update((st) => {
      st.tickets.find((t) => t.id === ticket.id).thread.push({
        from: AGENT.name, type: isPrivate ? "private" : "public", text: body, at: "2026-09-16 10:00",
      });
      return st;
    });
    setReply("");
    setNotice({ tone: "ok", msg: isPrivate ? "Private note added." : "Reply sent to the customer." });
  }

  function merge() {
    if (!ticket || !mergeInto) { setNotice({ tone: "bad", msg: "Pick the ticket to merge into." }); return; }
    const target = s.tickets.find((t) => t.id === mergeInto);
    if (!target || target.id === ticket.id) { setNotice({ tone: "bad", msg: "Pick a different ticket." }); return; }
    if (target.email !== ticket.email) {
      setNotice({ tone: "bad", msg: "Freshdesc only merges tickets from the same requester." });
      return;
    }
    const combined = mergeThreads(target, ticket);
    update((st) => {
      const tgt = st.tickets.find((t) => t.id === mergeInto);
      tgt.thread = combined;
      tgt.mergedFrom.push(ticket.id);
      tgt.thread.push({
        from: AGENT.name, type: "private",
        text: `Merged ${ticket.id} — “${ticket.subject}” into this ticket.`, at: "2026-09-16 10:05",
      });
      st.tickets = st.tickets.filter((t) => t.id !== ticket.id);
      return st;
    });
    setOpenId(mergeInto);
    setNotice({ tone: "ok", msg: `${ticket.id} merged into ${mergeInto}. Both threads are on the merged ticket.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Tickets" sub={`${s.tickets.length} in the queue`} wide>
        {notice && <Banner tone={notice.tone} testId="ticket-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Queue" testId="ticket-list">
          <Row label="Ticket count" value={s.tickets.length} testId="ticket-count" />
          {s.tickets.length === 0 && <Empty>No tickets.</Empty>}
          <table className="ck-table">
            <thead><tr><th>Id</th><th>Subject</th><th>Requester</th><th>Source</th><th>Status</th><th>Priority</th></tr></thead>
            <tbody>
              {s.tickets.map((t) => (
                <tr key={t.id} data-testid={`ticket-${t.id.replace("#", "")}`}>
                  <td>
                    <button className="ck-btn ck-btn--ghost ck-btn--sm"
                            data-testid={`open-${t.id.replace("#", "")}`} onClick={() => setOpenId(t.id)}>
                      {t.id}
                    </button>
                  </td>
                  <td data-testid={`subject-${t.id.replace("#", "")}`}>{t.subject}</td>
                  <td data-testid={`requester-${t.id.replace("#", "")}`}>{t.requester}</td>
                  <td>{t.source}</td>
                  <td><Badge tone={t.status === "Open" ? "warn" : "ok"}>{t.status}</Badge></td>
                  <td>{t.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {ticket && (
          <>
            <Card title={`${ticket.id} — ${ticket.subject}`} testId="ticket-detail">
              <Row label="Requester" value={`${ticket.requester} · ${ticket.email}`} testId="detail-requester" />
              <Row label="Source" value={ticket.source} testId="detail-source" />
              <Row label="Messages in thread" value={ticket.thread.length} testId="thread-count" />
              {ticket.mergedFrom.length > 0 && (
                <Row label="Merged from" value={ticket.mergedFrom.join(", ")} testId="merged-from" />
              )}
              <div className="ck-card-actions">
                <Select value={ticket.status} data-testid="status-select" aria-label="Status"
                        onChange={(e) => update((st) => {
                          st.tickets.find((t) => t.id === ticket.id).status = e.target.value;
                          return st;
                        })}>
                  {STATUSES.map((x) => <option key={x} value={x}>{x}</option>)}
                </Select>
                <Select value={ticket.priority} data-testid="priority-select" aria-label="Priority"
                        onChange={(e) => update((st) => {
                          st.tickets.find((t) => t.id === ticket.id).priority = e.target.value;
                          return st;
                        })}>
                  {PRIORITIES.map((x) => <option key={x} value={x}>{x}</option>)}
                </Select>
              </div>

              <h3>Thread</h3>
              <div data-testid="thread">
                {ticket.thread.map((m, i) => (
                  <div key={i} className="ck-row" data-testid={`thread-${i}`}>
                    <span>
                      <strong data-testid={`thread-from-${i}`}>{m.from}</strong>{" "}
                      <span className="ck-muted">{m.at}</span>
                      {m.type === "private" && <Badge tone="warn">private note</Badge>}
                      <div data-testid={`thread-text-${i}`}>{m.text}</div>
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Reply">
              <Field label="Canned response">
                <Select value={cannedId} data-testid="canned-select" aria-label="Canned response"
                        onChange={(e) => setCannedId(e.target.value)}>
                  {CANNED.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </Field>
              <div className="ck-card-actions">
                <Btn variant="secondary" onClick={insertCanned} data-testid="insert-canned">
                  Insert canned response
                </Btn>
              </div>
              <Field label="Message">
                <Textarea value={reply} rows={6} data-testid="reply-body" aria-label="Reply"
                          onChange={(e) => setReply(e.target.value)} />
              </Field>
              <Check checked={isPrivate} onChange={() => setIsPrivate((v) => !v)}
                     label="Private note" detail="Not shown to the customer in the portal"
                     testId="private-toggle" />
              <div className="ck-card-actions">
                <Btn onClick={send} data-testid="send-reply">Send</Btn>
              </div>
            </Card>

            <Card title="Merge">
              <Field label="Merge this ticket into" hint="Only tickets from the same requester can be merged">
                <Select value={mergeInto} data-testid="merge-target" aria-label="Merge into"
                        onChange={(e) => setMergeInto(e.target.value)}>
                  <option value="">Choose a ticket…</option>
                  {s.tickets.filter((t) => t.id !== ticket.id).map((t) => (
                    <option key={t.id} value={t.id}>{t.id} — {t.subject} ({t.requester})</option>
                  ))}
                </Select>
              </Field>
              <div className="ck-card-actions">
                <Btn variant="danger" onClick={merge} data-testid="merge-tickets">
                  Merge {ticket.id}
                </Btn>
              </div>
            </Card>
          </>
        )}
      </Page>
    </Shell>
  );
}
