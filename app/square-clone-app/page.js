"use client";
import { Shell, TopBar, Page, Card, Btn, Row } from "../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  const gross = s.payments.reduce((n, p) => n + p.amount + p.tip - p.refunded, 0);
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/link`, label: "Checkout link", testId: "nav-link" },
        { href: `${BASE}/invoice`, label: "Invoices", testId: "nav-invoice" },
        { href: `${BASE}/pos`, label: "Web POS", testId: "nav-pos" },
        { href: `${BASE}/dashboard`, label: "Dashboard", testId: "nav-dashboard" },
      ]} />
      <Page title="Squair for sellers" sub="Take payments any way your customers want">
        <Card title="Today">
          <Row label="Net sales" value={money(gross)} testId="net-sales" />
          <Row label="Payments" value={String(s.payments.length)} testId="payment-count" />
        </Card>
        <div className="ck-grid ck-grid--2">
          <Card title="Share a checkout link"><Btn as="link" href={`${BASE}/link`} block data-testid="go-link">Open link</Btn></Card>
          <Card title="Send an invoice"><Btn as="link" href={`${BASE}/invoice`} block data-testid="go-invoice">Open invoices</Btn></Card>
          <Card title="Ring up a sale"><Btn as="link" href={`${BASE}/pos`} block data-testid="go-pos">Open POS</Btn></Card>
          <Card title="Refund a payment"><Btn as="link" href={`${BASE}/dashboard`} block data-testid="go-dashboard">Open dashboard</Btn></Card>
        </div>
      </Page>
    </Shell>
  );
}
