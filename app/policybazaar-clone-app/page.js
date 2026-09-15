"use client";
import Link from "next/link";
import { Shell, Page, Card, Row, Badge } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, INSURERS, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Policybaazar" sub="Compare plans from every insurer in one place">
        <Card title="Start here">
          <div className="ck-card-actions">
            <Link href={`${BASE}/term`} className="ck-btn ck-btn--primary" data-testid="start-term">Compare term plans</Link>
            <Link href={`${BASE}/health`} className="ck-btn ck-btn--secondary" data-testid="start-health">Health plans</Link>
            <Link href={`${BASE}/calculator`} className="ck-btn ck-btn--secondary" data-testid="start-calculator">Premium calculator</Link>
          </div>
          <Row label="Callbacks requested" value={s.callbacks.length} testId="callback-count" />
        </Card>
        <Card title="Insurers on the panel">
          {INSURERS.map((i) => (
            <div key={i.id} className="ck-row" data-testid={`insurer-${i.id}`}>
              <span>{i.name}</span>
              <Badge tone="ok">{i.claimRatio}% claims settled</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
