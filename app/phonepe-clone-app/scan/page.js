"use client";
// QR scan to pay (21.1). Scanning resolves the merchant, then you enter an
// amount and confirm with a UPI PIN.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, QR_CODES, useStore, money, txnId } from "../shared";

const PIN = "4321";

export default function ScanPage() {
  const [s, update] = useStore();
  const [scanned, setScanned] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");
  const [stage, setStage] = useState("scan"); // scan | amount | pin
  const [err, setErr] = useState("");
  const [paid, setPaid] = useState(null);

  function scan(qr) {
    setScanned(qr);
    setStage("amount");
    setErr("");
  }

  function toPin() {
    const amt = Number(amount);
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    if (amt > s.balance) { setErr(`Balance is only ${money(s.balance)}.`); return; }
    setErr("");
    setStage("pin");
  }

  function confirm() {
    if (pin !== PIN) { setErr("Incorrect UPI PIN."); return; }
    setErr("");
    const amt = Number(amount);
    const id = txnId(s.counter + 1);
    update((st) => {
      st.balance = +(st.balance - amt).toFixed(2);
      st.transactions.unshift({ id, merchant: scanned.merchant, amount: amt, category: "Food",
                                month: "2026-09", at: "2026-09-15", note });
      st.counter += 1;
      return st;
    });
    setPaid({ id, merchant: scanned.merchant, amt, vpa: scanned.vpa });
  }

  if (paid) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/history`, label: "History" }]} />
        <Page>
          <Banner tone="ok" title="Payment successful" testId="scan-success">
            Paid <strong data-testid="paid-amount">{money(paid.amt)}</strong> to{" "}
            <strong data-testid="paid-merchant">{paid.merchant}</strong>.
          </Banner>
          <Card title="Receipt" testId="scan-receipt">
            <Row label="Transaction ID" value={paid.id} testId="txn-id" />
            <Row label="Paid to" value={`${paid.merchant} · ${paid.vpa}`} testId="receipt-merchant" />
            <Row label="Amount" value={money(paid.amt)} strong testId="receipt-amount" />
            <Badge tone="ok">Success</Badge>
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }]} />
      <Page title="Scan & pay">
        {stage === "scan" && (
          <Card title="Point at a QR code" testId="scanner">
            <p className="ck-muted">Choose a QR code to simulate scanning it.</p>
            {QR_CODES.map((q) => (
              <div key={q.id} className="ck-row" data-testid={`qr-${q.id}`}>
                <span><strong>{q.merchant}</strong><div className="ck-muted">{q.vpa} · {q.city}</div></span>
                <Btn size="sm" onClick={() => scan(q)} data-testid={`scan-${q.id}`}>Scan</Btn>
              </div>
            ))}
          </Card>
        )}

        {stage === "amount" && scanned && (
          <Card title="Enter amount" testId="amount-step">
            <Badge tone="ok" testId="resolved-merchant">Paying {scanned.merchant}</Badge>
            <div className="ck-muted">{scanned.vpa}</div>
            <Field label="Amount" error={err}>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                     aria-label="Amount" data-testid="amount" />
            </Field>
            <Field label="Note (optional)">
              <Input value={note} onChange={(e) => setNote(e.target.value)} aria-label="Note" data-testid="note" />
            </Field>
            <Row label="Available balance" value={money(s.balance)} testId="balance" />
            <Btn block onClick={toPin} data-testid="to-pin">Continue</Btn>
          </Card>
        )}

        {stage === "pin" && (
          <Card title="Enter UPI PIN" testId="pin-step">
            <Row label="Paying" value={`${scanned.merchant} · ${money(Number(amount))}`} testId="pin-summary" />
            <Field label="UPI PIN" error={err} hint="Demo PIN 4321">
              <Input type="password" value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric"
                     maxLength={4} aria-label="UPI PIN" data-testid="upi-pin" />
            </Field>
            <Btn block onClick={confirm} data-testid="confirm-pay">Pay {money(Number(amount) || 0)}</Btn>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
