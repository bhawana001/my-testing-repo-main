"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, ACCOUNT, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/checkout`, label: "Merchant demo", testId: "nav-checkout" },
        { href: `${BASE}/send`, label: "Send money", testId: "nav-send" },
        { href: `${BASE}/activity`, label: "Activity", testId: "nav-activity" },
      ]} />
      <Page title={`Hello, ${ACCOUNT.name.split(" ")[0]}`} sub="Your PayPaal balance">
        <Card testId="balance-card">
          <div style={{ fontSize: 34, fontWeight: 700 }} data-testid="balance">{money(ACCOUNT.balance)}</div>
          <Row label="Linked card" value={`${ACCOUNT.card.brand} ending in ${ACCOUNT.card.last4}`} />
          <Row label="Linked bank" value={ACCOUNT.bank} />
          <Badge tone="ok">Verified account</Badge>
        </Card>
        <div className="ck-grid ck-grid--3">
          <Card title="Pay a merchant"><Btn as="link" href={`${BASE}/checkout`} block data-testid="go-checkout">Open demo store</Btn></Card>
          <Card title="Send money"><Btn as="link" href={`${BASE}/send`} block data-testid="go-send">Send</Btn></Card>
          <Card title="Activity"><Btn as="link" href={`${BASE}/activity`} block data-testid="go-activity">View activity</Btn></Card>
        </div>
      </Page>
    </Shell>
  );
}
