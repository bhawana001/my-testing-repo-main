"use client";
// Transfer quote (15.1). The fee splits into its fixed and percentage parts,
// the rate is stated, and the arrival estimate is shown before you commit.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Field, Input, Select, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, quote, useStore, fmt, SYM } from "../shared";

export default function SendPage() {
  const [s, update] = useStore();
  const [amount, setAmount] = useState("500");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [recipient, setRecipient] = useState(s.recipients[0]?.id || "");
  const [created, setCreated] = useState(null);

  const amt = Number(amount) || 0;
  const q = quote(amt, from, to);
  const matching = s.recipients.filter((r) => r.currency === to);

  function createTransfer() {
    const who = s.recipients.find((r) => r.id === recipient);
    if (!who) return;
    const id = "TR-" + (s.counter + 1);
    update((st) => {
      st.transfers.unshift({ id, to: who.name, from, toCurrency: to, sending: amt,
                             converted: q.converted, fee: q.fee, step: 0,
                             createdAt: "2026-09-15", arrival: q.arrival });
      st.counter += 1;
      return st;
    });
    setCreated(id);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/transfers`, label: "Transfers" }]} />
      <Page title="Send money">
        {created && (
          <Banner tone="ok" title="Transfer created" testId="transfer-created">
            Transfer <strong data-testid="new-transfer-id">{created}</strong> is set up.{" "}
            <a href={`${BASE}/transfers`}>Track it</a>.
          </Banner>
        )}

        <div className="ck-split">
          <Card title="Your quote" testId="quote-card">
            <div className="ck-grid ck-grid--2">
              <Field label="You send">
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                       aria-label="You send" data-testid="send-amount" />
              </Field>
              <Field label="From currency">
                <Select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From currency" data-testid="from-currency">
                  {["USD", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}
                </Select>
              </Field>
            </div>
            <Field label="To currency">
              <Select value={to} onChange={(e) => setTo(e.target.value)} aria-label="To currency" data-testid="to-currency">
                {["INR", "EUR", "GBP", "USD"].filter((c) => c !== from).map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>

            <div data-testid="fee-breakdown">
              <Row label={`Fixed fee`} value={fmt(q.fixed, from)} testId="fee-fixed" />
              <Row label={`Variable fee (0.43%)`} value={fmt(q.variable, from)} testId="fee-variable" />
              <Row label="Total fees" value={fmt(q.fee, from)} strong testId="fee-total" />
              <Row label="Amount we'll convert" value={fmt(q.afterFee, from)} testId="amount-converted" />
              <Row label="Guaranteed rate" value={`1 ${from} = ${q.rate} ${to}`} testId="quote-rate" />
              <Row label="Recipient gets" value={fmt(q.converted, to)} strong testId="recipient-gets" />
              <Badge tone="info" testId="arrival-estimate">Should arrive {q.arrival}</Badge>
            </div>
          </Card>

          <Card title="Recipient">
            {matching.length === 0 ? (
              <Empty>
                No saved recipient takes {to}. <a href={`${BASE}/recipients`}>Add one</a>.
              </Empty>
            ) : (
              <>
                <Field label={`Who is receiving ${to}?`}>
                  <Select value={recipient} onChange={(e) => setRecipient(e.target.value)} aria-label="Recipient" data-testid="recipient-select">
                    {matching.map((r) => <option key={r.id} value={r.id}>{r.name} · {r.bank} {r.account}</option>)}
                  </Select>
                </Field>
                <Btn block onClick={createTransfer} data-testid="create-transfer">
                  Set up transfer of {fmt(amt, from)}
                </Btn>
              </>
            )}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
