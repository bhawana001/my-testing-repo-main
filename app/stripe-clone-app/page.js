"use client";
// Merchant demo page — the thing that starts a Checkout session.
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, PRODUCT, useStore, money } from "./shared";

export default function Merchant() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/dashboard`, label: "Dashboard", testId: "nav-dashboard" },
        { href: `${BASE}/portal`, label: "Billing portal", testId: "nav-portal" },
      ]} />
      <Page title="Northwind Software" sub="Demo merchant using Stripey Checkout">
        <div className="ck-split">
          <Card title={PRODUCT.name} testId="product">
            <p className="ck-muted">{PRODUCT.description}</p>
            <div style={{ fontSize: 30, fontWeight: 700, margin: "10px 0" }} data-testid="product-price">
              {money(PRODUCT.price)}
            </div>
            <Btn as="link" href={`${BASE}/checkout`} block data-testid="start-checkout">
              Subscribe with Stripey
            </Btn>
          </Card>
          <Card title="Test cards">
            <Row label="Succeeds" value="4242 4242 4242 4242" />
            <Row label="Requires 3DS" value="4000 0025 0000 3155" />
            <Row label="Declines" value="4000 0000 0000 0002" />
            <Badge tone="info">{s.payments.length} payments recorded</Badge>
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
