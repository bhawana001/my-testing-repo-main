"use client";

import { useState } from "react";
import Link from "next/link";
import InsHeader from "../InsHeader";
import { BASE } from "../lib";

export default function AccessClaim() {
  const [claimNumber, setClaimNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/insurance/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimNumber, firstName, lastName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not locate claim");
      setResult(data);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <InsHeader />
      <div className="ins-hero-sm">
        <div className="ins-container">
          <h1>Access Your Claim 📋</h1>
        </div>
      </div>
      <div className="ins-formpage">
        <div className="ins-container ins-form">
          <h2 style={{ fontSize: 26, marginBottom: 24 }}>
            To locate your claim, please provide the following information.
          </h2>
          {result ? (
            <div className="ins-success">
              <div className="ic">✓</div>
              <h2>Claim {result.claimNumber} located</h2>
              <p>
                Status: <b>{result.status}</b> — adjuster {result.adjuster}. Estimated
                resolution {result.eta}.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="ins-field">
                <label>Claim Number</label>
                <input value={claimNumber} onChange={(e) => setClaimNumber(e.target.value)} />
              </div>
              <div className="ins-field">
                <label>Your First Name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="ins-field">
                <label>Your Last Name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <p style={{ fontSize: 14, color: "var(--ins-muted)" }}>
                If you are a policyholder, you can{" "}
                <Link href={`${BASE}/login`}>log in with your user ID and password</Link> if you
                prefer.
              </p>
              {msg && <div className="msg">{msg}</div>}
              <button className="ins-btn ins-btn--primary" disabled={busy} style={{ marginTop: 10 }}>
                {busy ? "Locating…" : "CONTINUE"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
