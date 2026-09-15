"use client";
import { use } from "react";
import { Shell, Page, Card, Badge, Empty, Row } from "../../../clones/kit/ui";
import { Block } from "../../page/[id]/page";
import { BRAND, useStore } from "../../shared";

/** No TopBar and no sign-in: this is what a reader sees at the published link. */
export default function PublicPage({ params }) {
  const { id } = use(params);
  const [s] = useStore();
  const p = s.pages[id];

  if (!p) {
    return (
      <Shell brand={BRAND}>
        <Page title="Page not found"><Empty>This link does not point at a page.</Empty></Page>
      </Shell>
    );
  }
  if (!p.published) {
    return (
      <Shell brand={BRAND}>
        <Page title="Not published" testId="not-published">
          <Empty>This page is private. The owner has not published it to the web.</Empty>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Page title={p.title} sub="Published to the web">
        <Card title={null} testId="public-page">
          <Badge tone="ok" testId="public-badge">Public page — no sign-in required</Badge>
          <Row label="Blocks" value={p.blocks.length} testId="public-block-count" />
          {p.blocks.map((b) => <Block key={b.id} block={b} onToggle={() => {}} />)}
        </Card>
      </Page>
    </Shell>
  );
}
