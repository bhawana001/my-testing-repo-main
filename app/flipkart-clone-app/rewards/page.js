"use client";
// SuperCoins balance (3.4): a real number backed by a ledger that every order
// appends to -- not a static badge.
import { Shell, TopBar, Page, Card, Row, Badge, Btn } from "../../clones/kit/ui";
import { BRAND, BASE, useStore } from "../shared";

export default function RewardsPage() {
  const [s] = useStore();
  const earned = s.coinHistory.filter((h) => h.delta > 0).reduce((n, h) => n + h.delta, 0);
  const spent = s.coinHistory.filter((h) => h.delta < 0).reduce((n, h) => n + Math.abs(h.delta), 0);

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/cart`, label: "Cart" }]} />
      <Page title="SuperCoins" sub="Earn 1 coin per ₹500 spent. Redeem against future orders.">
        <Card testId="coin-balance-card">
          <div className="ck-muted">Available balance</div>
          <div style={{ fontSize: 40, fontWeight: 700 }} data-testid="coin-balance">{s.superCoins}</div>
          <Badge tone="ok" testId="balance-state">Balance available</Badge>
          <Row label="Lifetime earned" value={String(earned)} testId="coins-earned-total" />
          <Row label="Lifetime redeemed" value={String(spent)} testId="coins-spent-total" />
        </Card>
        <Card title="Coin history" testId="coin-history">
          {s.coinHistory.map((h, i) => (
            <Row key={i} label={`${h.label}`} value={`${h.delta > 0 ? "+" : ""}${h.delta}`} testId={`history-${i}`} />
          ))}
        </Card>
        <Btn as="link" href={BASE} variant="secondary">Back to shopping</Btn>
      </Page>
    </Shell>
  );
}
