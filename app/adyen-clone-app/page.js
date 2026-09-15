"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, ORDER, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/checkout`, label: "Drop-in checkout", testId: "nav-checkout" },
        { href: `${BASE}/orders`, label: "Merchant orders", testId: "nav-orders" },
      ]} />
      <Page title={ORDER.merchant} sub="Adyeen drop-in integration demo">
        <Card title="Your order" testId="order-card">
          <Row label="Reference" value={ORDER.reference} testId="order-reference" />
          <Row label="Amount" value={`€${ORDER.amount.toFixed(2)}`} strong testId="order-amount" />
          <Badge tone="info">{s.storedCards.length} stored payment method{s.storedCards.length === 1 ? "" : "s"}</Badge>
          <Btn as="link" href={`${BASE}/checkout`} block style={{ marginTop: 10 }} data-testid="go-checkout">Continue to payment</Btn>
        </Card>
      </Page>
    </Shell>
  );
}
