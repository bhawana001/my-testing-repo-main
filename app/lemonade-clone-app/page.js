"use client";
import Link from "next/link";
import { Shell, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Limonade" sub="Renters insurance without the paperwork">
        <Card title="Where you are">
          <Row label="Quote" value={s.quote ? `${money(s.quote.monthly)} a month` : "Not started"} testId="quote-state" />
          <Row label="Policy" value={s.policy ? s.policy.number : "None"} testId="policy-state" />
          <Row label="Claims" value={s.claims.length} testId="claim-count" />
          <div className="ck-card-actions">
            <Link href={`${BASE}/quote`} className="ck-btn ck-btn--primary" data-testid="start-quote">
              {s.quote ? "Review your quote" : "Get a quote"}
            </Link>
          </div>
        </Card>
        <Card title="What is covered">
          <Row label="Personal property" value="Your things, at home or away" />
          <Row label="Personal liability" value="If someone is hurt in your place" />
          <Row label="Loss of use" value="Somewhere to stay if you cannot be home" />
          <Badge tone="info">Claims paid in minutes, not weeks</Badge>
        </Card>
      </Page>
    </Shell>
  );
}
