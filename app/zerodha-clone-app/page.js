"use client";
import { Shell, TopBar, Page, Card, Row, Badge, Btn } from "../clones/kit/ui";
import { BRAND, BASE, STOCKS, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/orders`, label: "Orders", testId: "nav-orders" },
        { href: `${BASE}/gtt`, label: "GTT", testId: "nav-gtt" },
        { href: `${BASE}/holdings`, label: "Holdings", testId: "nav-holdings" },
        { href: `${BASE}/funds`, label: "Funds", testId: "nav-funds" },
      ]} />
      <Page title="Dashboard" sub="Marketwatch">
        <Card title="Available margin">
          <div style={{ fontSize: 28, fontWeight: 700 }} data-testid="balance">{money(s.balance)}</div>
        </Card>
        <Card title="Marketwatch" testId="marketwatch">
          {STOCKS.map((x) => (
            <Row key={x.symbol} label={`${x.symbol} · ${x.name}`} value={money(x.ltp)} testId={`ltp-${x.symbol}`} />
          ))}
        </Card>
        <Btn as="link" href={`${BASE}/orders`} data-testid="go-orders">Place an order</Btn>
      </Page>
    </Shell>
  );
}
