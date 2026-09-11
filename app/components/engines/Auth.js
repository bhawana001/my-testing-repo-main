"use client";
// Auth engine: password / customer-id login, OTP challenge (123456), PIN gates,
// lockout after 3 failures, session held in the flow's state slice.
import { useState } from "react";
import { Alert, Btn, Card, Field, Input, useDelay } from "../eval/ui";
import { DEMO_USER, OTP } from "@/lib/seed";

export const SEED_SESSION = { user: null, attempts: 0, locked: false, stage: "login" };

/**
 * LoginForm
 * props: auth (state slice), setAuth, mode: "password" | "password+otp" | "customerid+otp" | "otp-only"
 *        onSuccess(user), title, subtitle, idLabel, extra
 */
export function LoginForm({ auth, setAuth, mode = "password+otp", onSuccess, title = "Sign in", subtitle, idLabel, testIdPrefix = "login", extra }) {
  const delay = useDelay();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const usesCustomerId = mode.startsWith("customerid");
  const stage = auth.stage || "login";

  async function submitCreds(e) {
    e.preventDefault();
    setErr(null);
    if (auth.locked) return;
    const idOk = usesCustomerId ? id.trim().toUpperCase() === DEMO_USER.customerId : id.trim().toLowerCase() === DEMO_USER.email;
    const pwOk = mode === "otp-only" ? true : pw === DEMO_USER.password;
    if (!id.trim() || (mode !== "otp-only" && !pw)) {
      setErr("Enter your credentials to continue.");
      return;
    }
    setBusy(true);
    await delay(500);
    setBusy(false);
    if (!idOk || !pwOk) {
      const attempts = (auth.attempts || 0) + 1;
      const locked = attempts >= 3;
      setAuth({ ...auth, attempts, locked });
      setErr(locked ? "Too many failed attempts. Your account is locked for security. Reset the flow to try again." : `Incorrect ${usesCustomerId ? "customer ID" : "email"} or password. ${3 - attempts} attempt${3 - attempts === 1 ? "" : "s"} left.`);
      return;
    }
    if (mode.includes("otp")) {
      setAuth({ ...auth, stage: "otp", pendingId: id.trim() });
      return;
    }
    finish();
  }
  async function submitOtp(e) {
    e.preventDefault();
    setErr(null);
    if (otp.trim() !== OTP) {
      setErr("The code you entered is incorrect. Check the 6-digit code and try again.");
      return;
    }
    setBusy(true);
    await delay(500);
    setBusy(false);
    finish();
  }
  function finish() {
    const user = { ...DEMO_USER, signedInAt: "2026-09-14T10:00:00Z" };
    setAuth({ ...auth, user, stage: "done", attempts: 0 });
    onSuccess?.(user);
  }

  if (stage === "otp") {
    return (
      <Card data-testid={`${testIdPrefix}-otp`}>
        <h2 style={{ fontSize: 20, marginBottom: 6 }}>Verify it's you</h2>
        <p className="ee-small ee-muted" style={{ marginBottom: 14 }}>
          We sent a 6-digit code to your phone ending in <b>0123</b>. Enter it below.
        </p>
        <form onSubmit={submitOtp} className="ee-stack">
          <Field label="Verification code" htmlFor={`${testIdPrefix}-otp-input`} error={err}>
            <Input id={`${testIdPrefix}-otp-input`} inputMode="numeric" autoComplete="one-time-code" placeholder="6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} invalid={!!err} />
          </Field>
          <Btn type="submit" loading={busy} block data-testid={`${testIdPrefix}-otp-submit`}>Verify and continue</Btn>
          <button type="button" className="ee-link ee-small" onClick={() => setAuth({ ...auth, stage: "login" })}>Back to sign in</button>
        </form>
      </Card>
    );
  }

  return (
    <Card data-testid={`${testIdPrefix}-form`}>
      <h2 style={{ fontSize: 20, marginBottom: 6 }}>{title}</h2>
      {subtitle && <p className="ee-small ee-muted" style={{ marginBottom: 14 }}>{subtitle}</p>}
      {auth.locked && <Alert tone="err" data-testid={`${testIdPrefix}-locked`}>Account locked after 3 failed attempts.</Alert>}
      <form onSubmit={submitCreds} className="ee-stack" style={{ marginTop: 10 }}>
        <Field label={idLabel || (usesCustomerId ? "Customer ID" : "Email")} htmlFor={`${testIdPrefix}-id`}>
          <Input id={`${testIdPrefix}-id`} type={usesCustomerId ? "text" : "email"} autoComplete={usesCustomerId ? "username" : "email"} value={id} onChange={(e) => setId(e.target.value)} placeholder={usesCustomerId ? "e.g. DEMO12345" : "you@example.com"} disabled={auth.locked} />
        </Field>
        {mode !== "otp-only" && (
          <Field label="Password" htmlFor={`${testIdPrefix}-password`}>
            <Input id={`${testIdPrefix}-password`} type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} disabled={auth.locked} />
          </Field>
        )}
        {err && <div className="ee-error" role="alert" data-testid={`${testIdPrefix}-error`}>{err}</div>}
        <Btn type="submit" loading={busy} block disabled={auth.locked} data-testid={`${testIdPrefix}-submit`}>{mode.includes("otp") ? "Continue" : "Sign in"}</Btn>
        {extra}
        <div className="ee-tiny ee-muted ee-center">Demo credentials: {usesCustomerId ? DEMO_USER.customerId : DEMO_USER.email}{mode !== "otp-only" ? ` / ${DEMO_USER.password}` : ""}{mode.includes("otp") ? ` · OTP ${OTP}` : ""}</div>
      </form>
    </Card>
  );
}

