"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty } from "../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/upi`, label: "UPI", testId: "nav-upi" },
        { href: `${BASE}/recharge`, label: "Recharge", testId: "nav-recharge" },
        { href: `${BASE}/bills`, label: "Bills", testId: "nav-bills" },
        { href: `${BASE}/wallet`, label: "Wallet", testId: "nav-wallet" },
        { href: `${BASE}/movies`, label: "Movies", testId: "nav-movies" },
      ]} />
      <Page title="Paytem" sub="Pay, recharge and book">
        <Card title="Paytem Wallet" testId="wallet-card">
          <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="wallet-balance">{money(s.walletBalance)}</div>
          <Row label="Linked bank" value={s.bankAccount} />
        </Card>
        <Card title={`Recent transactions (${s.transactions.length})`} testId="transactions">
          {s.transactions.length === 0 ? <Empty>No transactions yet.</Empty> : s.transactions.map((t) => (
            <div key={t.id} data-testid={`txn-${t.id}`}>
              <Row label={`${t.label} · ${t.at}`} value={money(t.amount)} />
              <Badge tone="ok">{t.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
