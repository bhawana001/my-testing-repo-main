"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Badge, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore, inr, statementTotals } from "../shared";

export default function Cards() {
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);
  const card = s.card;
  const totals = statementTotals(card);
  const used = totals.total;
  const available = card.creditLimit - used;

  function pay(amount, label) {
    update((st) => {
      st.card.payments += amount;
      st.accounts.find((a) => a.id === "sav").balance -= amount;
      return st;
    });
    setNotice({ tone: "ok", msg: `${label} of ${inr(amount)} paid from your savings account.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Credit card statement" sub={`Statement dated ${card.statementDate}`} wide>
        {notice && <Banner tone={notice.tone} testId="card-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Statement summary" testId="statement-summary">
          <Row label="Card number" value={card.number} testId="card-number" />
          <Row label="Card holder" value={card.holder} />
          <Row label="Statement date" value={card.statementDate} testId="statement-date" />
          <Row label="Payment due date" value={card.dueDate} testId="due-date" />
          <Row label="Previous balance" value={inr(card.previousBalance)} testId="previous-balance" />
          <Row label="Payments received" value={`− ${inr(card.payments)}`} testId="payments-received" />
          <Row label="Purchases" value={inr(card.purchases)} testId="purchases" />
          <Row label="Total amount due" value={inr(totals.total)} strong testId="total-due" />
          <Row label="Minimum amount due" value={inr(totals.minimum)} strong testId="minimum-due" />
          <Row label="Credit limit" value={inr(card.creditLimit)} testId="credit-limit" />
          <Row label="Available credit" value={inr(available)} testId="available-credit" />
          <Badge tone={totals.total > 0 ? "warn" : "ok"} testId="statement-state">
            {totals.total > 0 ? `Due by ${card.dueDate}` : "Nothing due"}
          </Badge>
          <div className="ck-card-actions">
            <Btn data-testid="pay-total" disabled={totals.total <= 0}
                 onClick={() => pay(totals.total, "Total amount due")}>
              Pay {inr(totals.total)}
            </Btn>
            <Btn variant="secondary" data-testid="pay-minimum" disabled={totals.total <= 0}
                 onClick={() => pay(totals.minimum, "Minimum amount due")}>
              Pay minimum {inr(totals.minimum)}
            </Btn>
          </div>
        </Card>

        <Card title="Transactions in this statement" testId="card-transactions">
          <table className="ck-table">
            <thead><tr><th>Date</th><th>Detail</th><th>Amount</th></tr></thead>
            <tbody>
              {card.transactions.map((t, i) => (
                <tr key={i} data-testid={`txn-${i}`}>
                  <td>{t.at}</td>
                  <td data-testid={`txn-detail-${i}`}>{t.detail}</td>
                  <td data-testid={`txn-amount-${i}`}>{inr(t.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Row label="Sum of transactions"
               value={inr(card.transactions.reduce((n, t) => n + t.amount, 0))} testId="txn-sum" />
        </Card>
      </Page>
    </Shell>
  );
}
