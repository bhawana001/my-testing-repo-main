"use client";
// SNKRS-style launch draw entry (8.3). Entry requires a signed-in member and a
// size; once entered the state is confirmed and the form locks.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Badge, Row, Banner, Field, Input, Modal } from "../../clones/kit/ui";
import { BRAND, BASE, LAUNCH, MEMBER, useStore, money } from "../shared";

export default function LaunchPage() {
  const [s, update] = useStore();
  const [size, setSize] = useState("");
  const [err, setErr] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");

  function signIn() {
    if (email.trim() !== MEMBER.email || pw !== MEMBER.password) {
      setLoginErr("Those credentials don't match a Nyke member account.");
      return;
    }
    update((st) => { st.signedIn = true; return st; });
    setLoginOpen(false);
    setLoginErr("");
  }

  function enterDraw() {
    if (!s.signedIn) { setErr("Sign in to your Nyke account to enter."); return; }
    if (!size) { setErr("Choose the size you want."); return; }
    setErr("");
    update((st) => {
      st.drawEntry = {
        id: "DRAW-" + (7310 + st.counter % 100),
        size, at: "2026-09-15",
        status: "Entered — awaiting draw",
        notifyBy: LAUNCH.drawCloses,
      };
      return st;
    });
  }

  const entry = s.drawEntry;

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Shop" }, { href: `${BASE}/checkout`, label: "Bag" }]}
              right={s.signedIn ? <Badge tone="ok" testId="member-status">Member</Badge> : null} />
      <Page title="Launch" sub={`Releases ${LAUNCH.releaseDate}`}>
        <div className="ck-split">
          <Card testId="launch-product">
            <div className="ck-thumb" style={{ fontSize: 110 }} aria-hidden="true">{LAUNCH.emoji}</div>
            <h2 data-testid="launch-title">{LAUNCH.title}</h2>
            <div style={{ fontSize: 22, fontWeight: 700, margin: "8px 0" }} data-testid="launch-price">{money(LAUNCH.price)}</div>
            <Badge tone="info" testId="draw-window">Draw closes {LAUNCH.drawCloses}</Badge>
          </Card>

          <Card title="Enter the draw">
            {entry ? (
              <div data-testid="entry-confirmation">
                <Banner tone="ok" title="You're in the draw">
                  Entry <strong data-testid="entry-id">{entry.id}</strong> confirmed for US {entry.size}.
                </Banner>
                <Row label="Status" value={entry.status} testId="entry-status" />
                <Row label="Size entered" value={`US ${entry.size}`} testId="entry-size" />
                <Row label="Results by" value={entry.notifyBy} testId="entry-notify" />
                <p className="ck-muted">You'll be charged only if you're selected.</p>
              </div>
            ) : (
              <>
                {!s.signedIn && (
                  <Banner tone="warn" title="Members only">
                    Draw entries require a Nyke member account.
                    <div><Btn size="sm" style={{ marginTop: 8 }} onClick={() => setLoginOpen(true)} data-testid="launch-signin">Sign in</Btn></div>
                  </Banner>
                )}
                <div className="ck-strong" style={{ margin: "8px 0 6px" }}>Select size</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} data-testid="launch-sizes">
                  {LAUNCH.sizes.map((sz) => (
                    <Btn key={sz} size="sm" variant={size === sz ? "primary" : "secondary"}
                         onClick={() => setSize(sz)} data-testid={`launch-size-${sz}`}>US {sz}</Btn>
                  ))}
                </div>
                {err && <div className="ck-field-error" role="alert" data-testid="entry-error">{err}</div>}
                <Btn block style={{ marginTop: 12 }} onClick={enterDraw} data-testid="enter-draw">Enter draw</Btn>
              </>
            )}
          </Card>
        </div>
      </Page>
      <Modal open={loginOpen} title="Sign in to Nyke" onClose={() => setLoginOpen(false)} testId="login-modal"
             actions={<>
               <Btn variant="secondary" onClick={() => setLoginOpen(false)}>Cancel</Btn>
               <Btn onClick={signIn} data-testid="submit-login">Sign in</Btn>
             </>}>
        <Field label="Email"><Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" data-testid="login-email" /></Field>
        <Field label="Password" error={loginErr}>
          <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} aria-label="Password" data-testid="login-password" />
        </Field>
        <p className="ck-muted">Demo member: {MEMBER.email} / {MEMBER.password}</p>
      </Modal>
    </Shell>
  );
}
