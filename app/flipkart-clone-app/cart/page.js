"use client";
// Cart with exchange offer (3.2). Picking a device and condition subtracts a
// real valuation from the payable amount, and the summary shows every term so
// the arithmetic can be checked line by line.
import { useState } from "react";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty, Field, Select, Radio, Modal } from "../../clones/kit/ui";
import { BRAND, BASE, EXCHANGE_MODELS, CONDITIONS, useStore, money, cartTotals, findProduct } from "../shared";

export default function CartPage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(false);
  // Nothing is pre-chosen: a real exchange quote makes you pick your device and
  // its condition, and Apply stays disabled until both are set.
  const [modelId, setModelId] = useState("");
  const [condition, setCondition] = useState("");

  const hasExchangeable = s.cart.some((l) => findProduct(l.id)?.exchange);
  const t = cartTotals(s.cart, s.exchange, "prepaid");
  const model = EXCHANGE_MODELS.find((m) => m.id === modelId) || null;
  const quote = model && condition ? model[condition] : null;

  function applyExchange() {
    const value = model[condition];
    update((st) => {
      st.exchange = { modelId, condition, value, label: model.label };
      return st;
    });
    setOpen(false);
    setModelId("");
    setCondition("");
  }
  const removeExchange = () => update((st) => { st.exchange = null; return st; });

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Continue shopping" }, { href: `${BASE}/rewards`, label: "SuperCoins" }]} />
      <Page title="My Cart">
        {s.cart.length === 0 ? (
          <Empty>Your cart is empty. <Link href={BASE}>Start shopping</Link>.</Empty>
        ) : (
          <div className="ck-split">
            <div>
              <Card testId="cart-lines">
                {s.cart.map((l, i) => (
                  <div key={i} className="ck-row" data-testid={`line-${i}`}>
                    <span>
                      <span aria-hidden="true">{l.emoji}</span> <strong>{l.title}</strong>
                      {l.variant && <span className="ck-muted"> — {l.variant}</span>}
                      <br />
                      <Btn variant="ghost" size="sm" data-testid={`remove-${i}`}
                           onClick={() => update((st) => { st.cart.splice(i, 1); if (!st.cart.some((x) => findProduct(x.id)?.exchange)) st.exchange = null; return st; })}>
                        Remove
                      </Btn>
                    </span>
                    <span data-testid={`line-total-${i}`}>{money(l.price * l.qty)}</span>
                  </div>
                ))}
              </Card>

              {hasExchangeable && (
                <Card title="Exchange offer" tone="warn" testId="exchange-card">
                  {s.exchange ? (
                    <>
                      <Badge tone="ok" testId="exchange-applied">
                        {s.exchange.label} · {CONDITIONS.find((c) => c.id === s.exchange.condition).label.split(" —")[0]}
                      </Badge>
                      <Row label="Exchange value" value={`−${money(s.exchange.value)}`} testId="exchange-value" />
                      <Btn variant="ghost" size="sm" onClick={removeExchange} data-testid="remove-exchange">Remove exchange</Btn>
                    </>
                  ) : (
                    <>
                      <p className="ck-muted">Trade in your old phone and save up to {money(9500)} on this order.</p>
                      <Btn variant="secondary" onClick={() => setOpen(true)} data-testid="add-exchange">Check exchange offer</Btn>
                    </>
                  )}
                </Card>
              )}
            </div>

            <Card title="Price details">
              <Row label={`Price (${s.cart.length} item${s.cart.length === 1 ? "" : "s"})`} value={money(t.subtotal)} testId="summary-subtotal" />
              {s.exchange && <Row label="Exchange discount" value={`−${money(t.exchangeValue)}`} testId="summary-exchange" />}
              <Row label="Delivery" value={t.delivery === 0 ? "Free" : money(t.delivery)} testId="summary-delivery" />
              <Row label="Total payable" value={money(t.payable)} strong testId="summary-payable" />
              <p className="ck-muted">You will earn {t.coinsEarned} SuperCoins on this order.</p>
              <Btn as="link" href={`${BASE}/checkout`} block data-testid="place-order">Place order</Btn>
            </Card>
          </div>
        )}
      </Page>

      <Modal open={open} title="Exchange your old phone" onClose={() => setOpen(false)} testId="exchange-modal"
             actions={<>
               <Btn variant="secondary" onClick={() => setOpen(false)}>Cancel</Btn>
               <Btn onClick={applyExchange} disabled={quote === null} data-testid="confirm-exchange">
                 {quote === null ? "Apply exchange" : `Apply ${money(quote)}`}
               </Btn>
             </>}>
        <Field label="Your device">
          <Select value={modelId} onChange={(e) => setModelId(e.target.value)} aria-label="Your device" data-testid="exchange-model">
            <option value="">Select your device</option>
            {EXCHANGE_MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </Select>
        </Field>
        <div className="ck-strong" style={{ margin: "8px 0 6px" }}>Condition</div>
        {CONDITIONS.map((c) => (
          <Radio key={c.id} name="cond" label={model ? `${c.label} — ${money(model[c.id])}` : c.label} testId={`cond-${c.id}`}
                 checked={condition === c.id} onChange={() => setCondition(c.id)} />
        ))}
        {quote === null && (
          <p className="ck-muted" data-testid="exchange-hint">Choose your device and its condition to see the exchange value.</p>
        )}
      </Modal>
    </Shell>
  );
}
