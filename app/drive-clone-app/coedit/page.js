"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Badge, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore, nextId } from "../shared";

const SESSIONS = [
  { id: "a", who: "Priya Nair", color: "#1a73e8" },
  { id: "b", who: "Mira Shah", color: "#e8710a" },
];

/**
 * Two sessions on one document. Each writes into the same line list with its own
 * author tag, so "both edits present" is checkable — and each session parks a
 * labelled cursor, which is what the other session is meant to see.
 */
export default function Coedit() {
  const [s, update] = useStore();
  const [drafts, setDrafts] = useState({ a: "", b: "" });

  function type(sessionId, value) {
    setDrafts((d) => ({ ...d, [sessionId]: value }));
    const session = SESSIONS.find((x) => x.id === sessionId);
    update((st) => {
      st.coedit.cursors[sessionId] = { who: session.who, at: st.coedit.lines.length + 1, typing: value.length > 0 };
      return st;
    });
  }

  function commit(sessionId) {
    const text = (drafts[sessionId] || "").trim();
    if (!text) return;
    const session = SESSIONS.find((x) => x.id === sessionId);
    update((st) => {
      st.coedit.lines.push({ id: nextId(st.counter++), text, by: session.who, session: sessionId });
      st.coedit.cursors[sessionId] = { who: session.who, at: st.coedit.lines.length, typing: false };
      return st;
    });
    setDrafts((d) => ({ ...d, [sessionId]: "" }));
  }

  const lines = s.coedit.lines.map((l) => (typeof l === "string" ? { id: l, text: l, by: "Priya Nair", session: "a" } : l));
  const cursors = Object.entries(s.coedit.cursors || {});

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Launch plan" sub="Two sessions, one document, no conflicts" wide>
        <Card title="Document" testId="document">
          <Row label="Lines" value={lines.length} testId="line-count" />
          <div data-testid="doc-body">
            {lines.map((l, i) => (
              <div key={l.id || i} className="ck-row" data-testid={`line-${i}`}>
                <span>{l.text}</span>
                <Badge tone="neutral" testId={`line-author-${i}`}>{l.by}</Badge>
              </div>
            ))}
          </div>
          <div data-testid="cursors">
            {cursors.length === 0 && <span className="ck-muted">No other cursors in the document.</span>}
            {cursors.map(([id, c]) => (
              <Badge key={id} tone="info" testId={`cursor-${id}`}>
                {c.who} cursor at line {c.at}{c.typing ? " · typing" : ""}
              </Badge>
            ))}
          </div>
        </Card>

        <div className="ck-split">
          {SESSIONS.map((session) => (
            <Card key={session.id} title={`Session ${session.id.toUpperCase()} — ${session.who}`}
                  testId={`session-${session.id}`}>
              <Input value={drafts[session.id]} placeholder={`Type as ${session.who}`}
                     data-testid={`input-${session.id}`} aria-label={`Session ${session.id} input`}
                     onChange={(e) => type(session.id, e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && commit(session.id)} />
              <div className="ck-card-actions">
                <Btn onClick={() => commit(session.id)} data-testid={`commit-${session.id}`}>
                  Insert line
                </Btn>
              </div>
              <Row label="Lines from this session"
                   value={lines.filter((l) => l.session === session.id).length}
                   testId={`session-lines-${session.id}`} />
            </Card>
          ))}
        </div>
      </Page>
    </Shell>
  );
}
