"use client";
// Wallet to bank transfer (20.4). A fee applies, the wallet drops by the full
// amount and the bank receives the amount minus the fee.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money, txnId } from "../shared";

const FEE_PCT = 0.02;
const MIN_TRANSFER = 100;

export default function WalletPage() {
  const [s, update] = useStore();
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const amt = Number(amount) || 0;
  const fee = +(amt * FEE_PCT).toFixed(2);
  const credited = +(amt - fee).toFixed(2);

  function transfer() {
    if (!amt || amt < MIN_TRANSFER) { setErr(`Minimum transfer is ${money(MIN_TRANSFER)}.`); return; }
    if (amt > s.walletBalance) { setErr(`Wallet balance is only ${money(s.walletBalance)}.`); return; }
    setErr("");
    const id = txnId(s.counter + 1);
    const before = s.walletBalance;
    update((st) => {
      st.walletBalance = +(st.walletBalance - amt).toFixed(2);
      st.transactions.unshift({ id, label: `Wallet to ${st.bankAccount}`, amount: amt,
                                at: "2026-09-15", status: "Success" });
      st.counter += 1;
      return st;
    });
    setDone({ id, amt, fee, credited, before, after: +(before - amt).toFixed(2) });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/upi`, label: "UPI" }]} />
      <Page title="Wallet to bank">
        {done && (
          <Banner tone="ok" title="Transfer initiated" testId="transfer-done">
            <strong data-testid="credited-amount">{money(done.credited)}</strong> will reach {s.bankAccount} after a fee of{" "}
            <strong data-testid="fee-amount">{money(done.fee)}</strong>. Wallet is now{" "}
            <strong data-testid="new-balance">{money(done.after)}</strong>.
          </Banner>
        )}

        <Card title="Paytem Wallet" testId="wallet-card">
          <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="wallet-balance">{money(s.walletBalance)}</div>
          <Row label="Linked bank" value={s.bankAccount} testId="linked-bank" />
        </Card>

        <Card title="Transfer to bank">
          <Field label="Amount" error={err} hint={`Minimum ${money(MIN_TRANSFER)} · 2% fee applies`}>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                   aria-label="Amount" data-testid="transfer-amount" />
          </Field>
          <Row label="Transfer fee (2%)" value={money(fee)} testId="preview-fee" />
          <Row label="Credited to bank" value={money(credited)} strong testId="preview-credited" />
          <Btn block onClick={transfer} data-testid="do-transfer">Transfer to bank</Btn>
        </Card>

        <Card title="History" testId="history">
          {s.transactions.length === 0 ? <Empty>No transactions.</Empty> : s.transactions.map((t) => (
            <Row key={t.id} label={`${t.label} · ${t.at}`} value={money(t.amount)} testId={`history-${t.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
