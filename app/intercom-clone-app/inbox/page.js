"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, AGENTS, useStore } from "../shared";

export default function Inbox() {
  const [s, update] = useStore();
  const [openId, setOpenId] = useState(null);
  const [reply, setReply] = useState("");

  const conversation = s.conversations.find((c) => c.id === openId)
    || s.conversations[0] || null;

  function sendReply() {
    const body = reply.trim();
    if (!body || !conversation) return;
    update((st) => {
      const c = st.conversations.find((x) => x.id === conversation.id);
      c.messages.push({ from: c.assignee || AGENTS[0], text: body, at: "now" });
      if (!c.assignee) { c.assignee = AGENTS[0]; c.state = "Assigned to a human"; }
      return st;
    });
    setReply("");
  }

  function assign(agent) {
    update((st) => {
      const c = st.conversations.find((x) => x.id === conversation.id);
      c.assignee = agent;
      c.state = "Assigned to a human";
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Inbox" sub={`${s.conversations.length} conversations`} wide>
        <div className="ck-split">
          <Card title="Conversations" testId="conversation-list">
            {s.conversations.length === 0 && <Empty>Nothing in the inbox yet.</Empty>}
            {s.conversations.map((c) => (
              <div key={c.id} className="ck-row" data-testid={`inbox-${c.id}`}>
                <span>
                  <button className="ck-btn ck-btn--ghost ck-btn--sm" data-testid={`select-${c.id}`}
                          onClick={() => setOpenId(c.id)}>
                    <strong>{c.visitor}</strong>
                  </button>
                  <div className="ck-muted">
                    {c.id} · {c.messages.length} messages · {c.assignee || "Unassigned"}
                  </div>
                </span>
                <Badge tone={c.assignee ? "ok" : "warn"} testId={`inbox-state-${c.id}`}>{c.state}</Badge>
              </div>
            ))}
          </Card>

          <Card title={conversation ? `${conversation.visitor} — ${conversation.id}` : "No conversation selected"}
                testId="conversation-detail">
            {!conversation && <Empty>Pick a conversation.</Empty>}
            {conversation && (
              <>
                <Row label="Visitor" value={`${conversation.visitor} · ${conversation.email}`} testId="detail-visitor" />
                <Row label="Plan" value={conversation.plan} testId="detail-plan" />
                <Row label="Source" value={conversation.source} testId="detail-source" />
                <Row label="Assignee" value={conversation.assignee || "Unassigned"} testId="detail-assignee" />
                <Row label="Messages carried over" value={conversation.messages.length} testId="detail-message-count" />
                {conversation.botTrail.length > 0 && (
                  <Row label="Bot path" value={conversation.botTrail.join(" → ")} testId="detail-bot-trail" />
                )}

                <h3>Transcript</h3>
                <div data-testid="transcript">
                  {conversation.messages.map((m, i) => (
                    <div key={i} className="ck-row" data-testid={`transcript-${i}`}>
                      <span>
                        <strong data-testid={`transcript-from-${i}`}>
                          {m.from === "visitor" ? conversation.visitor : m.from === "bot" ? "Fin (bot)" : m.from}
                        </strong>
                        <div data-testid={`transcript-text-${i}`}>{m.text}</div>
                        {m.attachment && (
                          <span data-testid={`transcript-attachment-${i}`}>📎 {m.attachment.name}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <Field label="Assign to">
                  <Select value={conversation.assignee || ""} data-testid="assign-select" aria-label="Assign to"
                          onChange={(e) => assign(e.target.value)}>
                    <option value="">Unassigned</option>
                    {AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </Select>
                </Field>
                <div className="ck-card-actions">
                  <Input value={reply} placeholder="Reply to the customer" data-testid="reply-input"
                         aria-label="Reply" onChange={(e) => setReply(e.target.value)}
                         onKeyDown={(e) => e.key === "Enter" && sendReply()} />
                  <Btn onClick={sendReply} data-testid="send-reply">Reply</Btn>
                </div>
              </>
            )}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
