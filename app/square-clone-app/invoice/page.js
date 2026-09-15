"use client";
// Invoice pay flow (12.2). Opening the emailed invoice and paying flips its
// status to paid, which is the assertion.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money, nextPayId } from "../shared";

export default function InvoicePage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(null);
  const [card, setCard] = useState("");
  const [err, setErr] = useState("");
  const [paid, setPaid] = useState(null);

  const inv = open ? s.invoices.find((i) => i.id === open) : null;

  function pay() {
    if (card.replace(/\s/g, "").length < 15) { setErr("Enter a valid test card number."); return; }
    setErr("");
    const id = nextPayId(s.counter);
    update((st) => {
      const i = st.invoices.find((x) => x.id === inv.id);
      i.status = "paid";
      i.paidAt = "2026-09-15";
      i.paymentId = id;
      st.payments.unshift({ id, source: `Invoice ${inv.id}`, amount: inv.amount, tip: 0,
                            at: "2026-09-15", status: "Completed",
                            card: "Visa ••••" + card.replace(/\s/g, "").slice(-4), refunded: 0 });
      st.counter += 1;
      return st;
    });
    setPaid(id);
  }

  if (inv) {
    const current = s.invoices.find((i) => i.id === inv.id);
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }]} />
        <Page title={`Invoice ${current.id}`} sub={`From Squair Seller · issued ${current.issued}`}>
          <Btn variant="ghost" onClick={() => { setOpen(null); setPaid(null); setErr(""); }} data-testid="back">← All invoices</Btn>
          {paid && (
            <Banner tone="ok" title="Invoice paid" testId="invoice-paid">
              Payment <strong data-testid="invoice-payment-id">{paid}</strong> received. Thank you.
            </Banner>
          )}
          <Card testId="invoice-detail">
            <Row label="Billed to" value={`${current.customer} · ${current.email}`} testId="invoice-customer" />
            {current.lines.map((l, i) => <Row key={i} label={l.label} value={money(l.amount)} />)}
            <Row label="Amount due" value={money(current.amount)} strong testId="invoice-amount" />
            <Row label="Due date" value={current.due} testId="invoice-due" />
            <Badge tone={current.status === "paid" ? "ok" : "warn"} testId="invoice-status">{current.status}</Badge>
          </Card>

          {current.status === "unpaid" && (
            <Card title="Pay this invoice">
              <Field label="Card number" error={err} hint="Test card 4242 4242 4242 4242">
                <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                       aria-label="Card number" data-testid="invoice-card" />
              </Field>
              <Btn block onClick={pay} data-testid="pay-invoice">Pay {money(current.amount)}</Btn>
            </Card>
          )}
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/dashboard`, label: "Dashboard" }]} />
      <Page title="Invoices" wide>
        <Card testId="invoice-list">
          {s.invoices.length === 0 ? <Empty>No invoices.</Empty> : s.invoices.map((i) => (
            <div key={i.id} className="ck-row" data-testid={`invoice-${i.id}`}>
              <span>
                <strong>{i.id}</strong> <span className="ck-muted">· {i.customer} · due {i.due}</span>
              </span>
              <span>
                {money(i.amount)}{" "}
                <Badge tone={i.status === "paid" ? "ok" : "warn"} testId={`status-${i.id}`}>{i.status}</Badge>{" "}
                <Btn size="sm" variant="secondary" onClick={() => setOpen(i.id)} data-testid={`open-${i.id}`}>Open</Btn>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