/** PinGate: 4-digit PIN entry (seeded PIN "1234"); 3 wrong -> locked. */
export function PinGate({ pin = "1234", title = "Enter PIN", onUnlock, onCancel, testIdPrefix = "pin" }) {
  const [val, setVal] = useState("");
  const [fails, setFails] = useState(0);
  const [err, setErr] = useState(null);
  function submit(e) {
    e.preventDefault();
    if (val === pin) {
      onUnlock();
      return;
    }
    const f = fails + 1;
    setFails(f);
    setVal("");
    setErr(f >= 3 ? "Too many incorrect PINs. Reset the flow to try again." : "Incorrect PIN. Try again.");
  }
  return (
    <Card data-testid={`${testIdPrefix}-gate`} style={{ maxWidth: 380, margin: "40px auto" }}>
      <h2 style={{ fontSize: 20, marginBottom: 6 }}>{title}</h2>
      <p className="ee-small ee-muted" style={{ marginBottom: 14 }}>This profile is protected. Enter the 4-digit PIN to continue.</p>
      <form onSubmit={submit} className="ee-stack">
        <Input inputMode="numeric" maxLength={4} value={val} onChange={(e) => setVal(e.target.value.replace(/\D/g, ""))} placeholder="••••" aria-label="Profile PIN" disabled={fails >= 3} style={{ fontSize: 24, letterSpacing: 12, textAlign: "center" }} />
        {err && <div className="ee-error" role="alert" data-testid={`${testIdPrefix}-error`}>{err}</div>}
        <Btn type="submit" block disabled={val.length !== 4 || fails >= 3} data-testid={`${testIdPrefix}-submit`}>Unlock</Btn>
        {onCancel && <button type="button" className="ee-link ee-small" onClick={onCancel}>Cancel</button>}
      </form>
    </Card>
  );
}

export function SignedInBar({ user, onSignOut, right }) {
  return (
    <div className="ee-row ee-row--between ee-small" style={{ marginBottom: 14 }} data-testid="signed-in-bar">
      <span>
        Signed in as <b>{user.name}</b> <span className="ee-muted">({user.email})</span>
      </span>
      <span className="ee-row">
        {right}
        {onSignOut && <button className="ee-link" onClick={onSignOut}>Sign out</button>}
      </span>
    </div>
  );
}
