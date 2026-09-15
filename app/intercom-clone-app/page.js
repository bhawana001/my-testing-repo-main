"use client";
import { Shell, Page, Card, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Intercomm" sub="Messenger, inbox and outbound in one place">
        <Card title="Workspace">
          <Row label="Conversations" value={s.conversations.length} testId="conversation-count" />
          <Row label="Assigned to a human"
               value={s.conversations.filter((c) => c.assignee).length} testId="assigned-count" />
          <Row label="Outbound CTA clicks" value={s.ctaClicks.length} testId="cta-count" />
        </Card>
      </Page>
    </Shell>
  );
}
