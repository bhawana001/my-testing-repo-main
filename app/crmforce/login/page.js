"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import "../crmforce.css";

export default function CrmforceLogin() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") || "/crmforce";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/crmforce/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Sign in failed");
      }
      // Full navigation so the middleware sees the new cookie.
      window.location.href = next;
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="crmforce">
      <div className="cf-login">
        <form className="cf-login-card" onSubmit={onSubmit}>
          <div className="cf-login-logo">
            <span className="cf-logo-mark">☁</span> CRMforce
          </div>
          <div className="cf-login-sub">Sign in to your CRM workspace.</div>

          {error && <div className="cf-error">{error}</div>}

          <div className="cf-field">
            <label>Username / Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="username"
              required
            />
          </div>
          <div className="cf-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="cf-btn cf-btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            disabled={busy}
          >
            {busy ? "Signing in…" : "Log In"}
          </button>

          <div className="cf-login-hint">
            Demo access — any email, password <b>demo</b>
          </div>
        </form>
      </div>
    </div>
  );
}
