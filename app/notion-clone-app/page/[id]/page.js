"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Check, Banner, Row, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, BASE, BLOCK_TYPES, TEAMMATES, ME, useStore, nextId } from "../../shared";

export function Block({ block, onToggle }) {
  if (block.type === "heading") return <h2 data-testid={`block-${block.id}`}>{block.text}</h2>;
  if (block.type === "text") return <p data-testid={`block-${block.id}`}>{block.text}</p>;
  if (block.type === "todo") {
    return (
      <label className="ck-choice" data-testid={`block-${block.id}`}>
        <input type="checkbox" checked={!!block.done} onChange={onToggle}
               data-testid={`todo-${block.id}`} aria-label={block.text} />
        <span style={{ textDecoration: block.done ? "line-through" : "none" }}>{block.text}</span>
      </label>
    );
  }
  return (
    <table className="ck-table" data-testid={`block-${block.id}`}>
      <tbody>
        {(block.rows || []).map((r, i) => (
          <tr key={i}>{r.map((c, j) => (i === 0 ? <th key={j}>{c}</th> : <td key={j}>{c}</td>))}</tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PageView({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [type, setType] = useState("text");
  const [text, setText] = useState("");
  const [commentOn, setCommentOn] = useState(null);
  const [comment, setComment] = useState("");
  const [notice, setNotice] = useState(null);

  const p = s.pages[id];

  function addBlock() {
    const body = text.trim();
    if (!body && type !== "table") return;
    update((st) => {
      const bid = nextId(st.counter++);
      const block = type === "table"
        ? { id: bid, type: "table", rows: [["Item", "Owner", "Status"], [body || "Row 1", ME.name, "Not started"]] }
        : { id: bid, type, text: body, ...(type === "todo" ? { done: false } : {}) };
      st.pages[id].blocks.push(block);
      return st;
    });
    setText("");
    setNotice({ tone: "ok", msg: `${BLOCK_TYPES.find((b) => b.id === type).label} block added.` });
  }

  function togglePublish() {
    update((st) => { st.pages[id].published = !st.pages[id].published; return st; });
  }

  function postComment() {
    const body = comment.trim();
    if (!body || !commentOn) return;
    const mentioned = TEAMMATES.filter((t) =>
      body.includes("@" + t) || body.toLowerCase().includes("@" + t.split(" ")[0].toLowerCase()));
    update((st) => {
      const cid = nextId(st.counter++);
      st.pages[id].comments.push({ id: cid, blockId: commentOn, by: ME.name, text: body, mentions: mentioned, at: "now" });
      for (const m of mentioned) {
        st.notifications.unshift({ id: nextId(st.counter++), to: m, from: ME.name, text: body, page: st.pages[id].title });
      }
      return st;
    });
    setComment("");
    setNotice(mentioned.length
      ? { tone: "ok", msg: `Comment saved — ${mentioned.join(", ")} notified.` }
      : { tone: "info", msg: "Comment saved." });
  }

  if (!p) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="Page not found"><Empty>No page with that id.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={p.title} sub={`${p.blocks.length} blocks`} wide>
        {notice && <Banner tone={notice.tone} testId="page-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Page" testId="page-body">
          <Row label="Block count" value={p.blocks.length} testId="block-count" />
          {p.blocks.map((b) => (
            <div key={b.id} className="ck-row">
              <span style={{ width: "100%" }}>
                <Block block={b} onToggle={() => update((st) => {
                  const t = st.pages[id].blocks.find((x) => x.id === b.id);
                  if (t) t.done = !t.done;
                  return st;
                })} />
                <button className="ck-btn ck-btn--ghost ck-btn--sm" data-testid={`comment-on-${b.id}`}
                        onClick={() => setCommentOn(b.id)}>
                  Comment
                </button>
                {p.comments.filter((c) => c.blockId === b.id).map((c) => (
                  <div key={c.id} className="ck-muted" data-testid={`comment-${c.id}`}>
                    💬 <strong>{c.by}</strong>: {c.text}
                    {c.mentions.map((m) => (
                      <Badge key={m} tone="info" testId={`comment-mention-${m.split(" ")[0].toLowerCase()}`}>@{m}</Badge>
                    ))}
                  </div>
                ))}
              </span>
            </div>
          ))}
        </Card>

        <Card title="Add a block">
          <Field label="Block type">
            <Select value={type} data-testid="block-type" aria-label="Block type"
                    onChange={(e) => setType(e.target.value)}>
              {BLOCK_TYPES.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
            </Select>
          </Field>
          <Field label="Content">
            <Input value={text} placeholder="Type the block content" data-testid="block-text" aria-label="Block content"
                   onChange={(e) => setText(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && addBlock()} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={addBlock} data-testid="add-block">Add block</Btn>
          </div>
        </Card>

        {commentOn && (
          <Card title="Comment" testId="comment-box">
            <Field label="Comment" hint="Type @ and a name to mention a teammate">
              <Input value={comment} data-testid="comment-text" aria-label="Comment"
                     onChange={(e) => setComment(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && postComment()} />
            </Field>
            <div className="ck-card-actions">
              {TEAMMATES.map((t) => (
                <Btn key={t} variant="ghost" size="sm" data-testid={`mention-${t.split(" ")[0].toLowerCase()}`}
                     onClick={() => setComment((c) => `${c}@${t} `)}>@{t}</Btn>
              ))}
            </div>
            <div className="ck-card-actions">
              <Btn onClick={postComment} data-testid="post-comment">Post comment</Btn>
              <Btn variant="ghost" onClick={() => setCommentOn(null)}>Close</Btn>
            </div>
          </Card>
        )}

        <Card title="Share">
          <Check checked={p.published} onChange={togglePublish}
                 label="Publish to web" detail="Anyone with the link can read it, no sign-in"
                 testId="publish-toggle" />
          {p.published && (
            <>
              <Row label="Public link" value={`${BASE}/public/${p.id}`} testId="public-link" />
              <div className="ck-card-actions">
                <Link href={`${BASE}/public/${p.id}`} className="ck-btn ck-btn--primary" data-testid="open-public">
                  Open the public page
                </Link>
              </div>
            </>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
