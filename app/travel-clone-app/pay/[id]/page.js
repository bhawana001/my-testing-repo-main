"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import TrvHeader from "../../TrvHeader";
import { BASE, inr } from "../../lib";
import { getListing } from "../../data";

export default function PayPage() {
  const { id } = useParams();
  const l = getListing(id);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!l) return <TrvHeader showSearch={false} />;

  const subtotal = l.price;
  const discount = Math.round(subtotal * 0.2);
  const taxes = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + taxes;

  async function pay(method) {
    setBusy(true);
    try {
      const res = await fetch("/api/travel/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: l.id,
          checkin: "2026-08-21",
          checkout: "2026-08-23",
          guests: 1,
          total,
          payment: method,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment failed");
      setResult(data);
    } catch {
      setResult({ bookingId: "BKG-DEMO", status: "confirmed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <TrvHeader showSearch={false} />
      <div className="trv-container">
        {result ? (
          <div className="trv-success">
            <div className="ic">✓</div>
            <h1>Booking confirmed!</h1>
            <p style={{ marginTop: 8 }}>
              Reference <b>{result.bookingId}</b> — {l.title}. Total paid {inr(total)}.
            </p>
            <Link href={BASE} className="trv-btn" style={{ display: "inline-block", width: "auto", marginTop: 20, padding: "12px 30px" }}>
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="trv-rzp">
            <div className="trv-rzp__left">
              <b style={{ fontSize: 20 }}>⌂ StayPay</b>
              <div className="trv-rzp__summary">
                Price Summary
                <b>{inr(total)}</b>
              </div>
              <p style={{ marginTop: 20, fontSize: 12, opacity: 0.85 }}>Secured by StayPay</p>
            </div>
            <div className="trv-rzp__right">
              <div style={{ padding: "18px 24px", fontWeight: 700, borderBottom: "1px solid #f0f0f0" }}>
                Payment Options
              </div>
              {["UPI", "Cards", "Netbanking", "UPI QR"].map((m) => (
                <div className="trv-rzp__opt" key={m} onClick={() => !busy && pay(m)}>
                  <span>{m}</span>
                  <span>›</span>
                </div>
              ))}
              <div style={{ padding: 20, textAlign: "center", color: "var(--trv-muted)", fontSize: 13 }}>
                {busy ? "Processing payment…" : "Select a payment method to pay " + inr(total)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
