"use client";
// The Britannic Club log in. Accepts the email or the membership number.
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header, Footer } from "../../../../../../../ui";
import { R, MEMBER, BRAND, useStore } from "../../../../../../../shared";

export default function Login() {
  const router = useRouter();
  const [, update] = useStore();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [tries, setTries] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    if (!id.trim() || !pw) { setErr("Enter your email or membership number and your password."); return; }
    const who = id.trim().toLowerCase();
    if ((who === MEMBER.email || who === MEMBER.number) && pw === MEMBER.password) {
      const { password, ...user } = MEMBER;
      update((d) => ({ ...d, user }));
      router.push(R.account);
      return;
    }
    const n = tries + 1;
    setTries(n);
    setErr(n >= 3 ? "Your account is locked for 30 minutes after 3 unsuccessful attempts." : `Those details don't match our records. You have ${3 - n} attempt${3 - n === 1 ? "" : "s"} left.`);
  };

  return (
    <>
      <Header />
      <div className="bx-wrap bx-page">
        <div className="bx-card" style={{ maxWidth: 460, margin: "10px auto" }}>
          <h1 className="bx-h1" style={{ fontSize: 26 }}>Log in</h1>
          <p className="bx-small bx-muted">Log in to {BRAND.club} to see your Avions, tier and trips. (Demo: {MEMBER.email} / {MEMBER.password})</p>
          <form onSubmit={submit} noValidate className="bx-grid">
            <div className="bx-f"><label htmlFor="login-id">Email or membership number</label><input id="login-id" className="bx-in" autoComplete="username" value={id} onChange={(e) => setId(e.target.value)} /></div>
            <div className="bx-f"><label htmlFor="login-pw">Password</label><input id="login-pw" type="password" className="bx-in" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} /></div>
            {err && <div className="bx-banner bx-banner--err" role="alert">{err}</div>}
            <button type="submit" className="bx-btn bx-btn--wide" disabled={tries >= 3}>Log in</button>
          </form>
          <p className="bx-small" style={{ marginTop: 14 }}>Not a member? <Link href={R.offers}>Join {BRAND.club}</Link></p>
        </div>
      </div>
      <Footer />
    </>
  );
}
