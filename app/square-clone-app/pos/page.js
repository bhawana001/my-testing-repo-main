"use client";
// Web POS with tip selection and receipt (12.3). The tip is a percentage of the
// subtotal, the total includes it, and a receipt is offered afterwards.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, POS_ITEMS, TIP_PRESETS, useStore, money, nextPayId } from "../shared";

export default function PosPage() {
  const [s, update] = useStore();
  const [cart, setCart] = useState([]);
  const [stage, setStage] = useState("ring"); // ring | tip | receipt
  const [tipPct, setTipPct] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(null);

  const subtotal = +cart.reduce((n, l) => n + l.price * l.qty, 0).toFixed(2);
  const tip = customTip !== "" ? +(Number(customTip) || 0).toFixed(2) : +(subtotal * (tipPct / 100)).toFixed(2);
  const total = +(subtotal + tip).toFixed(2);

  function add(item) {
    setCart((c) => {
      const line = c.find((l) => l.id === item.id);
      if (line) return c.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { ...item, qty: 1 }];
    });
  }

  function charge() {
    const id = nextPayId(s.counter);
    const payment = { id, source: "Web POS", amount: subtotal, tip, at: "2026-09-15",
                      status: "Completed", card: "Visa ••••4242", refunded: 0 };
    update((st) => { st.payments.unshift(payment); st.counter += 1; return st; });
    setDone(payment);
    setStage("receipt");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/dashboard`, label: "Dashboard" }]} />
      <Page title="Web POS">
        {stage === "ring" && (
          <div className="ck-split">
            <Card title="Items" testId="pos-items">
              <div className="ck-grid ck-grid--3">
                {POS_ITEMS.map((i) => (
                  <Btn key={i.id} variant="secondary" onClick={() => add(i)} data-testid={`item-${i.id}`}>
                    {i.name} · {money(i.price)}
                  </Btn>
                ))}
              </div>
            </Card>
            <Card title="Sale" testId="pos-cart">
              {cart.map((l) => <Row key={l.id} label={`${l.name} × ${l.qty}`} value={money(l.price * l.qty)} />)}
              <Row label="Subtotal" value={money(subtotal)} strong testId="pos-subtotal" />
              <Btn block disabled={cart.length === 0} onClick={() => setStage("tip")} data-testid="pos-charge">
                Charge {money(subtotal)}
              </Btn>
            </Card>
          </div>
        )}

        {stage === "tip" && (
          <Card title="Add a tip?" testId="tip-screen">
            <Row label="Subtotal" value={money(subtotal)} testId="tip-subtotal" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "10px 0" }} data-testid="tip-options">
              {TIP_PRESETS.map((p) => (
                <Btn key={p} variant={customTip === "" && tipPct === p ? "primary" : "secondary"}
                     onClick={() => { setTipPct(p); setCustomTip(""); }} data-testid={`tip-${p}`}>
                  {p === 0 ? "No tip" : `${p}% · ${money(+(subtotal * (p / 100)).toFixed(2))}`}
                </Btn>
              ))}
            </div>
            <Field label="Custom tip">
              <Input value={customTip} onChange={(e) => setCustomTip(e.target.value)} inputMode="decimal"
                     aria-label="Custom tip" data-testid="custom-tip" />
            </Field>
            <Row label="Tip" value={money(tip)} testId="tip-amount" />
            <Row label="Total" value={money(total)} strong testId="tip-total" />
            <Btn block onClick={charge} data-testid="confirm-charge">Charge {money(total)}</Btn>
          </Card>
        )}

        {stage === "receipt" && done && (
          <>
            <Banner tone="ok" title="Payment complete" testId="pos-complete">
              Charged <strong data-testid="charged-total">{money(done.amount + done.tip)}</strong> including a tip of{" "}
              <strong data-testid="charged-tip">{money(done.tip)}</strong>.
            </Banner>
            <Card title="Send a receipt?" testId="receipt-offer">
              <Row label="Payment ID" value={done.id} testId="pos-payment-id" />
              <Row label="Subtotal" value={money(done.amount)} />
              <Row label="Tip" value={money(done.tip)} />
              <Row label="Total" value={money(done.amount + done.tip)} strong testId="pos-total" />
              <Field label="Email receipt to">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email receipt to" data-testid="receipt-email" />
              </Field>
              <Btn onClick={() => setStage("sent")} data-testid="send-receipt">Send receipt</Btn>
              <Btn variant="secondary" onClick={() => { setCart([]); setStage("ring"); setDone(null); }} data-testid="new-sale">New sale</Btn>
            </Card>
          </>
        )}

        {stage === "sent" && (
          <Banner tone="ok" title="Receipt sent" testId="receipt-sent">
            A receipt was emailed to {email || "the customer"}.
          </Banner>
        )}
      </Page>
    </Shell>
  );
}
