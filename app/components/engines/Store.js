"use client";
// Store orchestrator: cart -> delivery -> payment -> confirmation, configured
// per skin. Built from the Checkout engine pieces; all math via computeTotals.
import { useState } from "react";
import { sendEmail } from "@/lib/inbox";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { ADDRESSES, DEMO_USER, money, isValidEmail } from "@/lib/seed";
import { Topbar } from "../eval/SkinChrome";
import { Alert, Btn, Card, Field, Input, KV, RadioCard, Stepper, Badge } from "../eval/ui";
import { CartLines, OrderSummary, CouponBox, AddressCard, PaymentForm, Confirmation, computeTotals, orderNumber } from "./Checkout";

export function storeSeed(cfg) {
  return {
    view: cfg.startView || "cart",
    cart: cfg.seedCart || [],
    coupon: null,
    shippingId: cfg.shippingOptions?.[0]?.id || null,
    fulfil: "ship",
    storeId: cfg.pickup?.stores?.[0]?.id || null,
    pickupSlot: null,
    slotId: null,
    tip: cfg.tips ? cfg.tips.default ?? 0 : 0,
    contact: cfg.guest ? { email: "", firstName: "", lastName: "", line1: "", city: "", zip: "" } : null,
    order: null,
    seq: 1,
    extra: cfg.seedExtra || {},
  };
}

export function storeTotals(s, cfg) {
  const ship = cfg.shippingOptions?.find((o) => o.id === s.shippingId);
  const slot = cfg.slots?.find((o) => o.id === s.slotId);
  const fees = [];
  if (slot && slot.fee) fees.push({ label: slot.label + " fee", amount: slot.fee });
  if (cfg.fees) fees.push(...cfg.fees(s));
  const opts = {
    coupon: s.coupon,
    shipping: s.fulfil === "pickup" ? 0 : ship ? ship.price : cfg.shipping || 0,
    taxRate: cfg.taxRate || 0,
    tip: s.tip || 0,
    fees,
  };
  if (cfg.shippingBySeller && s.fulfil !== "pickup") {
    const bySeller = {};
    for (const l of s.cart) if (l.seller) bySeller[l.seller] = cfg.shippingBySeller[l.seller] ?? 0;
    opts.shippingBySeller = bySeller;
  }
  return computeTotals(s.cart, opts);
}

const STEP_LABELS = { cart: "Cart", delivery: "Delivery", payment: "Payment", done: "Done" };

