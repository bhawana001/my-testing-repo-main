"use client";
// Help centre search and article view with the feedback widget (30.4).
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Input, Field, Badge, Empty, Banner, Row } from "../../clones/kit/ui";
import { BRAND, BASE, ARTICLES, useStore } from "../shared";

export default function HelpPage() {
  const [s, update] = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [thanks, setThanks] = useState(null);

  const term = q.trim().toLowerCase();
  const results = term
    ? ARTICLES.filter((a) => [a.title, a.section, a.body].join(" ").toLowerCase().includes(term))
    : ARTICLES;
  const article = open ? ARTICLES.find((a) => a.id === open) : null;

  function vote(id, dir) {
    update((st) => { st.articleVotes[id] = dir; return st; });
    setThanks(dir === "up" ? "Thanks — glad it helped." : "Thanks — we'll improve this article.");
  }

  if (article) {
    const voted = s.articleVotes[article.id];
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/widget`, label: "Contact us" }]} />
        <Page title={article.title} sub={article.section}>
          <Btn variant="ghost" onClick={() => { setOpen(null); setThanks(null); }} data-testid="back-to-results">← Back to search</Btn>
          <Card testId="article">
            <div data-testid="article-title" className="ck-strong" style={{ fontSize: 18 }}>{article.title}</div>
            <p data-testid="article-body">{article.body}</p>
          </Card>
          <Card title="Was this article helpful?" testId="feedback-widget">
            {thanks && <Banner tone="ok" testId="feedback-thanks">{thanks}</Banner>}
            <Btn variant={voted === "up" ? "primary" : "secondary"} onClick={() => vote(article.id, "up")} data-testid="vote-yes">👍 Yes</Btn>
            <Btn variant={voted === "down" ? "primary" : "secondary"} onClick={() => vote(article.id, "down")} data-testid="vote-no">👎 No</Btn>
            <Row label="Found helpful by" value={`${article.votes.up} of ${article.votes.up + article.votes.down} people`} testId="vote-counts" />
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/widget`, label: "Contact us" }]} />
      <Page title="Help centre" sub="Search our guides">
        <Card>
          <Field label="Search">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="How do I get a refund?"
                   aria-label="Search help centre" data-testid="help-search" />
          </Field>
          <div className="ck-muted" data-testid="help-result-count">
            {results.length} article{results.length === 1 ? "" : "s"}{term && ` for “${q.trim()}”`}
          </div>
        </Card>

        <Card testId="help-results">
          {results.length === 0 ? <Empty>No articles match that search.</Empty> : results.map((a, i) => (
            <div key={a.id} className="ck-row" data-testid={`result-${i}`}>
              <span>
                <button className="ck-btn ck-btn--ghost" style={{ padding: 0, fontWeight: 700 }}
                        onClick={() => setOpen(a.id)} data-testid={`open-article-${i}`}>{a.title}</button>
                <div className="ck-muted">{a.body.slice(0, 90)}…</div>
              </span>
              <Badge tone="neutral">{a.section}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
