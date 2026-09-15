"use client";
// Merchant dashboard (9.5): the payments list is the same record set checkout
// writes, so the newest payment really is the one just made.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty, Input, Field } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "../shared";

export default function DashboardPage() {
  const [s] = useStore();
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState("");

  const rows = s.payments.filter((p) =>
    !q.trim() || [p.id, p.customer, p.description, String(p.amount)].join(" ").toLowerCase().includes(q.trim().toLowerCase())
  );
  const payment = open ? s.payments.find((p) => p.id === open) : null;

  if (payment) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Merchant" }, { href: `${BASE}/portal`, label: "Billing portal" }]} />
        <Page title="Payment detail">
          <Btn variant="ghost" onClick={() => setOpen(null)} data-testid="back-to-list">← All payments</Btn>
          <Card testId="payment-detail">
            <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="detail-amount">{money(payment.amount)}</div>
            <Badge tone={payment.status === "succeeded" ? "ok" : "bad"} testId="detail-status">{payment.status}</Badge>
            <Row label="Payment ID" value={payment.id} testId="detail-id" />
            <Row label="Description" value={payment.description} testId="detail-description" />
            <Row label="Customer" value={payment.customer} testId="detail-customer" />
            <Row label="Payment method" value={payment.card} testId="detail-card" />
            <Row label="Created" value={payment.at} testId="detail-at" />
            {payment.threeDS && <Badge tone="info" testId="detail-3ds">Authenticated with 3D Secure</Badge>}
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Merchant" }, { href: `${BASE}/portal`, label: "Billing portal" }]} />
      <Page title="Payments" sub={`${s.payments.length} payments`} wide>
        <Card>
          <Field label="Search payments">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Amount, customer or payment id"
                   aria-label="Search payments" data-testid="search-payments" />
          </Field>
        </Card>
        <Card testId="payments-list">
          {rows.length === 0 ? <Empty>No payments match that search.</Empty> : (
            <table className="ck-table">
              <thead><tr><th>Amount</th><th>Status</th><th>Description</th><th>Customer</th><th>Created</th><th /></tr></thead>
              <tbody>
                {rows.map((p, i) => (
                  <tr key={p.id} data-testid={`payment-row-${i}`}>
                    <td className="ck-strong" data-testid={`row-amount-${i}`}>{money(p.amount)}</td>
                    <td><Badge tone={p.status === "succeeded" ? "ok" : "bad"} testId={`row-status-${i}`}>{p.status}</Badge></td>
                    <td>{p.description}</td>
                    <td>{p.customer}</td>
                    <td>{p.at}</td>
                    <td><Btn size="sm" variant="secondary" onClick={() => setOpen(p.id)} data-testid={`open-payment-${i}`}>Open</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