export default function StoreCheckout({ flow, config: cfg, children }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => storeSeed(cfg));
  const steps = cfg.steps || ["cart", "delivery", "payment", "done"];
  const totals = storeTotals(s, cfg);
  const cur = cfg.currency || "USD";
  const count = s.cart.reduce((n, l) => n + (l.qty || 1), 0);
  const [errs, setErrs] = useState({});
  const go = (view) => set((st) => ({ ...st, view }));
  const ctx = { s, set, totals, cur, ent, go, count };

  function placeOrder(payment) {
    const t0 = storeTotals(s, cfg);
    sendEmail({ to: s.contact?.email || "demo@evals.dev", subject: `Your ${ent.skin} order ${orderNumber(cfg.orderPrefix || "ORD", 4471 + s.seq)} is confirmed`, body: `Thanks for your order!\n\n${s.cart.map((l) => `${l.qty || 1} × ${l.name}`).join("\n")}\n\nOrder total: ${t0.total.toFixed(2)} ${cur}`, from: `orders@${ent.skin.toLowerCase().replace(/[^a-z]/g, "")}.evals.dev`, flow: `${flow.entitySlug}/${flow.slug}` });
    set((st) => {
      const t = storeTotals(st, cfg);
      const ship = cfg.shippingOptions?.find((o) => o.id === st.shippingId);
      const slot = cfg.slots?.find((o) => o.id === st.slotId);
      const store = cfg.pickup?.stores?.find((o) => o.id === st.storeId);
      const order = {
        number: orderNumber(cfg.orderPrefix || "ORD", 4471 + st.seq),
        total: t.total,
        totals: t,
        payment,
        eta: st.fulfil === "pickup" ? `Pickup ${st.pickupSlot || ""} at ${store?.name || "store"}` : slot ? slot.window : ship?.eta || cfg.eta || "Tuesday, September 15",
        lines: st.cart,
        contact: st.contact,
        fulfil: st.fulfil,
        store,
        pickupSlot: st.pickupSlot,
        slot,
        tip: st.tip || 0,
        coupon: st.coupon,
        extra: st.extra,
      };
      return { ...st, order, view: "done", seq: st.seq + 1 };
    });
  }

  function validateDelivery() {
    const e = {};
    if (cfg.guest) {
      const c = s.contact || {};
      if (!isValidEmail(c.email)) e.email = "Enter a valid email address.";
      for (const k of ["firstName", "lastName", "line1", "city", "zip"]) if (!String(c[k] || "").trim()) e[k] = "Required";
    }
    if (cfg.slots && !s.slotId) e.slot = "Choose a delivery window to continue.";
    if (cfg.pickup && s.fulfil === "pickup" && !s.pickupSlot) e.pickupSlot = "Choose a pickup time.";
    if (cfg.validateDelivery) Object.assign(e, cfg.validateDelivery(s) || {});
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  const stepIdx = Math.max(0, steps.indexOf(s.view));
  const nextOf = (v) => steps[steps.indexOf(v) + 1];

  const header = (
    <Topbar entity={ent} nav={cfg.nav || []} active={cfg.active} light={cfg.light}
      right={<button className="ee-btn ee-btn--secondary ee-btn--sm" onClick={() => go("cart")} data-testid="cart-button">🛒 Cart <span data-testid="cart-count">{count}</span></button>} />
  );

  if (s.view !== "cart" && s.view !== "delivery" && s.view !== "payment" && s.view !== "done" && cfg.views?.[s.view]) {
    return (<>{header}<main className="ee-main">{cfg.views[s.view](ctx)}</main></>);
  }

  return (
    <>
      {header}
      <main className="ee-main">
        {cfg.title && s.view !== "done" && <h1 className="ee-page-title">{typeof cfg.title === "function" ? cfg.title(ctx) : cfg.title}</h1>}
        {s.view !== "done" && !cfg.oneClick && steps.length > 2 && <Stepper steps={steps.map((k) => STEP_LABELS[k])} current={stepIdx} />}

        {s.view === "cart" && (
          <div className="ee-split">
            <div className="ee-stack">
              {cfg.extras?.cartTop?.(ctx)}
              <Card title={`${cfg.labels?.cart || "Shopping cart"} (${count} item${count === 1 ? "" : "s"})`} right={cfg.extras?.cartRight?.(ctx)}>
                <CartLines lines={s.cart} currency={cur} showSeller={cfg.showSeller}
                  onQty={cfg.readonlyCart ? undefined : (id, qty) => set({ ...s, cart: s.cart.map((l) => (l.id === id ? { ...l, qty } : l)) })}
                  onRemove={cfg.readonlyCart ? undefined : (id) => set({ ...s, cart: s.cart.filter((l) => l.id !== id) })}
                  extra={cfg.extras?.cartLine ? (l) => cfg.extras.cartLine(l, ctx) : undefined} />
                {cfg.extras?.cartBelow?.(ctx)}
              </Card>
            </div>
            <div className="ee-stack">
              {cfg.extras?.cartAside?.(ctx)}
              <Card>
                {cfg.coupons && (
                  <>
                    <CouponBox coupon={s.coupon} onApply={(c) => set({ ...s, coupon: c })} onRemove={() => set({ ...s, coupon: null })} currency={cur} error={totals.couponError} />
                    <div className="ee-divider" />
                  </>
                )}
                <OrderSummary totals={totals} currency={cur} labels={cfg.labels} />
                {cfg.oneClick ? (
                  <div className="ee-stack" style={{ marginTop: 12 }}>
                    <div className="ee-small"><span className="ee-muted">Ship to:</span> {DEMO_USER.name}, {cfg.address?.line1 || ADDRESSES.us.line1}, {cfg.address?.city || ADDRESSES.us.city}</div>
                    <div className="ee-small"><span className="ee-muted">Pay with:</span> Visa •••• 4242</div>
                    <Btn block pill style={cfg.primaryStyle} onClick={() => placeOrder({ method: "card", brand: "Visa", last4: "4242", amount: totals.total, currency: cur })} disabled={!s.cart.length} data-testid="one-click-buy">{cfg.labels?.oneClick || "Buy now with 1-Click"}</Btn>
                  </div>
                ) : (
                  <Btn block pill style={{ marginTop: 12, ...cfg.primaryStyle }} onClick={() => go(nextOf("cart"))} disabled={!s.cart.length} data-testid="proceed-checkout">{cfg.labels?.proceed || "Proceed to checkout"}</Btn>
                )}
              </Card>
            </div>
          </div>
        )}

        {s.view === "delivery" && (
          <div className="ee-split">
            <div className="ee-stack">
              {cfg.guest && (
                <Card title="Contact and shipping" data-testid="guest-form">
                  <div className="ee-grid ee-grid--2" style={{ gap: 10 }}>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Field label="Email" htmlFor="c-email" error={errs.email}><Input id="c-email" type="email" value={s.contact.email} onChange={(e) => set({ ...s, contact: { ...s.contact, email: e.target.value } })} placeholder="you@example.com" invalid={!!errs.email} /></Field>
                    </div>
                    <Field label="First name" htmlFor="c-first" error={errs.firstName}><Input id="c-first" value={s.contact.firstName} onChange={(e) => set({ ...s, contact: { ...s.contact, firstName: e.target.value } })} invalid={!!errs.firstName} /></Field>
                    <Field label="Last name" htmlFor="c-last" error={errs.lastName}><Input id="c-last" value={s.contact.lastName} onChange={(e) => set({ ...s, contact: { ...s.contact, lastName: e.target.value } })} invalid={!!errs.lastName} /></Field>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Field label="Address" htmlFor="c-line1" error={errs.line1}><Input id="c-line1" value={s.contact.line1} onChange={(e) => set({ ...s, contact: { ...s.contact, line1: e.target.value } })} invalid={!!errs.line1} /></Field>
                    </div>
                    <Field label="City" htmlFor="c-city" error={errs.city}><Input id="c-city" value={s.contact.city} onChange={(e) => set({ ...s, contact: { ...s.contact, city: e.target.value } })} invalid={!!errs.city} /></Field>
                    <Field label="ZIP / Postal code" htmlFor="c-zip" error={errs.zip}><Input id="c-zip" value={s.contact.zip} onChange={(e) => set({ ...s, contact: { ...s.contact, zip: e.target.value } })} invalid={!!errs.zip} /></Field>
                  </div>
                </Card>
              )}
              {!cfg.guest && !cfg.hideAddress && <AddressCard address={cfg.address || ADDRESSES.us} editable title={s.fulfil === "pickup" ? "Billing address" : "Shipping address"} />}
              {cfg.pickup && (
                <Card title="How do you want to get your order?" data-testid="fulfilment">
                  <div className="ee-stack" role="radiogroup" aria-label="Fulfilment">
                    <RadioCard name="fulfil" value="ship" checked={s.fulfil === "ship"} onChange={() => set({ ...s, fulfil: "ship" })} title="Shipping" desc={`Arrives ${cfg.shippingOptions?.[0]?.eta || cfg.eta || "in 2-3 days"}`} right={cfg.shippingOptions?.[0]?.price ? money(cfg.shippingOptions[0].price, cur) : "Free"} />
                    <RadioCard name="fulfil" value="pickup" checked={s.fulfil === "pickup"} onChange={() => set({ ...s, fulfil: "pickup" })} title="Free pickup" desc="Ready today at a store near you" right="Free" />
                  </div>
                  {s.fulfil === "pickup" && (
                    <div className="ee-stack" style={{ marginTop: 12 }} data-testid="pickup-options">
                      <Field label="Store" htmlFor="pickup-store">
                        <select id="pickup-store" className="ee-select" value={s.storeId || ""} onChange={(e) => set({ ...s, storeId: e.target.value })}>
                          {cfg.pickup.stores.map((st) => <option key={st.id} value={st.id}>{st.name} · {st.distance}</option>)}
                        </select>
                      </Field>
                      <Field label="Pickup time" error={errs.pickupSlot}>
                        <div className="ee-slots">
                          {cfg.pickup.slots.map((sl) => (
                            <button key={sl} type="button" className="ee-slot" data-selected={s.pickupSlot === sl ? "true" : "false"} aria-pressed={s.pickupSlot === sl} onClick={() => set({ ...s, pickupSlot: sl })}>{sl}</button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  )}
                </Card>
              )}
              {cfg.shippingOptions && cfg.shippingOptions.length > 1 && s.fulfil !== "pickup" && (
                <Card title="Shipping method">
                  <div className="ee-stack" role="radiogroup" aria-label="Shipping method">
                    {cfg.shippingOptions.map((o) => (
                      <RadioCard key={o.id} name="ship" value={o.id} checked={s.shippingId === o.id} onChange={(v) => set({ ...s, shippingId: v })} title={o.label} desc={o.eta} right={o.price === 0 ? "Free" : money(o.price, cur)} />
                    ))}
                  </div>
                </Card>
              )}
              {cfg.slots && (
                <Card title={cfg.labels?.slots || "Choose a delivery window"} data-testid="slots">
                  <div className="ee-stack" role="radiogroup" aria-label="Delivery window">
                    {cfg.slots.map((o) => (
                      <RadioCard key={o.id} name="slot" value={o.id} checked={s.slotId === o.id} onChange={(v) => set({ ...s, slotId: v })} title={o.label} desc={o.window} right={o.fee === 0 ? "Free" : `+${money(o.fee, cur)}`} />
                    ))}
                  </div>
                  {errs.slot && <div className="ee-error" role="alert" style={{ marginTop: 8 }}>{errs.slot}</div>}
                </Card>
              )}
              {cfg.extras?.delivery?.(ctx, errs)}
            </div>
            <div className="ee-stack">
              <Card>
                <OrderSummary totals={totals} currency={cur} labels={cfg.labels} extraRows={cfg.extras?.summaryRows?.(ctx) || []} />
                <div className="ee-row" style={{ marginTop: 12 }}>
                  <Btn variant="secondary" onClick={() => go("cart")}>Back</Btn>
                  <Btn style={{ flex: 1, ...cfg.primaryStyle }} onClick={() => validateDelivery() && go(nextOf("delivery"))} data-testid="continue-payment">{cfg.labels?.toPayment || "Continue to payment"}</Btn>
                </div>
              </Card>
            </div>
          </div>
        )}

        {s.view === "payment" && (
          <div className="ee-split">
            <div className="ee-stack">
              {cfg.extras?.paymentTop?.(ctx)}
              {cfg.tips && (
                <Card title="Add a tip for your shopper" data-testid="tip-picker">
                  <div className="ee-row">
                    {cfg.tips.options.map((t) => (
                      <button key={t} type="button" className="ee-chip" data-active={s.tip === t ? "true" : "false"} aria-pressed={s.tip === t} onClick={() => set({ ...s, tip: t })}>{t === 0 ? "No tip" : money(t, cur)}</button>
                    ))}
                  </div>
                </Card>
              )}
              <Card title={cfg.labels?.payment || "Payment"}>
                <PaymentForm amount={totals.total} currency={cur} savedCards={cfg.payment?.savedCards || []} methods={cfg.payment?.methods || ["card"]} defaultMethod={cfg.payment?.defaultMethod} allow3ds={cfg.payment?.allow3ds ?? true} onSuccess={placeOrder} buttonLabel={cfg.labels?.pay} extraMethodUI={cfg.extras?.paymentMethod ? (m) => cfg.extras.paymentMethod(m, ctx) : undefined} />
              </Card>
            </div>
            <div className="ee-stack">
              <Card>
                <OrderSummary totals={totals} currency={cur} labels={cfg.labels} extraRows={cfg.extras?.summaryRows?.(ctx) || []} />
                {s.fulfil === "pickup" && s.storeId && (
                  <div className="ee-small" style={{ marginTop: 10 }} data-testid="summary-pickup">
                    <span className="ee-muted">Pickup:</span> <b>{cfg.pickup.stores.find((x) => x.id === s.storeId)?.name}</b> · {s.pickupSlot}
                  </div>
                )}
                <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => go(steps[steps.indexOf("payment") - 1])}>Back</Btn>
              </Card>
            </div>
          </div>
        )}

        {s.view === "done" && s.order && (
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Confirmation order={s.order} currency={cur} title={cfg.labels?.thanks} extra={[
              ...(s.order.fulfil === "pickup" ? [{ k: "Pickup store", v: s.order.store?.name, testId: "confirm-store" }, { k: "Pickup time", v: s.order.pickupSlot, testId: "confirm-pickup-slot" }] : []),
              ...(s.order.slot ? [{ k: "Delivery window", v: s.order.slot.window, testId: "confirm-window" }] : []),
              ...(s.order.coupon ? [{ k: "Discount", v: `${s.order.coupon.code} (−${money(s.order.totals.discount, cur)})`, testId: "confirm-discount" }] : []),
              ...(cfg.extras?.confirmRows?.(s.order, ctx) || []),
            ]}>
              <div className="ee-divider" />
              <div className="ee-strong ee-small" style={{ marginBottom: 6 }}>Items</div>
              <CartLines lines={s.order.lines} currency={cur} showSeller={cfg.showSeller} extra={cfg.extras?.confirmLine ? (l) => cfg.extras.confirmLine(l, ctx) : undefined} />
              {cfg.extras?.confirmChildren?.(ctx)}
            </Confirmation>
          </div>
        )}
        {children && children(ctx)}
      </main>
    </>
  );
}
