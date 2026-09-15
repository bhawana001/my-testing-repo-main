"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, KB, useStore } from "../shared";

export default function Knowledge() {
  const [s, update] = useStore();
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState(null);
  const [notice, setNotice] = useState(null);

  const rows = KB.filter((a) =>
    !q.trim() ||
    a.title.toLowerCase().includes(q.toLowerCase()) ||
    a.body.toLowerCase().includes(q.toLowerCase()) ||
    a.category.toLowerCase().includes(q.toLowerCase()));

  const article = KB.find((a) => a.id === openId) || null;
  const myVote = article ? s.votes[article.id] : null;

  function vote(which) {
    if (!article) return;
    update((st) => { st.votes[article.id] = which; return st; });
    setNotice({ tone: "ok", msg: which === "helpful" ? "Thanks — marked as helpful." : "Thanks — we will review this article." });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Knowledge base" sub={`${KB.length} articles`} wide>
        {notice && <Banner tone={notice.tone} testId="vote-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Search">
          <Field label="Search the knowledge base">
            <Input value={q} placeholder="vpn" data-testid="kb-search" aria-label="Search"
                   onChange={(e) => setQ(e.target.value)} />
          </Field>
          <Row label="Articles found" value={rows.length} testId="kb-result-count" />
        </Card>

        <Card title="Results" testId="kb-results">
          {rows.length === 0 && <Empty>No article matched that search.</Empty>}
          {rows.map((a) => (
            <div key={a.id} className="ck-row" data-testid={`kb-${a.id}`}>
              <span>
                <button className="ck-btn ck-btn--ghost ck-btn--sm" data-testid={`kb-open-${a.id}`}
                        onClick={() => setOpenId(a.id)}>
                  <strong>{a.id}</strong> — {a.title}
                </button>
                <div className="ck-muted">{a.category}</div>
              </span>
              <Badge tone="ok" testId={`kb-helpful-${a.id}`}>{a.helpful} found this helpful</Badge>
            </div>
          ))}
        </Card>

        {article && (
          <Card title={`${article.id} — ${article.title}`} testId="kb-article">
            <Row label="Category" value={article.category} testId="article-category" />
            <p data-testid="article-body">{article.body}</p>

            <Card title="Was this article helpful?" testId="vote-widget">
              <Row label="Helpful" value={article.helpful + (myVote === "helpful" ? 1 : 0)} testId="helpful-count" />
              <Row label="Not helpful" value={article.notHelpful + (myVote === "not" ? 1 : 0)} testId="not-helpful-count" />
              <div className="ck-card-actions">
                <Btn variant={myVote === "helpful" ? "primary" : "secondary"} data-testid="vote-helpful"
                     onClick={() => vote("helpful")}>Yes</Btn>
                <Btn variant={myVote === "not" ? "primary" : "secondary"} data-testid="vote-not-helpful"
                     onClick={() => vote("not")}>No</Btn>
              </div>
              {myVote && (
                <Badge tone="ok" testId="vote-recorded">
                  You marked this {myVote === "helpful" ? "helpful" : "not helpful"}
                </Badge>
              )}
            </Card>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
