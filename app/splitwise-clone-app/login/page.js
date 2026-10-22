"use client";
// Email sign-in: enter an email, get a 6-digit code in the simulated /inbox,
// then enter the code. The code is never rendered on this page.
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Banner, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, EMAIL_RE, sendSignInCode, useStore } from "../shared";

export default function LoginPage() {
  const [s, update] = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [resent, setResent] = useState(false);
  const pending = s.auth?.pending;

  function send(to) {
    const addr = to.trim().toLowerCase();
    if (!EMAIL_RE.test(addr)) { setErr("Enter a valid email address."); return false; }
    setErr("");
    const sent = sendSignInCode(addr);
    update((st) => {
      st.auth = { email: st.auth?.email || null, pending: { email: addr, code: sent } };
      return st;
    });
    setCode("");
    return true;
  }

  function verify() {
    const entered = code.trim();
    if (!/^\d{6}$/.test(entered)) { setErr("Enter the 6-digit code."); return; }
    if (entered !== pending.code) { setErr("That code is not right. Check the latest email and try again."); return; }
    setErr("");
    const signedIn = pending.email;
    update((st) => {
      st.auth = { email: signedIn, pending: null };
      return st;
    });
    router.push(BASE);
  }

  function startOver() {
    update((st) => {
      st.auth = { email: st.auth?.email || null, pending: null };
      return st;
    });
    setErr(""); setCode(""); setResent(false);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Groups", testId: "nav-groups" }]} />
      <Page title="Sign in to Splitwyse">
        {s.auth?.email && !pending && (
          <Banner tone="ok" testId="already-signed-in">
            You are signed in as <strong>{s.auth.email}</strong>. <Link href={BASE}>Go to your groups</Link>
          </Banner>
        )}
        <div style={{ maxWidth: 420 }}>
          {!pending ? (
            <Card title="Your email" testId="email-step">
              <Field label="Email address" error={err}>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                       aria-label="Email address" data-testid="login-email" aria-invalid={!!err}
                       onKeyDown={(e) => e.key === "Enter" && send(email)} />
              </Field>
              <Btn block onClick={() => send(email)} data-testid="send-code">Send code</Btn>
            </Card>
          ) : (
            <Card title="Enter your code" testId="code-step">
              <p className="ck-muted" data-testid="code-sent-note">
                We emailed a 6-digit code to <strong>{pending.email}</strong>. Open your{" "}
                <a href="/inbox" target="_blank" rel="noreferrer" data-testid="open-inbox">inbox</a> to find it.
              </p>
              {resent && <Banner tone="ok" testId="code-resent">A new code is on its way. Earlier codes no longer work.</Banner>}
              <Field label="6-digit code" error={err}>
                <Input value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" maxLength={6}
                       autoComplete="one-time-code" aria-label="6-digit code" data-testid="login-code" aria-invalid={!!err}
                       onKeyDown={(e) => e.key === "Enter" && verify()} />
              </Field>
              <Btn block onClick={verify} data-testid="verify-code">Sign in</Btn>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <Btn size="sm" variant="ghost" onClick={() => send(pending.email) && setResent(true)} data-testid="resend-code">Resend code</Btn>
                <Btn size="sm" variant="ghost" onClick={startOver} data-testid="change-email">Use a different email</Btn>
              </div>
            </Card>
          )}
        </div>
      </Page>
    </Shell>
  );
}
