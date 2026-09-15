"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, Page, Card, Btn, Input, Field, Banner, Row, Timeline } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, CUSTOMER, OTP, useStore } from "../shared";

export default function Login() {
  const [s, update] = useStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [custId, setCustId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  function submitCredentials() {
    if (custId.trim() !== CUSTOMER.id) { setError("That customer id is not registered for NetBanking."); return; }
    if (password !== CUSTOMER.password) { setError("Incorrect password."); return; }
    setError(null);
    setStep(1);
  }

  function submitOtp() {
    if (otp.trim() !== OTP) { setError("That OTP is not valid. Check the code sent to your registered mobile."); return; }
    update((st) => { st.loggedIn = true; return st; });
    setError(null);
    setStep(2);
    router.push(`${BASE}/accounts`);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="NetBanking login" sub="Two steps: credentials, then the OTP">
        {error && <Banner tone="bad" testId="login-error">{error}</Banner>}
        <Timeline steps={["Credentials", "OTP", "Account summary"]} current={step} testId="login-steps" />

        {step === 0 && (
          <Card title="Step 1 — credentials" testId="credentials-step">
            <Field label="Customer id">
              <Input value={custId} placeholder={CUSTOMER.id} data-testid="customer-id" aria-label="Customer id"
                     onChange={(e) => setCustId(e.target.value)} />
            </Field>
            <Field label="Password">
              <Input type="password" value={password} data-testid="password" aria-label="Password"
                     onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={submitCredentials} data-testid="continue">Continue</Btn>
            </div>
          </Card>
        )}

        {step === 1 && (
          <Card title="Step 2 — one time password" testId="otp-step">
            <Row label="Sent to" value={CUSTOMER.mobile} testId="otp-destination" />
            <Field label="OTP" hint={`Test OTP: ${OTP}`}>
              <Input value={otp} data-testid="otp" aria-label="OTP" onChange={(e) => setOtp(e.target.value)} />
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={submitOtp} data-testid="verify-otp">Verify and sign in</Btn>
              <Btn variant="ghost" onClick={() => { setStep(0); setError(null); }}>Back</Btn>
            </div>
          </Card>
        )}

        {s.loggedIn && step === 2 && (
          <Card title="Signed in" tone="ok" testId="login-success">
            <Row label="Welcome" value={CUSTOMER.name} />
          </Card>
        )}
      </Page>
    </Shell>
  );
}
