"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Badge, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, BASE, CHANNELS, ME, useStore, threadCount, nextId } from "../../shared";

export default function Channel({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [draft, setDraft] = useState("");
  const [openThread, setOpenThread] = useState(null);
  const [reply, setReply] = useState("");

  const channel = CHANNELS.find((c) => c.id === id) || CHANNELS[0];
  const messages = s.messages[channel.id] || [];
  const thread = messages.find((m) => m.id === openThread) || null;

  function send() {
    const text = draft.trim();
    if (!text) return;
    update((st) => {
      const mid = nextId(st.counter++);
      st.messages[channel.id].push({ id: mid, user: ME.name, text, at: "now", replies: [] });
      return st;
    });
    setDraft("");
  }

  function sendReply() {
    const text = reply.trim();
    if (!text || !openThread) return;
    update((st) => {
      const m = st.messages[channel.id].find((x) => x.id === openThread);
      if (m) m.replies.push({ id: nextId(st.counter++), user: ME.name, text, at: "now" });
      return st;
    });
    setReply("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={`#${channel.name}`} sub={channel.purpose} wide>
        <div className="ck-split">
          <Card title="Messages" testId="message-list">
            {messages.map((m) => (
              <div key={m.id} className="ck-row" data-testid={`message-${m.id}`}>
                <span>
                  <strong>{m.user}</strong> <span className="ck-muted">{m.at}</span>
                  <div data-testid={`text-${m.id}`}>{m.text}</div>
                  <button
                    className="ck-btn ck-btn--ghost ck-btn--sm"
                    data-testid={`reply-${m.id}`}
                    onClick={() => { setOpenThread(m.id); setReply(""); }}
                  >
                    {threadCount(m) > 0
                      ? `${threadCount(m)} ${threadCount(m) === 1 ? "reply" : "replies"}`
                      : "Reply in thread"}
                  </button>
                  {threadCount(m) > 0 && (
                    <Badge tone="info" testId={`thread-count-${m.id}`}>{threadCount(m)}</Badge>
                  )}
                </span>
              </div>
            ))}
            <div className="ck-card-actions">
              <Input
                placeholder={`Message #${channel.name}`}
                value={draft}
                data-testid="composer"
                aria-label="Message input"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <Btn onClick={send} data-testid="send">Send</Btn>
            </div>
          </Card>

          <Card title={thread ? "Thread" : "No thread open"} testId="thread-panel">
            {!thread && <Empty>Pick a message and choose Reply in thread.</Empty>}
            {thread && (
              <>
                <div className="ck-row">
                  <span>
                    <strong>{thread.user}</strong>
                    <div>{thread.text}</div>
                  </span>
                </div>
                <div className="ck-muted" data-testid="thread-reply-count">
                  {threadCount(thread)} {threadCount(thread) === 1 ? "reply" : "replies"}
                </div>
                <div className="ck-list" data-testid="thread-replies">
                  {thread.replies.map((r) => (
                    <div key={r.id} className="ck-row" data-testid={`thread-reply-${r.id}`}>
                      <span>
                        <strong>{r.user}</strong> <span className="ck-muted">{r.at}</span>
                        <div>{r.text}</div>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="ck-card-actions">
                  <Input
                    placeholder="Reply…"
                    value={reply}
                    data-testid="thread-composer"
                    aria-label="Thread reply input"
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendReply()}
                  />
                  <Btn onClick={sendReply} data-testid="send-reply">Reply</Btn>
                </div>
              </>
            )}
          </Card>
        </div>
        <p className="ck-muted">
          Other channels:{" "}
          {CHANNELS.filter((c) => c.id !== channel.id).map((c) => (
            <Link key={c.id} href={`${BASE}/channel/${c.id}`} style={{ marginRight: 12 }}>#{c.name}</Link>
          ))}
        </p>
      </Page>
    </Shell>
  );
}
