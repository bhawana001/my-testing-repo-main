"use client";
// Agent workspace: replies and status changes (30.2), macros (30.3) and the SLA
// timer on priority tickets (30.5). A macro fills the reply box and stages its
// field changes; applying it is one action the customer then sees.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Select, Field, Textarea, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, STATUSES, PRIORITIES, TYPES, MACROS, useStore, slaFor } from "../shared";

export default function AgentPage() {
  const [s, update] = useStore();
  const [openId, setOpenId] = useState(null);
  const [reply, setReply] = useState("");
  const [macroId, setMacroId] = useState("");
  const [notice, setNotice] = useState(null);

  const ticket = s.tickets.find((t) => t.id === openId) || null;

  function applyMacro(id) {
    const m = MACROS.find((x) => x.id === id);
    if (!m || !ticket) return;
    setReply(m.reply);
    update((st) => {
      const t = st.tickets.find((x) => x.id === ticket.id);
      t.status = m.sets.status;
      t.priority = m.sets.priority;
      t.type = m.sets.type;
      t.tags = [...new Set([...(t.tags || []), ...m.sets.tags])];
      return st;
    });
    setNotice(`Macro "${m.title}" applied — status ${m.sets.status}, priority ${m.sets.priority}.`);
  }

  function send(newStatus) {
    if (!reply.trim()) { setNotice("Write a reply first."); return; }
    update((st) => {
      const t = st.tickets.find((x) => x.id === ticket.id);
      t.comments.push({ author: "Priya Nair (agent)", body: reply.trim(), at: "2026-09-15 10:45", public: true });
      t.status = newStatus;
      return st;
    });
    setNotice(`Reply sent and status set to ${newStatus}.`);
    setReply("");
  }

  if (ticket) {
    const sla = slaFor(ticket);
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/widget`, label: "Widget" }]} />
        <Page title={`#${ticket.id} · ${ticket.subject}`} wide>
          <Btn variant="ghost" onClick={() => { setOpenId(null); setReply(""); setNotice(null); }} data-testid="back-to-list">← All tickets</Btn>
          {notice && <Banner tone="ok" testId="agent-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

          <div className="ck-split">
            <div>
              <Card title="Conversation" testId="conversation">
                <div className="ck-tile">
                  <div className="ck-strong">{ticket.requester}</div>
                  <div>{ticket.description}</div>
                  <div className="ck-muted">{ticket.createdAt}</div>
                </div>
                {ticket.comments.map((c, i) => (
                  <div key={i} className="ck-tile" style={{ marginTop: 8 }} data-testid={`comment-${i}`}>
                    <div className="ck-strong">{c.author}</div>
                    <div data-testid={`comment-body-${i}`}>{c.body}</div>
                    <div className="ck-muted">{c.at} · {c.public ? "Public reply" : "Internal note"}</div>
                  </div>
                ))}
              </Card>

              <Card title="Reply">
                <Field label="Apply a macro">
                  <Select value={macroId} onChange={(e) => { setMacroId(e.target.value); applyMacro(e.target.value); }}
                          aria-label="Apply a macro" data-testid="macro-select">
                    <option value="">Choose a macro</option>
                    {MACROS.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}
                  </Select>
                </Field>
                <Field label="Public reply">
                  <Textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={5}
                            aria-label="Public reply" data-testid="reply-box" />
                </Field>
                <div className="ck-card-actions">
                  <Btn onClick={() => send("Pending")} data-testid="submit-pending">Submit as Pending</Btn>
                  <Btn variant="secondary" onClick={() => send("Solved")} data-testid="submit-solved">Submit as Solved</Btn>
                </div>
              </Card>
            </div>

            <div>
              <Card title="Ticket fields" testId="ticket-fields">
                <Field label="Status">
                  <Select value={ticket.status} aria-label="Status" data-testid="field-status"
                          onChange={(e) => update((st) => { st.tickets.find((x) => x.id === ticket.id).status = e.target.value; return st; })}>
                    {STATUSES.map((x) => <option key={x}>{x}</option>)}
                  </Select>
                </Field>
                <Field label="Priority">
                  <Select value={ticket.priority} aria-label="Priority" data-testid="field-priority"
                          onChange={(e) => update((st) => { st.tickets.find((x) => x.id === ticket.id).priority = e.target.value; return st; })}>
                    {PRIORITIES.map((x) => <option key={x}>{x}</option>)}
                  </Select>
                </Field>
                <Field label="Type">
                  <Select value={ticket.type} aria-label="Type" data-testid="field-type"
                          onChange={(e) => update((st) => { st.tickets.find((x) => x.id === ticket.id).type = e.target.value; return st; })}>
                    {TYPES.map((x) => <option key={x}>{x}</option>)}
                  </Select>
                </Field>
                <Row label="Tags" value={(ticket.tags || []).join(", ") || "—"} testId="field-tags" />
              </Card>

              <Card title="First reply SLA" tone={sla.breached ? "warn" : undefined} testId="sla-card">
                <Row label="Priority" value={ticket.priority} testId="sla-priority" />
                <Row label="Target" value={`${sla.target} minutes`} testId="sla-target" />
                <Row label="Open for" value={`${ticket.minutesOpen} minutes`} testId="sla-elapsed" />
                <Badge tone={sla.breached ? "bad" : "ok"} testId="sla-state">{sla.label}</Badge>
              </Card>
            </div>
          </div>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/widget`, label: "Widget" }]} />
      <Page title="Agent workspace" sub="Unsolved tickets" wide>
        <Card testId="ticket-list">
          {s.tickets.length === 0 ? <Empty>No tickets.</Empty> : (
            <table className="ck-table">
              <thead><tr><th>ID</th><th>Subject</th><th>Requester</th><th>Priority</th><th>Status</th><th>SLA</th><th /></tr></thead>
              <tbody>
                {s.tickets.map((t) => {
                  const sla = slaFor(t);
                  return (
                    <tr key={t.id} data-testid={`ticket-${t.id}`}>
                      <td className="ck-strong">#{t.id}</td>
                      <td>{t.subject}</td>
                      <td>{t.requester}</td>
                      <td><Badge tone={t.priority === "Urgent" ? "bad" : "neutral"} testId={`priority-${t.id}`}>{t.priority}</Badge></td>
                      <td><Badge tone="info" testId={`status-${t.id}`}>{t.status}</Badge></td>
                      <td><Badge tone={sla.breached ? "bad" : "ok"} testId={`sla-${t.id}`}>{sla.label}</Badge></td>
                      <td><Btn size="sm" variant="secondary" onClick={() => setOpenId(t.id)} data-testid={`open-${t.id}`}>Open</Btn></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
