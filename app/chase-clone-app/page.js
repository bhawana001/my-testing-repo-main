"use client";
// Login with a 2FA challenge (23.1). Credentials alone are not enough -- the
// one-time code gate stands between them and the dashboard.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Badge, Banner } from "../clones/kit/ui";
import { BRAND, BASE, CREDENTIALS, OTP_CODE, useStore } from "./shared";

export default function LoginPage() {
  const [s, update] = useStore();
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [stage, setStage] = useState("credentials");
  const router = useRouter();

  function submitCredentials(e) {
    e.preventDefault();
    if (user.trim() !== CREDENTIALS.username || pw !== CREDENTIALS.password) {
      setErr("We couldn't verify that username and password.");
      return;
    }
    setErr("");
    setStage("otp");
  }

  function submitOtp(e) {
    e.preventDefault();
    if (otp.trim() !== OTP_CODE) {
      setErr("That one-time code is incorrect or expired.");
      return;
    }
    setErr("");
    update((st) => { st.authed = true; st.stage = "done"; return st; });
    router.push(`${BASE}/dashboard`);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} />
      <Page title="Sign in to Chaise Bank" sub="Your accounts, protected by two-step verification">
        <Card testId="login-card">
          {stage === "credentials" ? (
            <form onSubmit={submitCredentials}>
              <Field label="Username">
                <Input value={user} onChange={(e) => setUser(e.target.value)} aria-label="Username" data-testid="username" />
              </Field>
              <Field label="Password" error={err}>
                <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} aria-label="Password" data-testid="password" />
              </Field>
              <Btn block type="submit" data-testid="sign-in">Sign in</Btn>
              <p className="ck-muted" style={{ marginTop: 8 }}>Demo login: priya.nair / Bank2026!</p>
            </form>
          ) : (
            <form onSubmit={submitOtp} data-testid="otp-step">
              <Banner tone="info" title="Two-step verification" testId="otp-banner">
                We sent a 6-digit code to your phone ending in ••34.
              </Banner>
              <Field label="One-time code" error={err}>
                <Input value={otp} onChange={(e) => setOtp(e.target.value)} inputMode="numeric"
                       aria-label="One-time code" data-testid="otp-input" />
              </Field>
              <Btn block type="submit" data-testid="verify-otp">Verify and sign in</Btn>
              <p className="ck-muted" style={{ marginTop: 8 }}>Demo code: {OTP_CODE}</p>
            </form>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
