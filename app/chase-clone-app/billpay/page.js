"use client";
// Bill pay scheduling (23.3): a future-dated payment is listed as scheduled
// with its date rather than debiting immediately.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Field, Input, Select, Badge, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, PAYEES, useStore, money, ref } from "../shared";

export default function BillPayPage() {
  const [s, update] = useStore();
  const [payee, setPayee] = useState(PAYEES[0].id);
  const [from, setFrom] = useState("chk");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-10-01");
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState(null);

  function schedule() {
    const amt = Number(amount);
    if (!amt || amt <= 0) { setErr("Enter an amount greater than zero."); return; }
    if (date <= "2026-09-15") { setErr("Choose a date in the future to schedule a payment."); return; }
    setErr("");
    const id = ref("BP-", s.counter + 1);
    const p = PAYEES.find((x) => x.id === payee);
    const acct = s.accounts.find((a) => a.id === from);
    update((st) => {
      st.scheduledPayments.unshift({ id, payee: p.name, payeeAccount: p.account, amount: amt,
                                     date, from: acct.name, status: "Scheduled" });
      st.counter += 1;
      return st;
    });
    setNotice(`Payment ${id} scheduled for ${date}.`);
    setAmount("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: `${BASE}/dashboard`, label: "Accounts" }]} />
      <Page title="Pay bills">
        {notice && <Banner tone="ok" testId="schedule-notice" onClose={() => setNotice(null)}>{notice}</Banner>}
        <div className="ck-split">
          <Card title="Schedule a payment">
            <Field label="Payee">
              <Select value={payee} onChange={(e) => setPayee(e.target.value)} aria-label="Payee" data-testid="payee">
                {PAYEES.map((p) => <option key={p.id} value={p.id}>{p.name} {p.account}</option>)}
              </Select>
            </Field>
            <Field label="Pay from">
              <Select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Pay from" data-testid="from-account">
                {s.accounts.filter((a) => a.type !== "credit").map((a) => (
                  <option key={a.id} value={a.id}>{a.name} {a.mask}</option>
                ))}
              </Select>
            </Field>
            <Field label="Amount" error={err}>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                     aria-label="Amount" data-testid="amount" />
            </Field>
            <Field label="Send on" hint="Future dates are scheduled, not sent today">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Send on" data-testid="send-date" />
            </Field>
            <Btn block onClick={schedule} data-testid="schedule-payment">Schedule payment</Btn>
          </Card>

          <Card title={`Scheduled payments (${s.scheduledPayments.length})`} testId="scheduled-list">
            {s.scheduledPayments.length === 0 ? <Empty>Nothing scheduled.</Empty> : s.scheduledPayments.map((p) => (
              <div key={p.id} data-testid={`scheduled-${p.id}`}>
                <Row label={`${p.payee} ${p.payeeAccount}`} value={money(p.amount)} />
                <div className="ck-muted" data-testid={`scheduled-date-${p.id}`}>Send on {p.date} from {p.from}</div>
                <Badge tone="warn" testId={`scheduled-status-${p.id}`}>{p.status}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
