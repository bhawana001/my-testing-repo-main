"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import {
  BRAND, BASE, COOLING_MINUTES, OTP, useStore, inr, refNumber, beneficiaryReady,
} from "../shared";

export default function Transfer() {
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("HFBK0000412");
  const [fromId, setFromId] = useState("sav");
  const [payeeId, setPayeeId] = useState("b1");
  const [amount, setAmount] = useState("2500");
  const [otp, setOtp] = useState("");
  const [notice, setNotice] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const payee = s.beneficiaries.find((b) => b.id === payeeId) || null;
  const ready = payee ? beneficiaryReady(payee) : false;

  function addBeneficiary() {
    if (!name.trim() || account.trim().length < 8) {
      setNotice({ tone: "bad", msg: "A beneficiary needs a name and a full account number." });
      return;
    }
    const id = `b${s.counter}`;
    update((st) => {
      st.beneficiaries.push({
        id, name: name.trim(), account: account.trim(), ifsc: ifsc.trim(),
        status: "Cooling period", addedAgo: 0,
      });
      st.counter += 1;
      return st;
    });
    setPayeeId(id);
    setName(""); setAccount("");
    setNotice({
      tone: "warn",
      msg: `Beneficiary added. It cannot be paid for ${COOLING_MINUTES} minutes — that is the cooling period.`,
    });
  }

  /** Test affordance: jump the clock so the cooling period can be exercised. */
  function elapseCooling() {
    update((st) => {
      for (const b of st.beneficiaries) {
        if (b.status === "Cooling period") { b.addedAgo = COOLING_MINUTES; b.status = "Active"; }
      }
      return st;
    });
    setNotice({ tone: "ok", msg: `${COOLING_MINUTES} minutes simulated — the beneficiary is now active.` });
  }

  function send() {
    if (!payee) { setNotice({ tone: "bad", msg: "Pick a beneficiary." }); return; }
    if (!ready) {
      setNotice({ tone: "bad", msg: `${payee.name} is still in the cooling period and cannot be paid yet.` });
      return;
    }
    const value = Number(amount);
    const from = s.accounts.find((a) => a.id === fromId);
    if (!value || value <= 0) { setNotice({ tone: "bad", msg: "Enter an amount." }); return; }
    if (value > from.balance) { setNotice({ tone: "bad", msg: "Insufficient balance in the selected account." }); return; }
    if (otp.trim() !== OTP) { setNotice({ tone: "bad", msg: `Enter the OTP to authorise. Test OTP: ${OTP}` }); return; }

    // Built from the state we hold so the receipt below can show the reference.
    const record = {
      ref: refNumber(s.transfers.length), to: payee.name, account: payee.account, ifsc: payee.ifsc,
      amount: value, from: from.name, mode: "IMPS", status: "Success", at: "now",
    };
    update((st) => {
      st.accounts.find((a) => a.id === fromId).balance -= value;
      st.transfers.unshift(record);
      return st;
    });
    setOtp("");
    setNotice(null);
    setReceipt(record);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Fund transfer" sub="IMPS — instant, any time" wide>
        {notice && <Banner tone={notice.tone} testId="transfer-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        {receipt && (
          <Card title="Transfer successful" tone="ok" testId="transfer-receipt">
            <Row label="Reference number" value={receipt.ref} testId="reference-number" />
            <Row label="Beneficiary" value={receipt.to} testId="receipt-payee" />
            <Row label="Account" value={receipt.account} />
            <Row label="Amount" value={inr(receipt.amount)} testId="receipt-amount" />
            <Row label="Mode" value={receipt.mode} testId="receipt-mode" />
            <Badge tone="ok" testId="receipt-status">{receipt.status}</Badge>
            <div className="ck-card-actions">
              <Link href={`${BASE}/accounts`} className="ck-btn ck-btn--secondary" data-testid="back-to-summary">
                Back to summary
              </Link>
            </div>
          </Card>
        )}

        <Card title="Add a beneficiary">
          <Field label="Name">
            <Input value={name} placeholder="Tom Alvarez" data-testid="beneficiary-name" aria-label="Beneficiary name"
                   onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Account number">
            <Input value={account} placeholder="50100338817001" data-testid="beneficiary-account"
                   aria-label="Account number" onChange={(e) => setAccount(e.target.value)} />
          </Field>
          <Field label="IFSC">
            <Input value={ifsc} data-testid="beneficiary-ifsc" aria-label="IFSC"
                   onChange={(e) => setIfsc(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={addBeneficiary} data-testid="add-beneficiary">Add beneficiary</Btn>
            <Btn variant="secondary" onClick={elapseCooling} data-testid="elapse-cooling">
              Simulate the {COOLING_MINUTES} minute cooling period
            </Btn>
          </div>
        </Card>

        <Card title="Beneficiaries" testId="beneficiary-list">
          {s.beneficiaries.length === 0 && <Empty>No beneficiaries.</Empty>}
          {s.beneficiaries.map((b) => (
            <div key={b.id} className="ck-row" data-testid={`beneficiary-${b.id}`}>
              <span>
                <strong>{b.name}</strong>
                <div className="ck-muted">{b.account} · {b.ifsc}</div>
              </span>
              <Badge tone={beneficiaryReady(b) ? "ok" : "warn"} testId={`beneficiary-status-${b.id}`}>
                {beneficiaryReady(b) ? "Active" : "Cooling period"}
              </Badge>
            </div>
          ))}
        </Card>

        <Card title="Send money">
          <Field label="From account">
            <Select value={fromId} data-testid="from-account" aria-label="From account"
                    onChange={(e) => setFromId(e.target.value)}>
              {s.accounts.map((a) => (
                <option key={a.id} value={a.id}>{a.name} — {inr(a.balance)}</option>
              ))}
            </Select>
          </Field>
          <Field label="Beneficiary">
            <Select value={payeeId} data-testid="to-beneficiary" aria-label="Beneficiary"
                    onChange={(e) => setPayeeId(e.target.value)}>
              {s.beneficiaries.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} {beneficiaryReady(b) ? "" : "(cooling period)"}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Amount">
            <Input value={amount} data-testid="amount" aria-label="Amount" onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <Field label="OTP" hint={`Test OTP: ${OTP}`}>
            <Input value={otp} data-testid="transfer-otp" aria-label="OTP" onChange={(e) => setOtp(e.target.value)} />
          </Field>
          <Row label="Beneficiary state" value={ready ? "Ready to pay" : "In cooling period"} testId="payee-state" />
          <div className="ck-card-actions">
            <Btn onClick={send} data-testid="send-imps">Send by IMPS</Btn>
          </div>
        </Card>
      </Page>
    </Shell>
  );
}
