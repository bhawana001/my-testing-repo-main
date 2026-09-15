"use client";
// Saved-card checkout (8.4). No card entry for members -- the confirmation
// repeats the size and price, which is what the use case asserts.
import { useState } from "react";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Empty, Modal, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, MEMBER, useStore, money } from "../shared";

export default function CheckoutPage() {
  const [s, update] = useStore();
  const [placed, setPlaced] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const subtotal = s.cart.reduce((n, l) => n + l.price * l.qty, 0);
  const tax = +(subtotal * 0.0825).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  function signIn() {
    if (email.trim() !== MEMBER.email || pw !== MEMBER.password) {
      setLoginErr("Those credentials don't match a Nyke member account.");
      return;
    }
    update((st) => { st.signedIn = true; return st; });
    setLoginOpen(false);
    setLoginErr("");
  }

  function placeOrder() {
    const id = "NK-" + (s.counter + 1);
    const order = {
      id, at: "2026-09-15", total, subtotal, tax,
      items: s.cart.map((l) => ({ ...l })),
      paidWith: `${MEMBER.card.brand} ending in ${MEMBER.card.last4}`,
      shipTo: MEMBER.address,
    };
    update((st) => { st.orders.unshift(order); st.counter += 1; st.cart = []; return st; });
    setPlaced(order);
  }

  if (placed) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Shop" }]} />
        <Page>
          <Banner tone="ok" title="Order confirmed" testId="order-confirmation">
            Order <strong data-testid="order-id">{placed.id}</strong> placed.
          </Banner>
          <Card title="What you bought" testId="order-items">
            {placed.items.map((l, i) => (
              <div key={i} data-testid={`order-item-${i}`}>
                <Row label={`${l.title} — ${l.colorway}`} value={money(l.price * l.qty)} testId={`item-price-${i}`} />
                <div className="ck-muted" data-testid={`item-size-${i}`}>Size US {l.size} · Qty {l.qty}</div>
              </div>
            ))}
            <Row label="Subtotal" value={money(placed.subtotal)} />
            <Row label="Tax" value={money(placed.tax)} />
            <Row label="Total" value={money(placed.total)} strong testId="order-total" />
          </Card>
          <Card title="Payment & shipping">
            <Row label="Paid with" value={placed.paidWith} testId="paid-with" />
            <Row label="Ship to" value={placed.shipTo} />
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Shop" }, { href: `${BASE}/launch`, label: "Launch" }]} />
      <Page title="Bag">
        {s.cart.length === 0 ? (
          <Empty>Your bag is empty. <Link href={BASE}>Shop shoes</Link>.</Empty>
        ) : (
          <div className="ck-split">
            <Card title="Items" testId="bag-items">
              {s.cart.map((l, i) => (
                <div key={i} style={{ borderBottom: "1px solid #eee", paddingBottom: 8, marginBottom: 8 }}
                     data-testid={`bag-item-${i}`}>
                  <Row label={`${l.emoji} ${l.title}`} value={money(l.price * l.qty)} />
                  <div className="ck-muted" data-testid={`bag-size-${i}`}>{l.colorway} · Size US {l.size}</div>
                  <Btn variant="ghost" size="sm" data-testid={`remove-${i}`}
                       onClick={() => update((st) => { st.cart.splice(i, 1); return st; })}>Remove</Btn>
                </div>
              ))}
            </Card>

            <Card title="Summary">
              <Row label="Subtotal" value={money(subtotal)} testId="subtotal" />
              <Row label="Estimated tax" value={money(tax)} />
              <Row label="Total" value={money(total)} strong testId="checkout-total" />

              {s.signedIn ? (
                <>
                  <div className="ck-card ck-card--ok" style={{ marginTop: 10 }} data-testid="saved-card">
                    <div className="ck-strong">Saved payment</div>
                    <div>{MEMBER.card.brand} ending in {MEMBER.card.last4} · exp {MEMBER.card.exp}</div>
                    <div className="ck-muted">{MEMBER.address}</div>
                  </div>
                  <Btn block style={{ marginTop: 10 }} onClick={placeOrder} data-testid="place-order">
                    Place order — {money(total)}
                  </Btn>
                </>
              ) : (
                <>
                  <Banner tone="warn" title="Sign in to use your saved card">
                    Members check out without re-entering payment details.
                  </Banner>
                  <Btn block onClick={() => setLoginOpen(true)} data-testid="checkout-signin">Sign in</Btn>
                </>
              )}
            </Card>
          </div>
        )}
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
