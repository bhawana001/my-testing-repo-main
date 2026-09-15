"use client";
// Zelly transfer (23.2): sending debits the funding account and produces a
// reference number, which is the assertion.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Field, Input, Select, Radio, Badge, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, ZELLE_CONTACTS, useStore, money, ref } from "../shared";

export default function ZellePage() {
  const [s, update] = useStore();
  const [contact, setContact] = useState(ZELLE_CONTACTS[0].id);
  const [from, setFrom] = useState("chk");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(null);

  const acct = s.accounts.find((a) => a.id === from);
  const who = ZELLE_CONTACTS.find((c) => c.id === contact);

  function send() {
    const amt = Number(amount);
    if (!amt || amt <= 0) { setErr("Enter an amount greater than zero."); return; }
    if (amt > acct.balance) { setErr(`That's more than the ${acct.name} balance of ${money(acct.balance)}.`); return; }
    setErr("");
    const reference = ref("ZL-", s.counter + 1);
    const payment = { id: reference, to: who.name, handle: who.handle, amount: amt, memo,
                      from: acct.name, at: "2026-09-15", status: "Sent" };
    update((st) => {
      const a = st.accounts.find((x) => x.id === from);
      a.balance = +(a.balance - amt).toFixed(2);
      st.zellePayments.unshift(payment);
      st.activity.unshift({ id: "z" + st.counter, accountId: from, date: "2026-09-15",
                            merchant: `Zelly to ${who.name}`, amount: -amt, disputable: false });
      st.counter += 1;
      return st;
    });
    setSent(payment);
  }

  if (sent) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: `${BASE}/dashboard`, label: "Accounts" }]} />
        <Page>
          <Banner tone="ok" title="Money sent" testId="zelle-confirmation">
            You sent <strong data-testid="sent-amount">{money(sent.amount)}</strong> to <strong data-testid="sent-to">{sent.to}</strong>.
          </Banner>
          <Card title="Confirmation" testId="zelle-receipt">
            <Row label="Reference number" value={sent.id} testId="reference-number" />
            <Row label="Recipient" value={`${sent.to} · ${sent.handle}`} />
            <Row label="Amount" value={money(sent.amount)} strong testId="receipt-amount" />
            <Row label="From" value={sent.from} />
            {sent.memo && <Row label="Memo" value={sent.memo} testId="receipt-memo" />}
            <Badge tone="ok" testId="receipt-status">{sent.status}</Badge>
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: `${BASE}/dashboard`, label: "Accounts" }]} />
      <Page title="Send money with Zelly">
        <div className="ck-split">
          <Card title="Choose a recipient" testId="contacts">
            {ZELLE_CONTACTS.map((c) => (
              <Radio key={c.id} name="contact" label={c.name} detail={c.handle} testId={`contact-${c.id}`}
                     checked={contact === c.id} onChange={() => setContact(c.id)} />
            ))}
          </Card>
          <Card title="Amount">
            <Field label="From account">
              <Select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From account" data-testid="from-account">
                {s.accounts.filter((a) => a.type !== "credit").map((a) => (
                  <option key={a.id} value={a.id}>{a.name} {a.mask} — {money(a.balance)}</option>
                ))}
              </Select>
            </Field>
            <Field label="Amount" error={err}>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                     aria-label="Amount" data-testid="amount" />
            </Field>
            <Field label="Memo (optional)">
              <Input value={memo} onChange={(e) => setMemo(e.target.value)} aria-label="Memo" data-testid="memo" />
            </Field>
            <Row label="Sending to" value={who.name} testId="review-recipient" />
            <Btn block onClick={send} data-testid="send-money">Send money</Btn>
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
