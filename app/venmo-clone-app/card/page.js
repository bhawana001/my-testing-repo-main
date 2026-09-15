"use client";
// Card transaction feed with cashback tags (22.4). A simulated purchase lands
// in the feed with its cashback, and eligible categories are marked.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "../shared";

// Cashback only applies to some categories, which is what the tag signals.
const REWARDS = { Groceries: 0.01, Dining: 0.03, Transit: 0 };
const SIMULATED = { merchant: "Nonna's Trattoria", amount: 58.4, category: "Dining" };

export default function CardPage() {
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);

  const totalCashback = s.cardTransactions.reduce((n, t) => n + t.cashback, 0);

  function simulate() {
    const rate = REWARDS[SIMULATED.category] ?? 0;
    const cashback = +(SIMULATED.amount * rate).toFixed(2);
    update((st) => {
      st.cardTransactions.unshift({ id: "c" + (st.counter + 1), merchant: SIMULATED.merchant,
                                    amount: SIMULATED.amount, at: "2026-09-15",
                                    cashback, category: SIMULATED.category });
      st.balance = +(st.balance + cashback).toFixed(2);
      st.counter += 1;
      return st;
    });
    setNotice(`${SIMULATED.merchant} · ${money(SIMULATED.amount)} — ${cashback > 0 ? `${money(cashback)} cashback earned` : "no cashback for this category"}.`);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/cashout`, label: "Cash out" }]} />
      <Page title="Venmoo card">
        {notice && <Banner tone="ok" testId="card-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <Card title="Rewards" testId="rewards-card">
          <Row label="Cashback earned" value={money(totalCashback)} strong testId="total-cashback" />
          <div className="ck-muted">3% dining · 1% groceries · no cashback on transit</div>
          <Btn variant="secondary" onClick={simulate} data-testid="simulate-purchase">
            Simulate a {money(SIMULATED.amount)} purchase at {SIMULATED.merchant}
          </Btn>
        </Card>

        <Card title="Transactions" testId="card-feed">
          {s.cardTransactions.length === 0 ? <Empty>No card transactions.</Empty> : s.cardTransactions.map((t) => (
            <div key={t.id} className="ck-row" data-testid={`card-txn-${t.id}`}>
              <span>
                <strong>{t.merchant}</strong> <span className="ck-muted">· {t.at} · {t.category}</span>
                <div>
                  {t.cashback > 0
                    ? <Badge tone="ok" testId={`cashback-${t.id}`}>{money(t.cashback)} cashback</Badge>
                    : <Badge tone="neutral" testId={`cashback-${t.id}`}>No cashback</Badge>}
                </div>
              </span>
              <span data-testid={`card-amount-${t.id}`}>{money(t.amount)}</span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
