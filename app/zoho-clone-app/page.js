"use client";
import { Shell, Page, Card, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, useStore, money, reportNumbers } from "./shared";

export default function Home() {
  const [s] = useStore();
  const k = reportNumbers(s.leads);
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Zohoe CRM" sub="Leads, rules and blueprints">
        <Card title="At a glance">
          <Row label="Leads" value={k.total} testId="lead-count" />
          <Row label="Pipeline" value={money(k.pipeline)} testId="pipeline" />
          <Row label="Hot leads" value={k.hot} testId="hot-count" />
          <Row label="Imports run" value={s.imports.length} testId="import-count" />
          <Row label="Workflow runs" value={s.ruleRuns.length} testId="rule-run-count" />
        </Card>
      </Page>
    </Shell>
  );
}
