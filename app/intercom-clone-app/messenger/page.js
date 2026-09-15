"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, VISITOR, BOT_OPTIONS, useStore, convId, suggestArticles } from "../shared";

const ATTACHMENTS = [
  { name: "error-screenshot.png", kind: "image" },
  { name: "console-log.txt", kind: "text" },
];
const svg = (label) =>
  "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="140"><rect width="260" height="140" fill="#1f8ded"/><text x="130" y="78" font-family="sans-serif" font-size="20" fill="#fff" text-anchor="middle">${label}</text></svg>`);

export default function Messenger() {
  const [s, update] = useStore();
  const [text, setText] = useState("");
  const [openId, setOpenId] = useState(null);
  const [notice, setNotice] = useState(null);
  const [article, setArticle] = useState(null);

  const conversation = s.conversations.find((c) => c.id === openId) || null;
  const suggestions = suggestArticles(text);

  function start(first, attachment) {
    const id = convId(s.conversations.length);
    const messages = [{ from: "visitor", text: first, at: "now", attachment: attachment || null }];
    update((st) => {
      st.conversations.unshift({
        id, visitor: VISITOR.name, email: VISITOR.email, plan: VISITOR.plan,
        state: "Open", assignee: null, source: "Messenger", messages,
        botTrail: [], at: "now",
      });
      return st;
    });
    setOpenId(id);
    setText("");
    setNotice({ tone: "ok", msg: `Message sent — conversation ${id} is now in the inbox.` });
  }

  function send() {
    const body = text.trim();
    if (!body) return;
    if (!conversation) { start(body, null); return; }
    update((st) => {
      st.conversations.find((c) => c.id === openId).messages.push({ from: "visitor", text: body, at: "now" });
      return st;
    });
    setText("");
  }

  function attach(a) {
    const payload = a.kind === "image"
      ? { name: a.name, url: svg("SCREENSHOT"), kind: "image" }
      : { name: a.name, url: `data:text/plain;charset=utf-8,${encodeURIComponent("TypeError: cannot read plan of undefined")}`, kind: "text" };
    if (!conversation) { start(`Here is the file: ${a.name}`, payload); return; }
    update((st) => {
      st.conversations.find((c) => c.id === openId).messages.push({
        from: "visitor", text: `Attached ${a.name}`, at: "now", attachment: payload,
      });
      return st;
    });
    setNotice({ tone: "ok", msg: `${a.name} attached to the conversation.` });
  }

  function botPick(option) {
    if (!conversation) { start(option.label, null); return; }
    update((st) => {
      const c = st.conversations.find((x) => x.id === openId);
      c.messages.push({ from: "visitor", text: option.label, at: "now" });
      c.botTrail.push(option.label);
      if (option.id === "human") {
        // The whole transcript stays on the conversation, which is what "with
        // context" means when it reaches the agent.
        c.assignee = "Priya Nair";
        c.state = "Assigned to a human";
        c.messages.push({ from: "bot", text: "Handing you to Priya — she can see everything above.", at: "now" });
      } else {
        c.messages.push({ from: "bot", text: option.reply, at: "now" });
      }
      return st;
    });
    if (option.id === "human") {
      setNotice({ tone: "ok", msg: "Handed off to a human — the conversation is assigned in the inbox with the full transcript." });
    }
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Messenger" sub={`You are ${VISITOR.name} on the ${VISITOR.plan} plan`} wide>
        {notice && <Banner tone={notice.tone} testId="messenger-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title={conversation ? `Conversation ${conversation.id}` : "Start a conversation"} testId="messenger-thread">
          {!conversation && <Empty>Say something, pick an option, or attach a file to begin.</Empty>}
          {conversation && conversation.messages.map((m, i) => (
            <div key={i} className="ck-row" data-testid={`message-${i}`}>
              <span>
                <strong data-testid={`message-from-${i}`}>
                  {m.from === "visitor" ? VISITOR.name : m.from === "bot" ? "Fin (bot)" : m.from}
                </strong>
                <div data-testid={`message-text-${i}`}>{m.text}</div>
                {m.attachment && (
                  <div data-testid={`attachment-${i}`}>
                    {m.attachment.kind === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.attachment.url} alt={m.attachment.name} className="ck-thumb"
                           data-testid={`attachment-preview-${i}`} style={{ maxWidth: 260 }} />
                    ) : (
                      <a href={m.attachment.url} download={m.attachment.name}
                         data-testid={`attachment-link-${i}`}>{m.attachment.name}</a>
                    )}
                  </div>
                )}
              </span>
            </div>
          ))}
          {conversation && (
            <Row label="State" value={conversation.state} testId="conversation-state" />
          )}

          <div className="ck-card-actions">
            <Input value={text} placeholder="Ask us anything" data-testid="messenger-input" aria-label="Message"
                   onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
            <Btn onClick={send} data-testid="messenger-send">Send</Btn>
          </div>

          {suggestions.length > 0 && (
            <Card title="Suggested articles" testId="article-suggestions">
              {suggestions.map((a) => (
                <div key={a.id} className="ck-row" data-testid={`suggestion-${a.id}`}>
                  <span data-testid={`suggestion-title-${a.id}`}>{a.title}</span>
                  <Btn size="sm" variant="ghost" data-testid={`open-article-${a.id}`} onClick={() => setArticle(a)}>
                    Open
                  </Btn>
                </div>
              ))}
            </Card>
          )}

          {article && (
            <Card title={article.title} testId="article-view">
              <p data-testid="article-body">{article.body}</p>
              <Btn variant="ghost" onClick={() => setArticle(null)} data-testid="close-article">Back to the chat</Btn>
            </Card>
          )}

          <div className="ck-card-actions">
            {BOT_OPTIONS.map((o) => (
              <Btn key={o.id} variant="secondary" data-testid={`bot-${o.id}`} onClick={() => botPick(o)}>
                {o.label}
              </Btn>
            ))}
          </div>
          <div className="ck-card-actions">
            {ATTACHMENTS.map((a) => (
              <Btn key={a.name} variant="ghost" size="sm" data-testid={`attach-${a.kind}`} onClick={() => attach(a)}>
                Attach {a.name}
              </Btn>
            ))}
          </div>
        </Card>

        {conversation && conversation.assignee && (
          <Banner tone="ok" testId="handoff-banner">
            Assigned to {conversation.assignee}.{" "}
            <Link href={`${BASE}/inbox`} data-testid="go-inbox">Open the inbox</Link>
          </Banner>
        )}
      </Page>
    </Shell>
  );
}
