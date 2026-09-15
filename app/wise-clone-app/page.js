"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore, fmt } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/send`, label: "Send money", testId: "nav-send" },
        { href: `${BASE}/recipients`, label: "Recipients", testId: "nav-recipients" },
        { href: `${BASE}/transfers`, label: "Transfers", testId: "nav-transfers" },
        { href: `${BASE}/balances`, label: "Balances", testId: "nav-balances" },
      ]} />
      <Page title="Your money" sub="Hold and convert in multiple currencies">
        <Card title="Balances" testId="balances-summary">
          {s.balances.map((b) => (
            <Row key={b.currency} label={b.currency} value={fmt(b.amount, b.currency)} testId={`balance-${b.currency}`} />
          ))}
        </Card>
        <Card title="Quick actions">
          <Btn as="link" href={`${BASE}/send`} block data-testid="go-send">Send money</Btn>
          <Btn as="link" href={`${BASE}/balances`} variant="secondary" block style={{ marginTop: 8 }} data-testid="go-convert">Convert balances</Btn>
        </Card>
        <Badge tone="info">{s.transfers.length} transfer{s.transfers.length === 1 ? "" : "s"} in flight</Badge>
      </Page>
    </Shell>
  );
}
