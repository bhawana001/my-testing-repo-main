"use client";

import { useState } from "react";
import Link from "next/link";
import InsHeader from "../InsHeader";
import { BASE } from "../lib";

export default function InsLogin() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/insurance/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userId, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setMsg({ ok: true, text: `Welcome back, ${data.user.name}! Redirecting to your policy…` });
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <InsHeader />
      <div className="ins-formpage">
        <div className="ins-container ins-split">
          <div className="ins-form">
            <h1>Log In</h1>
            <form onSubmit={submit}>
              <div className="ins-field">
                <label>
                  Email / User ID / Policy Number <span className="req">*</span>
                </label>
                <input value={userId} onChange={(e) => setUserId(e.target.value)} />
              </div>
              <div className="ins-field">
                <label>
                  Password <span className="req">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link href="#" className="ins-help">
                Need help logging in?
              </Link>
              <br />
              <button className="ins-btn ins-btn--primary ins-btn--block" disabled={busy}>
                {busy ? "Logging in…" : "Log In"}
              </button>
              {msg && (
                <div
                  className="ins-banner"
                  style={{ color: msg.ok ? "#1a7f43" : "#d33", background: msg.ok ? "#e7f6ec" : "#fdeaea" }}
                >
                  {msg.text}
                </div>
              )}
            </form>
          </div>

          <div>
            <h1 style={{ fontSize: 34 }}>New to SafeGuard?</h1>
            <Link href={`${BASE}/create-account`} className="ins-newcard" style={{ marginTop: 20 }}>
              <span>👤 &nbsp; Create an Account</span>
              <span>›</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
