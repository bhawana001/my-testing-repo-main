"use client";
// Payment link (11.4). Once paid the link shows a paid state and refuses a
// second payment, which is the "cannot be reused" assertion.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money, newPayId } from "../shared";

export default function LinkPage() {
  const [s, update] = useStore();
  const [card, setCard] = useState("");
  const [err, setErr] = useState("");
  const link = s.link;

  function pay() {
    if (link.status === "paid") { setErr("This payment link has already been paid."); return; }
    if (card.replace(/\s/g, "").length < 15) { setErr("Enter a valid test card number."); return; }
    setErr("");
    const id = newPayId(s.counter);
    update((st) => {
      st.link.status = "paid";
      st.link.paidAt = "2026-09-15";
      st.link.paymentId = id;
      st.payments.unshift({ id, orderId: st.link.id, label: st.link.label, amount: st.link.amount,
                            method: "card", at: "2026-09-15", status: "captured" });
      st.counter += 1;
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Merchant" }]} />
      <Page title="Payment link" sub={link.id}>
        <Card testId="payment-link">
          <div className="ck-muted">{link.label}</div>
          <div style={{ fontSize: 30, fontWeight: 700, margin: "8px 0" }} data-testid="link-amount">{money(link.amount)}</div>
          <Badge tone={link.status === "paid" ? "ok" : "warn"} testId="link-status">
            {link.status === "paid" ? "Paid" : "Awaiting payment"}
          </Badge>

          {link.status === "paid" ? (
            <div style={{ marginTop: 12 }} data-testid="link-paid">
              <Banner tone="ok" title="This link has been paid">
                Payment <strong data-testid="link-payment-id">{link.paymentId}</strong> on {link.paidAt}.
              </Banner>
              <Row label="Amount paid" value={money(link.amount)} strong testId="link-paid-amount" />
              <Btn block disabled data-testid="link-pay-disabled">Link already paid</Btn>
              <p className="ck-muted">A payment link can only be used once.</p>
            </div>
          ) : (
            <div style={{ marginTop: 12 }}>
              <Field label="Card number" error={err} hint="Test card 4111 1111 1111 1111">
                <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                       aria-label="Card number" data-testid="link-card" />
              </Field>
              <Btn block onClick={pay} data-testid="link-pay">Pay {money(link.amount)}</Btn>
            </div>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
