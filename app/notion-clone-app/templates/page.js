"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, TEMPLATES, useStore, nextId } from "../shared";

export default function Templates() {
  const [s, update] = useStore();
  const [made, setMade] = useState(null);

  function duplicate(tpl) {
    // Built outside the updater so the link below can point at the new page id.
    const id = `p${s.counter}`;
    const blocks = tpl.blocks.map((b, i) => ({ ...b, id: `${id}b${i}` }));
    update((st) => {
      st.pages[id] = { id, title: tpl.name, published: false, blocks, comments: [] };
      st.counter += 2;
      return st;
    });
    setMade({ id, name: tpl.name, blocks: blocks.length });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Templates" sub="Duplicate a template into the workspace">
        {made && (
          <Banner tone="ok" title="Template duplicated" testId="duplicate-notice" onClose={() => setMade(null)}>
            “{made.name}” copied into the workspace with {made.blocks} blocks.{" "}
            <Link href={`${BASE}/page/${made.id}`} data-testid="open-duplicate">Open the new page</Link>
          </Banner>
        )}

        <Card title="Gallery" testId="template-list">
          {TEMPLATES.map((t) => (
            <div key={t.id} className="ck-row" data-testid={`template-${t.id}`}>
              <span>
                <strong>{t.name}</strong>
                <div className="ck-muted">{t.blocks.length} blocks</div>
              </span>
              <Btn size="sm" data-testid={`duplicate-${t.id}`} onClick={() => duplicate(t)}>Duplicate</Btn>
            </div>
          ))}
        </Card>

        <Card title="Workspace">
          <Row label="Pages" value={Object.keys(s.pages).length} testId="workspace-page-count" />
        </Card>
      </Page>
    </Shell>
  );
}
