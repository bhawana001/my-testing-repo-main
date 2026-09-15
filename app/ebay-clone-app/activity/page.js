"use client";
// My eBid: bids, offers and purchases in one place, so a placed bid or a sent
// offer can be confirmed after the fact rather than only in a toast.
import { Shell, TopBar, Page, Card, Row, Badge, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "../shared";

export default function ActivityPage() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Browse" }, { href: `${BASE}/sell`, label: "Sell" }]} />
      <Page title="My eBid">
        <Card title={`Bids (${s.bids.length})`} testId="bids-list">
          {s.bids.length === 0 ? <Empty>No bids yet.</Empty> : s.bids.map((b) => (
            <div key={b.id} data-testid={`bid-${b.id}`}>
              <Row label={b.title} value={money(b.amount)} />
              <Badge tone="ok" testId={`bid-status-${b.id}`}>{b.status}</Badge>
            </div>
          ))}
        </Card>

        <Card title={`Best Offers (${s.offers.length})`} testId="offers-list">
          {s.offers.length === 0 ? <Empty>No offers sent.</Empty> : s.offers.map((o) => (
            <div key={o.id} data-testid={`offer-${o.id}`}>
              <Row label={o.title} value={money(o.amount)} testId={`offer-amount-${o.id}`} />
              <div className="ck-muted">Asking price was {money(o.asking)}</div>
              <Badge tone="warn" testId={`offer-status-${o.id}`}>{o.status}</Badge>
            </div>
          ))}
        </Card>

        <Card title={`Purchases (${s.orders.length})`} testId="orders-list">
          {s.orders.length === 0 ? <Empty>No purchases yet.</Empty> : s.orders.map((o) => (
            <div key={o.id} data-testid={`order-${o.id}`}>
              <Row label={o.title} value={money(o.total)} testId={`order-total-${o.id}`} />
              <div className="ck-muted">{o.id} · paid with {o.paidWith}</div>
              <Badge tone="ok">{o.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
