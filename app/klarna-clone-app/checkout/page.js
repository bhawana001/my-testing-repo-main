"use client";
// Pay in 4 (14.1) and the declined credit decision path (14.2). The schedule is
// shown before you confirm, and a decline returns you to the merchant's other
// payment options rather than dead-ending.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Radio } from "../../clones/kit/ui";
import { BRAND, BASE, CART, cartTotal, scheduleFor, DECLINE_CODE, useStore, money } from "../shared";

export default function CheckoutPage() {
  const [s, update] = useStore();
  const [method, setMethod] = useState("klarna");
  const [name, setName] = useState("");
  const [last4, setLast4] = useState("");
  const [dob, setDob] = useState("");
  const [err, setErr] = useState("");
  const [stage, setStage] = useState("form"); // form | schedule | declined | done
  const total = cartTotal();
  const schedule = scheduleFor(total);

  function assess() {
    if (!name.trim()) { setErr("Enter your full name."); return; }
    if (!/^\d{4}$/.test(last4)) { setErr("Enter the last four digits of your ID number."); return; }
    setErr("");
    if (last4 === DECLINE_CODE) { setStage("declined"); return; }
    setStage("schedule");
  }

  function confirm() {
    const id = "KL-" + (s.counter + 1);
    update((st) => {
      st.order = { id, merchant: CART.merchant, total, items: CART.items.map((i) => ({ ...i })),
                   schedule: scheduleFor(total), placedAt: "2026-09-15" };
      st.counter += 1;
      return st;
    });
    setStage("done");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Store" }, { href: `${BASE}/app`, label: "Klarnah app" }]} />
      <Page title="Checkout" sub={`${CART.merchant} · ${money(total)}`}>
        {stage === "form" && (
          <div className="ck-split">
            <Card title="How do you want to pay?" testId="methods">
              <Radio name="m" label="Pay in 4 with Klarnah" detail="4 interest-free payments, every 2 weeks"
                     testId="method-klarna" checked={method === "klarna"} onChange={() => setMethod("klarna")} />
              <Radio name="m" label="Card" detail="Pay the full amount now"
                     testId="method-card" checked={method === "card"} onChange={() => setMethod("card")} />
            </Card>
            <Card title="Klarnah — quick check">
              <Field label="Full name" error={err}>
                <Input value={name} onChange={(e) => setName(e.target.value)} aria-label="Full name" data-testid="kl-name" />
              </Field>
              <Field label="Last 4 of ID number" hint="Use 0000 to see a declined decision">
                <Input value={last4} onChange={(e) => setLast4(e.target.value)} inputMode="numeric" maxLength={4}
                       aria-label="Last 4 of ID number" data-testid="kl-last4" />
              </Field>
              <Field label="Date of birth">
                <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} aria-label="Date of birth" data-testid="kl-dob" />
              </Field>
              <Btn block disabled={method !== "klarna"} onClick={assess} data-testid="kl-continue">Continue with Klarnah</Btn>
            </Card>
          </div>
        )}

        {stage === "schedule" && (
          <Card title="Your payment schedule" testId="schedule-preview">
            <Badge tone="ok" testId="approved-badge">Approved — 4 interest-free payments</Badge>
            <table className="ck-table">
              <thead><tr><th>Payment</th><th>Due</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {schedule.map((p) => (
                  <tr key={p.n} data-testid={`preview-instalment-${p.n}`}>
                    <td>Payment {p.n} of 4</td>
                    <td data-testid={`preview-date-${p.n}`}>{p.date}</td>
                    <td className="ck-strong" data-testid={`preview-amount-${p.n}`}>{money(p.amount)}</td>
                    <td>{p.n === 1 ? "Due today" : "Scheduled"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row label="Total" value={money(total)} strong testId="preview-total" />
            <Row label="Interest" value={money(0)} testId="preview-interest" />
            <Btn block onClick={confirm} data-testid="confirm-klarna">Confirm and pay {money(schedule[0].amount)} today</Btn>
          </Card>
        )}

        {stage === "declined" && (
          <>
            <Banner tone="bad" title="Klarnah can't approve this purchase" testId="credit-declined">
              This decision is based on a soft credit check and doesn't affect your credit score.
            </Banner>
            <Card title="Other ways to pay" testId="fallback-options">
              <p className="ck-muted">You can still complete this order with another payment method.</p>
              <Radio name="fb" label="Card" detail="Pay the full amount now" testId="fallback-card"
                     checked={method === "card"} onChange={() => setMethod("card")} />
              <Radio name="fb" label="Bank transfer" detail="Pay from your bank account" testId="fallback-bank"
                     checked={method === "bank"} onChange={() => setMethod("bank")} />
              <Btn block onClick={() => setStage("form")} data-testid="back-to-payment">Back to payment options</Btn>
            </Card>
          </>
        )}

        {stage === "done" && s.order && (
          <>
            <Banner tone="ok" title="Order placed" testId="order-placed">
              Order <strong data-testid="order-id">{s.order.id}</strong> confirmed with Pay in 4.
            </Banner>
            <Btn as="link" href={`${BASE}/app`} data-testid="open-app">Open it in the Klarnah app</Btn>
          </>
        )}
      </Page>
    </Shell>
  );
}
