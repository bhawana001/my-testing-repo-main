"use client";
import { Shell, Page, Card, Row, Badge, Empty } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, CARD, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  const pendingCredit = s.statement.credits
    .filter((c) => c.status === "Pending")
    .reduce((n, c) => n + c.amount, 0);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={CARD.name} sub={`${CARD.holder} · ${CARD.number}`}>
        <Card title="Account">
          <Row label="Statement balance" value={money(s.statement.balance)} testId="statement-balance" />
          <Row label="Minimum due" value={money(s.statement.minimumDue)} testId="minimum-due" />
          <Row label="Payment due" value={s.statement.dueDate} testId="due-date" />
          <Row label="Membership points" value={s.points.toLocaleString()} testId="points-balance" />
          {pendingCredit > 0 && (
            <Row label="Statement credit pending" value={money(pendingCredit)} testId="pending-credit" />
          )}
        </Card>
        <Card title="Open items">
          <Row label="Scheduled payments" value={s.scheduledPayments.length} testId="scheduled-count" />
          <Row label="Disputes" value={s.disputes.length} testId="dispute-count" />
          <Row label="Offers on the card" value={s.addedOffers.length} testId="offer-count" />
        </Card>
        <Card title="Recent charges" testId="charge-list">
          {s.charges.length === 0 && <Empty>No charges.</Empty>}
          {s.charges.map((c) => (
            <div key={c.id} className="ck-row" data-testid={`charge-${c.id}`}>
              <span><strong>{c.merchant}</strong><div className="ck-muted">{c.at}</div></span>
              <span>
                {money(c.amount)}{" "}
                {c.disputed && <Badge tone="warn" testId={`disputed-${c.id}`}>Disputed</Badge>}
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
