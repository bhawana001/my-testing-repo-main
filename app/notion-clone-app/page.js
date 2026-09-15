"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shell, Page, Card, Btn, Input, Field, Badge, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, useStore, nextId } from "./shared";

export default function Home() {
  const [s, update] = useStore();
  const [title, setTitle] = useState("");
  const router = useRouter();

  function createPage() {
    const name = title.trim() || "Untitled";
    // The id is derived from state we already hold so the push below can use it;
    // a value assigned inside the updater would not exist yet.
    const id = `p${s.counter}`;
    update((st) => {
      st.pages[id] = {
        id, title: name, published: false,
        blocks: [{ id: nextId(st.counter + 1), type: "heading", text: name }],
        comments: [],
      };
      st.counter += 2;
      return st;
    });
    router.push(`${BASE}/page/${id}`);
  }

  const pages = Object.values(s.pages);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Workspace" sub={`${pages.length} ${pages.length === 1 ? "page" : "pages"}`}>
        <Card title="New page">
          <Field label="Title">
            <Input value={title} placeholder="Launch plan" data-testid="new-page-title" aria-label="Page title"
                   onChange={(e) => setTitle(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && createPage()} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={createPage} data-testid="create-page">Create page</Btn>
          </div>
        </Card>

        <Card title="Pages" testId="page-list">
          <Row label="Page count" value={pages.length} testId="page-count" />
          {pages.map((p) => (
            <div key={p.id} className="ck-row" data-testid={`page-${p.id}`}>
              <span>
                <Link href={`${BASE}/page/${p.id}`} data-testid={`open-${p.id}`}>{p.title}</Link>
                <span className="ck-muted"> — {p.blocks.length} blocks</span>
              </span>
              {p.published && <Badge tone="ok" testId={`published-${p.id}`}>Published to web</Badge>}
            </div>
          ))}
        </Card>

        {s.notifications.length > 0 && (
          <Card title="Notifications" testId="notifications">
            {s.notifications.map((n) => (
              <Row key={n.id} label={`${n.to} — mentioned by ${n.from}`} value={n.text} testId={`notif-${n.id}`} />
            ))}
          </Card>
        )}
      </Page>
    </Shell>
  );
}
