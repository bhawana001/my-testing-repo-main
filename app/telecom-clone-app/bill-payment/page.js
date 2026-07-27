"use client";

import { useState } from "react";
import Link from "next/link";
import TelHeader from "../TelHeader";
import { BASE } from "../lib";

export default function BillPayment() {
  const [account, setAccount] = useState("");
  const [bill, setBill] = useState(null);
  const [paid, setPaid] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  function lookup() {
    if (account.trim().length < 5) {
      setErr("Enter a valid registered mobile / landline / Wi-Fi Id");
      return;
    }
    setErr("");
    // Deterministic demo bill amount from the account string.
    const amt = 499 + (account.length % 5) * 100;
    setBill({ account, amount: amt, dueDate: "05 Aug 2026" });
  }

  async function pay() {
    setBusy(true);
    try {
      const res = await fetch("/api/telecom/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: bill.account, amount: bill.amount, type: "wifi" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setPaid(data);
    } catch {
      setPaid({ txnId: "TXN-DEMO" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <TelHeader />
      <div className="tel-billpage">
        <div className="tel-container tel-billpage__grid">
          <div>
            <div style={{ fontSize: 13, color: "var(--tel-muted)", marginBottom: 12 }}>
              Home › Bill Payment
            </div>
            <h1>Online Wi-Fi Bill Payment</h1>
            <p style={{ marginTop: 16 }}>Let&apos;s get your payment done!</p>
            <div style={{ fontSize: 60, marginTop: 20 }}>🧾</div>
          </div>

          <div className="tel-billpage__panel">
            {paid ? (
              <div className="tel-success">
                <div className="ic">✓</div>
                <h2>Payment successful!</h2>
                <p style={{ marginTop: 8 }}>
                  ₹{bill.amount} paid for {bill.account} · Ref <b>{paid.txnId}</b>
                </p>
                <Link href={BASE} className="tel-btn" style={{ marginTop: 16 }}>
                  Done
                </Link>
              </div>
            ) : (
              <>
                <h3>Enter your details below</h3>
                <div className="tel-inline">
                  <input
                    placeholder="Registered Mobile or Landline number/ Wi-Fi Id"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                  <button onClick={lookup}>GO</button>
                </div>
                {err && <div className="tel-msg" style={{ marginTop: 10 }}>{err}</div>}
                <div className="tel-locate">LOCATE THESE DETAILS</div>

                {bill && (
                  <div className="tel-bill">
                    <div className="row">
                      <span>Account</span>
                      <span>{bill.account}</span>
                    </div>
                    <div className="row">
                      <span>Due date</span>
                      <span>{bill.dueDate}</span>
                    </div>
                    <div className="row total">
                      <span>Amount due</span>
                      <span>₹{bill.amount}</span>
                    </div>
                    <button
                      className="tel-btn tel-btn--red tel-btn--block"
                      style={{ marginTop: 14 }}
                      onClick={pay}
                      disabled={busy}
                    >
                      {busy ? "Paying…" : `Pay ₹${bill.amount}`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
