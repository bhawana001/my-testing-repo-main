"use client";
// Electricity bill (20.3): fetch by consumer number, then pay the fetched
// amount. An unknown consumer number returns no bill.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select } from "../../clones/kit/ui";
import { BRAND, BASE, BOARDS, BILLS, useStore, money, txnId } from "../shared";

export default function BillsPage() {
  const [s, update] = useStore();
  const [board, setBoard] = useState(BOARDS[0]);
  const [consumer, setConsumer] = useState("");
  const [bill, setBill] = useState(null);
  const [err, setErr] = useState("");
  const [paid, setPaid] = useState(null);

  function fetchBill() {
    const found = BILLS[consumer.trim()];
    if (!found) { setErr("No bill found for that consumer number."); setBill(null); return; }
    setErr(""); setBill({ ...found, consumer: consumer.trim(), board });
  }

  function pay() {
    if (bill.amount > s.walletBalance) { setErr(`Wallet balance is only ${money(s.walletBalance)}.`); return; }
    setErr("");
    const id = txnId(s.counter + 1);
    update((st) => {
      st.walletBalance = +(st.walletBalance - bill.amount).toFixed(2);
      st.transactions.unshift({ id, label: `${bill.board} bill · ${bill.consumer}`, amount: bill.amount,
                                at: "2026-09-15", status: "Success" });
      st.counter += 1;
      return st;
    });
    setPaid({ id, ...bill });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/recharge`, label: "Recharge" }]} />
      <Page title="Electricity bill payment">
        {paid && (
          <Banner tone="ok" title="Bill paid" testId="bill-paid">
            Paid <strong data-testid="paid-amount">{money(paid.amount)}</strong> to {paid.board} for consumer{" "}
            <strong data-testid="paid-consumer">{paid.consumer}</strong>. Transaction <span data-testid="txn-id">{paid.id}</span>.
          </Banner>
        )}

        <Card title="Fetch your bill">
          <Field label="Electricity board">
            <Select value={board} onChange={(e) => setBoard(e.target.value)} aria-label="Electricity board" data-testid="board">
              {BOARDS.map((b) => <option key={b}>{b}</option>)}
            </Select>
          </Field>
          <Field label="Consumer number" error={err} hint="Try 100200300">
            <Input value={consumer} onChange={(e) => { setConsumer(e.target.value); setBill(null); }}
                   inputMode="numeric" aria-label="Consumer number" data-testid="consumer-number" />
          </Field>
          <Btn onClick={fetchBill} data-testid="fetch-bill">Fetch bill</Btn>
        </Card>

        {bill && !paid && (
          <Card title="Bill details" testId="bill-details">
            <Row label="Consumer name" value={bill.name} testId="bill-name" />
            <Row label="Billing period" value={bill.period} testId="bill-period" />
            <Row label="Units consumed" value={String(bill.units)} testId="bill-units" />
            <Row label="Due date" value={bill.due} testId="bill-due" />
            <Row label="Amount due" value={money(bill.amount)} strong testId="bill-amount" />
            <Btn block onClick={pay} data-testid="pay-bill">Pay {money(bill.amount)}</Btn>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
