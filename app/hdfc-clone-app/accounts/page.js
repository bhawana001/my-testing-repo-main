"use client";
import Link from "next/link";
import { Shell, Page, Card, Row, Badge, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, CUSTOMER, useStore, inr, statementTotals } from "../shared";

export default function Accounts() {
  const [s] = useStore();
  const totals = statementTotals(s.card);

  if (!s.loggedIn) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="Account summary">
          <Empty>
            You are not signed in.{" "}
            <Link href={`${BASE}/login`} data-testid="login-link">Log in to NetBanking</Link>.
          </Empty>
        </Page>
      </Shell>
    );
  }

  const total = s.accounts.reduce((n, a) => n + a.balance, 0);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Account summary" sub={`${CUSTOMER.name} · customer id ${CUSTOMER.id}`} wide>
        <Card title="Deposit accounts" testId="account-summary">
          {s.accounts.map((a) => (
            <div key={a.id} className="ck-row" data-testid={`account-${a.id}`}>
              <span>
                <strong>{a.name}</strong>
                <div className="ck-muted">{a.number} · {a.type}</div>
              </span>
              <span data-testid={`balance-${a.id}`}>{inr(a.balance)}</span>
            </div>
          ))}
          <Row label="Total relationship value" value={inr(total)} strong testId="total-balance" />
        </Card>

        <Card title="Fixed deposits" testId="fd-summary">
          {s.deposits.length === 0 && <Empty>No fixed deposits open.</Empty>}
          {s.deposits.map((d) => (
            <Row key={d.id} label={`${d.id} · ${d.months} months`} value={inr(d.maturityAmount)}
                 testId={`fd-${d.id}`} />
          ))}
        </Card>

        <Card title="Credit card" testId="card-summary">
          <Row label="Card" value={s.card.number} testId="summary-card-number" />
          <Row label="Total due" value={inr(totals.total)} testId="summary-total-due" />
          <Row label="Minimum due" value={inr(totals.minimum)} testId="summary-minimum-due" />
          <Row label="Payment due date" value={s.card.dueDate} testId="summary-due-date" />
        </Card>

        <Card title="Recent transfers" testId="transfer-summary">
          {s.transfers.length === 0 && <Empty>No transfers yet.</Empty>}
          {s.transfers.map((t) => (
            <div key={t.ref} className="ck-row" data-testid={`transfer-${t.ref}`}>
              <span><strong>{t.to}</strong><div className="ck-muted">{t.ref}</div></span>
              <span>{inr(t.amount)} <Badge tone="ok">{t.status}</Badge></span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
