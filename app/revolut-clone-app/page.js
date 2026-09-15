"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore, fmt } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/card`, label: "Card", testId: "nav-card" },
        { href: `${BASE}/exchange`, label: "Exchange", testId: "nav-exchange" },
        { href: `${BASE}/split`, label: "Split", testId: "nav-split" },
        { href: `${BASE}/vault`, label: "Vaults", testId: "nav-vault" },
      ]} />
      <Page title="Accounts" sub="Your currency pockets">
        <Card title="Pockets" testId="pockets">
          {s.pockets.map((p) => (
            <Row key={p.currency} label={p.currency} value={fmt(p.amount, p.currency)} testId={`pocket-${p.currency}`} />
          ))}
        </Card>
        <Card title="Card">
          <Badge tone={s.cardFrozen ? "bad" : "ok"} testId="card-state">
            {s.cardFrozen ? "Frozen" : "Active"}
          </Badge>
          <Btn as="link" href={`${BASE}/card`} block style={{ marginTop: 8 }} data-testid="go-card">Manage card</Btn>
        </Card>
        <Card title="Recent transactions" testId="transactions">
          {s.transactions.map((t) => (
            <Row key={t.id} label={`${t.merchant} · ${t.at}`} value={fmt(t.amount, t.currency)} testId={`txn-${t.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
