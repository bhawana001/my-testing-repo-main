"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "error" | "success", text }
  const [session, setSession] = useState(null);

  // Track the current auth session — also catches sign-in via a clicked magic link.
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Step 1 — send a one-time code / magic link to the email.
  async function handleSendCode(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      setStep("otp");
      setMessage({
        type: "success",
        text: `We emailed a 6-digit code (and a magic link) to ${email}. Enter the code below, or click the link in the email.`,
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Could not send the code." });
    } finally {
      setLoading(false);
    }
  }

  // Step 2 — verify the code the user received by email.
  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp.trim(),
        type: "email",
      });
      if (error) throw error;
      setMessage({ type: "success", text: "Signed in successfully." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Invalid or expired code." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    setStep("email");
    setOtp("");
    setMessage({ type: "success", text: "Signed out." });
    setLoading(false);
  }

  return (
    <main className="auth">
      <div className="auth__card">
        <Link href="/" className="logo auth__logo">
          <span className="logo__mark" />
          Acme
        </Link>

        {!isSupabaseConfigured ? (
          <>
            <h1 className="auth__title">Login</h1>
            <p className="auth__msg auth__msg--err">
              Supabase isn&apos;t configured yet. Add your{" "}
              <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
              <code>.env.local</code>, then restart the dev server.
            </p>
          </>
        ) : session ? (
          <>
            <h1 className="auth__title">You&apos;re signed in</h1>
            <p className="auth__sub">{session.user?.email}</p>
            <button
              className="btn btn--primary btn--block"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? "Working…" : "Sign out"}
            </button>
          </>
        ) : step === "email" ? (
          <>
            <h1 className="auth__title">Sign in</h1>
            <p className="auth__sub">
              Enter your email and we&apos;ll send you a one-time login code.
            </p>
            <form className="auth__form" onSubmit={handleSendCode}>
              <label className="auth__label">
                Email
                <input
                  type="email"
                  className="auth__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </label>
              <button
                type="submit"
                className="btn btn--primary btn--block"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send code"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="auth__title">Enter code</h1>
            <p className="auth__sub">Check {email} for your 6-digit code.</p>
            <form className="auth__form" onSubmit={handleVerify}>
              <label className="auth__label">
                One-time code
                <input
                  type="text"
                  inputMode="numeric"
                  className="auth__input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  required
                  autoComplete="one-time-code"
                  maxLength={6}
                />
              </label>
              <button
                type="submit"
                className="btn btn--primary btn--block"
                disabled={loading}
              >
                {loading ? "Verifying…" : "Verify & sign in"}
              </button>
            </form>
            <p className="auth__switch">
              <button
                type="button"
                className="auth__link"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setMessage(null);
                }}
              >
                Use a different email
              </button>
            </p>
          </>
        )}

        {message && (
          <p
            className={
              message.type === "error" ? "auth__msg auth__msg--err" : "auth__msg"
            }
          >
            {message.text}
          </p>
        )}
      </div>
    </main>
  );
}
