"use client";
import { Shell, Page, Card, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="ServiceNau" sub="IT service management">
        <Card title="Open records">
          <Row label="Incidents" value={s.incidents.length} testId="incident-count" />
          <Row label="Change requests" value={s.changes.length} testId="change-count" />
          <Row label="Requested items" value={s.requests.length} testId="request-count" />
          <Row label="Approved changes"
               value={s.changes.filter((c) => c.state === "Approved" || c.state === "Scheduled").length}
               testId="approved-count" />
        </Card>
      </Page>
    </Shell>
  );
}
