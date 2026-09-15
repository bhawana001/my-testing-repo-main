"use client";
// Checkout: pickup store and time slot (4.1) plus the Wallmark+ upsell (4.3).
// The upsell fires when a paid express slot is chosen, which is the moment a
// membership would actually save money -- and the modal closes cleanly either
// way, which is what the use case checks.
import { useState } from "react";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Row, Radio, Badge, Banner, Empty, Modal, Select, Field } from "../../clones/kit/ui";
import { BRAND, BASE, STORES, PICKUP_SLOTS, SUBSTITUTION_CHOICES, MEMBERSHIP, useStore, money, totals, findProduct } from "../shared";

export default function CheckoutPage() {
  const [s, update] = useStore();
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [plan, setPlan] = useState("annual");
  const [placed, setPlaced] = useState(null);

  const store = STORES.find((x) => x.id === s.storeId) || STORES[0];
  const slot = PICKUP_SLOTS.find((x) => x.id === s.slotId);
  const t = totals(s.cart, s.slotId, s.isMember);

  function chooseSlot(id) {
    update((st) => { st.slotId = id; return st; });
    const picked = PICKUP_SLOTS.find((x) => x.id === id);
    // Only worth pitching the membership when it would save this order money.
    if (picked?.fee > 0 && !s.isMember) setUpsellOpen(true);
  }

  function joinMembership() {
    update((st) => { st.isMember = true; return st; });
    setUpsellOpen(false);
  }

  function placeOrder() {
    const id = "W-" + (s.counter + 1);
    const order = {
      id, placedAt: "2026-09-15", total: t.total, fulfilment: s.fulfilment,
      storeId: s.storeId, slot: slot?.label || "Not selected", status: "Ready soon",
      items: s.cart.map((l) => ({ ...l })),
      substitutions: { ...s.substitutions },
    };
    update((st) => {
      st.orders.unshift(order);
      st.counter += 1;
      st.cart = [];
      st.slotId = null;
      return st;
    });
    setPlaced(order);
  }

  if (placed) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Keep shopping" }, { href: `${BASE}/orders`, label: "Orders" }]} />
        <Page>
          <Banner tone="ok" title="Order placed" testId="order-confirmation">
            Order <strong data-testid="order-id">{placed.id}</strong> is confirmed.
          </Banner>
          <Card title="Pickup details">
            <Row label="Pickup store" value={store.name} testId="pickup-store" />
            <Row label="Store address" value={store.address} />
            <Row label="Pickup time" value={placed.slot} testId="pickup-slot" />
            <Row label="Order total" value={money(placed.total)} strong testId="order-total" />
          </Card>
          <Card title="Substitution preferences" testId="order-subs">
            {placed.items.filter((l) => findProduct(l.id)?.substitutable).map((l) => (
              <Row key={l.id} label={l.title} testId={`order-sub-${l.id}`}
                   value={SUBSTITUTION_CHOICES.find((c) => c.id === (placed.substitutions[l.id] || "best")).label} />
            ))}
          </Card>
        </Page>
      </Shell>
    );
  }

  if (s.cart.length === 0) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Shop" }]} />
        <Page title="Checkout"><Empty>Your cart is empty. <Link href={BASE}>Add items</Link>.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Back to cart" }]} />
      <Page title="Checkout">
        <div className="ck-split">
          <div>
            <Card title="How do you want it?" testId="fulfilment">
              <Radio name="ful" label="Free pickup at store" detail="Ready today · no fee" testId="ful-pickup"
                     checked={s.fulfilment === "pickup"} onChange={() => update((st) => { st.fulfilment = "pickup"; return st; })} />
              <Radio name="ful" label="Delivery to home" detail="From your store" testId="ful-delivery"
                     checked={s.fulfilment === "delivery"} onChange={() => update((st) => { st.fulfilment = "delivery"; return st; })} />
            </Card>

            <Card title="Pickup store" testId="store-picker">
              <Field label="Choose a store">
                <Select value={s.storeId} aria-label="Pickup store" data-testid="store-select"
                        onChange={(e) => update((st) => { st.storeId = e.target.value; return st; })}>
                  {STORES.map((x) => <option key={x.id} value={x.id}>{x.name} · {x.distance}</option>)}
                </Select>
              </Field>
              <div className="ck-muted" data-testid="store-address">{store.address}</div>
            </Card>

            <Card title="Pickup time" testId="slot-picker">
              {PICKUP_SLOTS.map((x) => (
                <Radio key={x.id} name="slot" testId={`slot-${x.id}`}
                       label={x.label}
                       detail={x.fee ? (s.isMember ? `${money(x.fee)} — free with ${MEMBERSHIP.name}` : `${money(x.fee)} express fee`) : "Free"}
                       checked={s.slotId === x.id} onChange={() => chooseSlot(x.id)} />
              ))}
            </Card>
          </div>

          <Card title="Order summary">
            <Row label="Subtotal" value={money(t.subtotal)} testId="sum-subtotal" />
            <Row label="Pickup fee" value={t.slotFee === 0 ? "Free" : money(t.slotFee)} testId="sum-slotfee" />
            <Row label="Tax" value={money(t.tax)} />
            <Row label="Total" value={money(t.total)} strong testId="sum-total" />
            {s.isMember && <Badge tone="ok" testId="member-badge">{MEMBERSHIP.name} member</Badge>}
            <Row label="Pickup store" value={store.name} testId="summary-store" />
            <Row label="Pickup slot" value={slot ? slot.label : "Choose a time"} testId="summary-slot" />
            <Btn block disabled={!s.slotId} onClick={placeOrder} data-testid="place-order">
              {s.slotId ? "Place order" : "Choose a pickup time"}
            </Btn>
          </Card>
        </div>
      </Page>

      <Modal open={upsellOpen} title={`Save on this order with ${MEMBERSHIP.name}`} onClose={() => setUpsellOpen(false)}
             testId="membership-modal"
             actions={<>
               <Btn variant="secondary" onClick={() => setUpsellOpen(false)} data-testid="decline-membership">No thanks</Btn>
               <Btn onClick={joinMembership} data-testid="join-membership">
                 Start {plan === "annual" ? "annual" : "monthly"} plan
               </Btn>
             </>}>
        <p>Express pickup is free for members. Your plan options:</p>
        <Radio name="plan" testId="plan-annual" label={`Annual — ${money(MEMBERSHIP.annual)}/year`}
               detail={`Works out to ${money(MEMBERSHIP.annual / 12)}/month`}
               checked={plan === "annual"} onChange={() => setPlan("annual")} />
        <Radio name="plan" testId="plan-monthly" label={`Monthly — ${money(MEMBERSHIP.monthly)}/month`}
               detail="Cancel any time"
               checked={plan === "monthly"} onChange={() => setPlan("monthly")} />
        <ul className="ck-muted" style={{ marginTop: 10 }}>
          {MEMBERSHIP.perks.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </Modal>
    </Shell>
  );
}
