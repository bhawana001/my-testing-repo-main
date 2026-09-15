"use client";
import { useState } from "react";
import { Shell, Page, Card, Input, Field, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, ARTICLES } from "../shared";

export default function Help() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const rows = ARTICLES.filter((a) =>
    !q.trim() || a.title.toLowerCase().includes(q.toLowerCase()) ||
    a.tags.some((t) => t.includes(q.toLowerCase())));

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Help centre" sub={`${ARTICLES.length} articles`}>
        <Card title="Search">
          <Field label="What do you need help with">
            <Input value={q} placeholder="billing" data-testid="help-search" aria-label="Search"
                   onChange={(e) => setQ(e.target.value)} />
          </Field>
          <Row label="Articles shown" value={rows.length} testId="help-count" />
        </Card>
        <Card title="Articles" testId="help-list">
          {rows.length === 0 && <Empty>No article matched.</Empty>}
          {rows.map((a) => (
            <div key={a.id} className="ck-row" data-testid={`help-article-${a.id}`}>
              <span>
                <button className="ck-btn ck-btn--ghost ck-btn--sm" data-testid={`help-open-${a.id}`}
                        onClick={() => setOpen(a.id)}>{a.title}</button>
                {open === a.id && <p data-testid={`help-body-${a.id}`}>{a.body}</p>}
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
