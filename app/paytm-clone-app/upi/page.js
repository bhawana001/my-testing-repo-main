"use client";
// UPI money transfer (20.1). The VPA is resolved to a name before you can send,
// and the note travels with the payment.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, VPA_RE, KNOWN_VPAS, useStore, money, txnId } from "../shared";

export default function UpiPage() {
  const [s, update] = useStore();
  const [vpa, setVpa] = useState("");
  const [resolved, setResolved] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(null);

  function verify() {
    const v = vpa.trim().toLowerCase();
    if (!VPA_RE.test(v)) { setErr("Enter a valid UPI ID, for example name@bank."); setResolved(null); return; }
    if (!KNOWN_VPAS[v]) { setErr("No account found for that UPI ID."); setResolved(null); return; }
    setErr(""); setResolved(KNOWN_VPAS[v]);
  }

  function send() {
    const amt = Number(amount);
    if (!resolved) { setErr("Verify the UPI ID first."); return; }
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    if (amt > s.walletBalance) { setErr(`Wallet balance is only ${money(s.walletBalance)}.`); return; }
    setErr("");
    const id = txnId(s.counter + 1);
    update((st) => {
      st.walletBalance = +(st.walletBalance - amt).toFixed(2);
      st.transactions.unshift({ id, label: `UPI to ${resolved}`, amount: amt, at: "2026-09-15",
                                status: "Success", note, vpa: vpa.trim() });
      st.counter += 1;
      return st;
    });
    setSent({ id, to: resolved, amt, note, vpa: vpa.trim() });
  }

  if (sent) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }]} />
        <Page>
          <Banner tone="ok" title="Payment successful" testId="upi-success">
            Sent <strong data-testid="sent-amount">{money(sent.amt)}</strong> to <strong data-testid="sent-to">{sent.to}</strong>.
          </Banner>
          <Card title="Receipt" testId="upi-receipt">
            <Row label="Transaction ID" value={sent.id} testId="txn-id" />
            <Row label="To" value={`${sent.to} · ${sent.vpa}`} testId="receipt-vpa" />
            <Row label="Amount" value={money(sent.amt)} strong testId="receipt-amount" />
            {sent.note && <Row label="Note" value={sent.note} testId="receipt-note" />}
            <Badge tone="ok">Success</Badge>
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/wallet`, label: "Wallet" }]} />
      <Page title="Send money via UPI">
        <Card>
          <Field label="UPI ID" error={err} hint="Try tom@okhdfb">
            <Input value={vpa} onChange={(e) => { setVpa(e.target.value); setResolved(null); }}
                   aria-label="UPI ID" data-testid="vpa" />
          </Field>
          <Btn variant="secondary" size="sm" onClick={verify} data-testid="verify-vpa">Verify</Btn>
          {resolved && <Badge tone="ok" testId="resolved-name">Paying {resolved}</Badge>}
          <Field label="Amount">
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                   aria-label="Amount" data-testid="amount" />
          </Field>
          <Field label="Note">
            <Input value={note} onChange={(e) => setNote(e.target.value)} aria-label="Note" data-testid="note"
                   placeholder="Dinner split" />
          </Field>
          <Row label="Wallet balance" value={money(s.walletBalance)} testId="wallet-balance" />
          <Btn block onClick={send} data-testid="send-money">Send</Btn>
        </Card>
      </Page>
    </Shell>
  );
}
