"use client";
// Send money P2P with a note (10.3) and currency conversion display (10.5).
// Sending abroad shows the rate and the converted amount before you confirm.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Radio, Badge, Field, Input, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, CONTACTS, ACCOUNT, convert, useStore, money, nextTx } from "../shared";

const SYM = { USD: "$", INR: "₹", EUR: "€" };

export default function SendPage() {
  const [s, update] = useStore();
  const [to, setTo] = useState(CONTACTS[0].id);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [review, setReview] = useState(false);
  const [sent, setSent] = useState(null);

  const contact = CONTACTS.find((c) => c.id === to);
  const amt = Number(amount) || 0;
  const international = contact.currency !== "USD";
  const fx = international ? convert(amt, contact.currency) : null;

  function next() {
    if (!amt || amt <= 0) { setErr("Enter an amount greater than zero."); return; }
    if (amt > ACCOUNT.balance) { setErr(`That's more than your balance of ${money(ACCOUNT.balance)}.`); return; }
    setErr("");
    setReview(true);
  }

  function send() {
    const id = nextTx(s.counter);
    const tx = { id, type: "sent", counterparty: contact.name, amount: -amt, currency: "USD",
                 at: "2026-09-15", status: "Completed", disputable: false, note,
                 fx: fx ? { rate: fx.rate, converted: fx.converted, currency: contact.currency, fee: fx.fee } : null };
    update((st) => { st.activity.unshift(tx); st.counter += 1; return st; });
    setSent(tx);
    setReview(false);
  }

  if (sent) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Wallet" }, { href: `${BASE}/activity`, label: "Activity" }]} />
        <Page>
          <Banner tone="ok" title="Money sent" testId="send-confirmation">
            You sent <strong data-testid="sent-amount">{money(Math.abs(sent.amount))}</strong> to <strong data-testid="sent-to">{sent.counterparty}</strong>.
          </Banner>
          <Card title="Details" testId="send-receipt">
            <Row label="Transaction" value={sent.id} testId="send-tx-id" />
            <Row label="Recipient" value={sent.counterparty} />
            {sent.note && <Row label="Note" value={sent.note} testId="send-note" />}
            {sent.fx && (
              <>
                <Row label="Exchange rate" value={`1 USD = ${sent.fx.rate} ${sent.fx.currency}`} testId="receipt-rate" />
                <Row label="They receive" value={`${SYM[sent.fx.currency]}${sent.fx.converted.toFixed(2)}`} testId="receipt-converted" />
              </>
            )}
            <Badge tone="ok">{sent.status}</Badge>
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Wallet" }, { href: `${BASE}/activity`, label: "Activity" }]} />
      <Page title="Send money">
        <div className="ck-split">
          <Card title="To" testId="contacts">
            {CONTACTS.map((c) => (
              <Radio key={c.id} name="to" label={c.name} detail={`${c.email} · ${c.country} · receives ${c.currency}`}
                     testId={`contact-${c.id}`} checked={to === c.id} onChange={() => { setTo(c.id); setReview(false); }} />
            ))}
          </Card>

          <Card title="Amount">
            <Field label="You send (USD)" error={err}>
              <Input value={amount} onChange={(e) => { setAmount(e.target.value); setReview(false); }}
                     inputMode="decimal" aria-label="Amount" data-testid="amount" />
            </Field>
            <Field label="Add a note">
              <Input value={note} onChange={(e) => setNote(e.target.value)} aria-label="Note" data-testid="note"
                     placeholder="Dinner on Friday" />
            </Field>

            {international && amt > 0 && (
              <div data-testid="fx-panel">
                <Badge tone="info" testId="fx-badge">Currency conversion applies</Badge>
                <Row label="Mid-market rate" value={`1 USD = ${fx.mid} ${contact.currency}`} testId="fx-mid" />
                <Row label="PayPaal rate" value={`1 USD = ${fx.rate} ${contact.currency}`} testId="fx-rate" />
                <Row label="Currency spread" value={`${fx.spreadPct.toFixed(1)}%`} testId="fx-spread" />
                <Row label="Fee" value={money(fx.fee)} testId="fx-fee" />
                <Row label={`${contact.name} receives`}
                     value={`${SYM[contact.currency]}${fx.converted.toFixed(2)}`} strong testId="fx-converted" />
              </div>
            )}

            {!review ? (
              <Btn block onClick={next} data-testid="review-send">Review and send</Btn>
            ) : (
              <div data-testid="review-panel">
                <Row label="Sending" value={money(amt)} testId="review-amount" />
                <Row label="To" value={contact.name} testId="review-to" />
                {international && <Row label="They receive" value={`${SYM[contact.currency]}${fx.converted.toFixed(2)}`} testId="review-converted" />}
                <Btn block onClick={send} data-testid="confirm-send">Send now</Btn>
              </div>
            )}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
