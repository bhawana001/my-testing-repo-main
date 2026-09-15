"use client";
// Dashboard refunds (12.4). A partial refund reduces the payment's net and the
// day's balance, and the payment is marked partially refunded.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Empty, Modal } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "../shared";

export default function DashboardPage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(null);
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState(null);

  const payment = open ? s.payments.find((p) => p.id === open) : null;
  const net = s.payments.reduce((n, p) => n + p.amount + p.tip - p.refunded, 0);

  function refund() {
    const amt = Number(amount);
    const max = +(payment.amount + payment.tip - payment.refunded).toFixed(2);
    if (!amt || amt <= 0) { setErr("Enter a refund amount above zero."); return; }
    if (amt > max) { setErr(`You can refund at most ${money(max)}.`); return; }
    setErr("");
    update((st) => {
      const p = st.payments.find((x) => x.id === payment.id);
      p.refunded = +(p.refunded + amt).toFixed(2);
      p.status = p.refunded >= p.amount + p.tip ? "Refunded" : "Partially refunded";
      return st;
    });
    setNotice(`Refunded ${money(amt)} on ${payment.id}.`);
    setOpen(null);
    setAmount("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/pos`, label: "Web POS" }]} />
      <Page title="Payments" sub="Squair dashboard" wide>
        {notice && <Banner tone="ok" testId="refund-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <Card title="Balance">
          <Row label="Net sales after refunds" value={money(net)} strong testId="net-balance" />
        </Card>

        <Card testId="payments-table">
          {s.payments.length === 0 ? <Empty>No payments.</Empty> : (
            <table className="ck-table">
              <thead><tr><th>Payment</th><th>Source</th><th>Amount</th><th>Tip</th><th>Refunded</th><th>Net</th><th>Status</th><th /></tr></thead>
              <tbody>
                {s.payments.map((p) => (
                  <tr key={p.id} data-testid={`payment-${p.id}`}>
                    <td className="ck-strong">{p.id}</td>
                    <td>{p.source}</td>
                    <td>{money(p.amount)}</td>
                    <td>{money(p.tip)}</td>
                    <td data-testid={`refunded-${p.id}`}>{money(p.refunded)}</td>
                    <td data-testid={`net-${p.id}`}>{money(p.amount + p.tip - p.refunded)}</td>
                    <td><Badge tone={p.refunded > 0 ? "warn" : "ok"} testId={`status-${p.id}`}>{p.status}</Badge></td>
                    <td>
                      <Btn size="sm" variant="secondary" onClick={() => { setOpen(p.id); setErr(""); }} data-testid={`refund-${p.id}`}>
                        Refund
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Modal open={Boolean(payment)} title={`Refund ${payment?.id || ""}`} onClose={() => setOpen(null)} testId="refund-modal"
               actions={<>
                 <Btn variant="secondary" onClick={() => setOpen(null)}>Cancel</Btn>
                 <Btn onClick={refund} data-testid="confirm-refund">Issue refund</Btn>
               </>}>
          {payment && (
            <>
              <Row label="Original amount" value={money(payment.amount + payment.tip)} testId="refund-original" />
              <Row label="Already refunded" value={money(payment.refunded)} />
              <Field label="Refund amount" error={err} hint="Enter less than the total for a partial refund">
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                       aria-label="Refund amount" data-testid="refund-amount" />
              </Field>
            </>
          )}
        </Modal>
      </Page>
    </Shell>
  );
}
