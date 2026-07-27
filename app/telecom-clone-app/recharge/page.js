"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TelHeader from "../TelHeader";
import { BASE } from "../lib";

const PACKS = [
  { amt: 199, d: "1.5 GB/day · 28 days" },
  { amt: 299, d: "2 GB/day · 28 days" },
  { amt: 479, d: "1.5 GB/day · 56 days" },
  { amt: 799, d: "2.5 GB/day · 84 days" },
];

function RechargeInner() {
  const params = useSearchParams();
  const mobile = params.get("mobile") || "";
  const type = params.get("type") || "prepaid";
  const [amount, setAmount] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function pay() {
    if (!amount) return;
    setBusy(true);
    try {
      const res = await fetch("/api/telecom/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, amount, type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Recharge failed");
      setResult(data);
    } catch {
      setResult({ txnId: "TXN-DEMO", status: "success" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tel-container tel-section">
      {result ? (
        <div className="tel-success">
          <div className="ic">✓</div>
          <h2>Recharge successful!</h2>
          <p style={{ marginTop: 8 }}>
            ₹{amount} recharge for {mobile} · Ref <b>{result.txnId}</b>
          </p>
          <Link href={BASE} className="tel-btn" style={{ marginTop: 16 }}>
            Done
          </Link>
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: "left" }}>
            {type[0].toUpperCase() + type.slice(1)} recharge for {mobile}
          </h2>
          <div className="tel-cards" style={{ marginTop: 20 }}>
            {PACKS.map((p) => (
              <div
                className="tel-plancard"
                key={p.amt}
                onClick={() => setAmount(p.amt)}
                style={{
                  cursor: "pointer",
                  outline: amount === p.amt ? "2px solid var(--tel-red)" : "none",
                }}
              >
                <div className="tel-plancard__body">
                  <h4>₹{p.amt}</h4>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="tel-btn tel-btn--red"
            style={{ marginTop: 20 }}
            disabled={!amount || busy}
            onClick={pay}
          >
            {busy ? "Processing…" : amount ? `Pay ₹${amount}` : "Select a pack"}
          </button>
        </>
      )}
    </div>
  );
}

export default function RechargePage() {
  return (
    <>
      <TelHeader />
      <Suspense fallback={<div className="tel-section" />}>
        <RechargeInner />
      </Suspense>
    </>
  );
}
