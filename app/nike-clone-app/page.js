"use client";
// Product grid, size guide + size selection (8.1), and member gating (8.2).
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Badge, Row, Modal, Field, Input, Banner, useToast } from "../clones/kit/ui";
import { BRAND, BASE, PRODUCTS, SIZE_CHART, MEMBER, useStore, money, findProduct } from "./shared";

export default function Storefront() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(null);
  const [size, setSize] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [err, setErr] = useState("");
  const [toast, showToast] = useToast();

  const product = open ? findProduct(open) : null;
  const locked = product?.memberOnly && !s.signedIn;

  function signIn() {
    if (email.trim() !== MEMBER.email || pw !== MEMBER.password) {
      setLoginErr("Those credentials don't match a Nyke member account.");
      return;
    }
    setLoginErr("");
    update((st) => { st.signedIn = true; return st; });
    setLoginOpen(false);
    showToast(`Welcome back, ${MEMBER.name.split(" ")[0]}`);
  }

  function addToCart() {
    if (!size) { setErr("Select a size first."); return; }
    setErr("");
    update((st) => {
      st.cart.push({ id: product.id, title: product.title, price: product.price, size, qty: 1,
                     emoji: product.emoji, colorway: product.colorway });
      return st;
    });
    showToast(`Added US ${size}`);
    setOpen(null);
    setSize("");
  }

  if (product) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[
          { href: `${BASE}/launch`, label: "Launch" },
          { href: `${BASE}/checkout`, label: `Bag (${s.cart.length})` },
        ]} />
        <Page>
          <Btn variant="ghost" onClick={() => { setOpen(null); setErr(""); setSize(""); }} data-testid="back">← Back</Btn>
          <div className="ck-split">
            <Card testId="product-detail">
              <div className="ck-thumb" style={{ fontSize: 110 }} aria-hidden="true">{product.emoji}</div>
              <h2 data-testid="product-title">{product.title}</h2>
              <div className="ck-muted">{product.category} · {product.colorway}</div>
              <div style={{ fontSize: 22, fontWeight: 700, margin: "8px 0" }} data-testid="product-price">{money(product.price)}</div>
              {product.memberOnly && <Badge tone="warn" testId="member-only-badge">Member exclusive</Badge>}
            </Card>

            <Card title="Select size">
              {locked ? (
                <div data-testid="member-gate">
                  <Banner tone="warn" title="Members only">
                    Sign in to your Nyke account to buy this product.
                  </Banner>
                  <Btn block onClick={() => setLoginOpen(true)} data-testid="signin-cta">Sign in to unlock</Btn>
                </div>
              ) : (
                <>
                  <Btn variant="ghost" size="sm" onClick={() => setGuideOpen(true)} data-testid="open-size-guide">
                    📏 Size guide
                  </Btn>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "10px 0" }} data-testid="size-grid">
                    {product.sizes.map((sz) => {
                      const out = product.soldOut.includes(sz);
                      return (
                        <Btn key={sz} size="sm" variant={size === sz ? "primary" : "secondary"} disabled={out}
                             onClick={() => setSize(sz)} data-testid={`size-${sz}`}>
                          US {sz}{out ? " ✕" : product.lowStock.includes(sz) ? " ·low" : ""}
                        </Btn>
                      );
                    })}
                  </div>
                  {size && <Badge tone="ok" testId="selected-size">Selected: US {size}</Badge>}
                  {err && <div className="ck-field-error" role="alert" data-testid="size-error">{err}</div>}
                  <Btn block style={{ marginTop: 10 }} onClick={addToCart} data-testid="add-to-bag">Add to Bag</Btn>
                </>
              )}
            </Card>
          </div>

          <Modal open={guideOpen} title="Size guide" onClose={() => setGuideOpen(false)} testId="size-guide"
                 actions={<Btn variant="secondary" onClick={() => setGuideOpen(false)}>Close</Btn>}>
            <table className="ck-table">
              <thead><tr><th>US</th><th>UK</th><th>EU</th><th>CM</th><th /></tr></thead>
              <tbody>
                {SIZE_CHART.filter((r) => product.sizes.includes(r.us)).map((r) => (
                  <tr key={r.us} data-testid={`chart-${r.us}`}>
                    <td>{r.us}</td><td>{r.uk}</td><td>{r.eu}</td><td>{r.cm}</td>
                    <td>
                      <Btn size="sm" variant="secondary" disabled={product.soldOut.includes(r.us)}
                           onClick={() => { setSize(r.us); setGuideOpen(false); }} data-testid={`pick-${r.us}`}>
                        Select
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal>
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
        {toast}
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/launch`, label: "Launch", testId: "nav-launch" },
        { href: `${BASE}/checkout`, label: `Bag (${s.cart.length})`, testId: "nav-bag" },
      ]}
      right={
        s.signedIn
          ? <Badge tone="ok" testId="member-status">Member · {MEMBER.name.split(" ")[0]}</Badge>
          : <Btn size="sm" variant="secondary" onClick={() => setLoginOpen(true)} data-testid="header-signin">Sign in</Btn>
      } />
      <Page title="Shop all" wide>
        <div className="ck-grid ck-grid--3" data-testid="product-grid">
          {PRODUCTS.map((p, i) => (
            <Card key={p.id} testId={`product-${p.id}`}>
              <div className="ck-thumb" aria-hidden="true">{p.emoji}</div>
              <button className="ck-btn ck-btn--ghost" style={{ padding: 0, fontWeight: 700, textAlign: "left" }}
                      onClick={() => setOpen(p.id)} data-testid={`open-${i}`}>{p.title}</button>
              <div className="ck-muted">{p.category} · {p.colorway}</div>
              <div style={{ fontWeight: 700 }}>{money(p.price)}</div>
              {p.memberOnly && (
                <Badge tone={s.signedIn ? "ok" : "warn"} testId={`lock-${p.id}`}>
                  {s.signedIn ? "Unlocked for members" : "Members only"}
                </Badge>
              )}
            </Card>
          ))}
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
      {toast}
    </Shell>
  );
}
