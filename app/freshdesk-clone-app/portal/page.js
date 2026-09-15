"use client";
import { useState } from "react";
import { Shell, Page, Card, Select, Field, Badge, Row, Empty } from "../../clones/kit/ui";
import { BRAND, useStore } from "../shared";

/**
 * The customer portal. A requester sees only their own tickets, and only the
 * public replies — private notes stay in the agent view.
 */
export default function Portal() {
  const [s] = useStore();
  const requesters = [...new Set(s.tickets.map((t) => t.email))];
  const [who, setWho] = useState(requesters[0] || "");
  const [openId, setOpenId] = useState(null);

  const mine = s.tickets.filter((t) => t.email === who);
  const ticket = mine.find((t) => t.id === openId) || mine[0] || null;
  const publicThread = ticket ? ticket.thread.filter((m) => m.type !== "private") : [];

  return (
    <Shell brand={BRAND}>
      <Page title="Support portal" sub="Sign in to see your tickets">
        <Card title="Signed in as">
          <Field label="Email">
            <Select value={who} data-testid="portal-user" aria-label="Signed in as"
                    onChange={(e) => { setWho(e.target.value); setOpenId(null); }}>
              {requesters.map((r) => <option key={r} value={r}>{r}</option>)}
            </Select>
          </Field>
          <Row label="Your tickets" value={mine.length} testId="my-ticket-count" />
        </Card>

        <Card title="Your tickets" testId="portal-list">
          {mine.length === 0 && <Empty>You have no tickets.</Empty>}
          {mine.map((t) => (
            <div key={t.id} className="ck-row" data-testid={`portal-ticket-${t.id.replace("#", "")}`}>
              <span>
                <button className="ck-btn ck-btn--ghost ck-btn--sm"
                        data-testid={`portal-open-${t.id.replace("#", "")}`} onClick={() => setOpenId(t.id)}>
                  {t.id} — {t.subject}
                </button>
              </span>
              <Badge tone={t.status === "Resolved" || t.status === "Closed" ? "ok" : "warn"}
                     testId={`portal-status-${t.id.replace("#", "")}`}>{t.status}</Badge>
            </div>
          ))}
        </Card>

        {ticket && (
          <Card title={`${ticket.id} — ${ticket.subject}`} testId="portal-detail">
            <Row label="Status" value={ticket.status} testId="portal-detail-status" />
            <Row label="Priority" value={ticket.priority} testId="portal-detail-priority" />
            <Row label="Replies you can see" value={publicThread.length} testId="portal-reply-count" />
            <div data-testid="portal-thread">
              {publicThread.map((m, i) => (
                <div key={i} className="ck-row" data-testid={`portal-message-${i}`}>
                  <span>
                    <strong data-testid={`portal-from-${i}`}>{m.from}</strong>{" "}
                    <span className="ck-muted">{m.at}</span>
                    <div data-testid={`portal-text-${i}`}>{m.text}</div>
                  </span>
                </div>
              ))}
            </div>
            <p className="ck-muted" data-testid="private-note-notice">
              Internal notes from the support team are not shown here.
            </p>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
