"use client";
// Checkout (7.3): every store cart picks its own delivery window and pays its
// own fees, so the confirmation lists a window per store rather than one for
// the whole order.
import { useState } from "react";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Row, Radio, Badge, Banner, Empty, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, STORES, SLOTS, TIP_PRESETS, useStore, money, storeTotals, findItem, findStore } from "../shared";

export default function CheckoutPage() {
  const [s, update] = useStore();
  const [card, setCard] = useState("");
  const [tip, setTip] = useState(5);
  const [err, setErr] = useState("");
  const [placed, setPlaced] = useState(null);

  const storeIds = Object.keys(s.carts).filter((id) => s.carts[id]?.length);
  const carts = storeIds.map((id) => ({ storeId: id, list: s.carts[id] }));
  const perStore = carts.map((c) => ({
    store: findStore(c.storeId),
    lines: c.list,
    slotId: s.slots[c.storeId] || null,
    t: storeTotals(c, s.slots[c.storeId], 0),
  }));
  const tipShare = +(tip / Math.max(perStore.length, 1)).toFixed(2);
  const grand = +(perStore.reduce((n, p) => n + p.t.total, 0) + tip).toFixed(2);
  const allSlotted = perStore.every((p) => p.slotId);

  function place() {
    const digits = card.replace(/\s+/g, "");
    if (digits.length < 15) { setErr("Enter a valid card. Test card: 4242 4242 4242 4242"); return; }
    if (!allSlotted) { setErr("Choose a delivery window for every store."); return; }
    setErr("");
    const id = "IC-" + (s.counter + 1);
    const order = {
      id, at: "2026-09-15", tip, total: grand, status: "delivered",
      stores: perStore.map((p) => ({
        storeId: p.store.id, storeName: p.store.name,
        slot: SLOTS.find((x) => x.id === p.slotId).label,
        window: SLOTS.find((x) => x.id === p.slotId).window,
        fees: { service: p.t.serviceFee, delivery: p.t.deliveryFee, slot: p.t.slotFee },
        items: p.lines.map((l) => ({ itemId: l.itemId, title: findItem(l.itemId).title, qty: l.qty, price: findItem(l.itemId).price })),
        subtotal: p.t.items, total: p.t.total,
      })),
      replacements: { ...s.replacements },
    };
    update((st) => {
      st.orders.unshift(order);
      st.counter += 1;
      st.carts = {};
      st.slots = {};
      return st;
    });
    setPlaced(order);
  }

  if (placed) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Shop" }, { href: `${BASE}/orders`, label: "Orders" }]} />
        <Page>
          <Banner tone="ok" title="Order placed" testId="order-confirmation">
            Order <strong data-testid="order-id">{placed.id}</strong> confirmed.
          </Banner>
          {placed.stores.map((st) => (
            <Card key={st.storeId} title={st.storeName} testId={`confirm-store-${st.storeId}`}>
              <Row label="Delivery window" value={`${st.slot} · ${st.window}`} testId={`confirm-slot-${st.storeId}`} />
              <Row label="Service fee" value={money(st.fees.service)} testId={`confirm-service-${st.storeId}`} />
              <Row label="Delivery fee" value={st.fees.delivery === 0 ? "Free" : money(st.fees.delivery)} testId={`confirm-delivery-${st.storeId}`} />
              {st.fees.slot > 0 && <Row label="Priority fee" value={money(st.fees.slot)} testId={`confirm-priority-${st.storeId}`} />}
              <Row label="Store total" value={money(st.total)} strong />
            </Card>
          ))}
          <Card title="Payment">
            <Row label="Tip" value={money(placed.tip)} testId="confirm-tip" />
            <Row label="Order total" value={money(placed.total)} strong testId="confirm-total" />
          </Card>
          <Btn as="link" href={`${BASE}/orders`} data-testid="view-order">View order & adjust tip</Btn>
        </Page>
      </Shell>
    );
  }

  if (storeIds.length === 0) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Shop" }]} />
        <Page title="Checkout"><Empty>Your carts are empty. <Link href={BASE}>Add groceries</Link>.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Back to shopping" }]} />
      <Page title="Checkout" sub={`${perStore.length} store${perStore.length === 1 ? "" : "s"} · each delivers separately`}>
        <div className="ck-split">
          <div>
            {perStore.map((p) => (
              <Card key={p.store.id} title={`${p.store.emoji} ${p.store.name}`} testId={`checkout-store-${p.store.id}`}>
                {p.lines.map((l) => (
                  <Row key={l.itemId} label={`${findItem(l.itemId).title} × ${l.qty}`}
                       value={money(findItem(l.itemId).price * l.qty)} />
                ))}
                <div className="ck-strong" style={{ margin: "10px 0 6px" }}>Delivery window</div>
                {SLOTS.map((sl) => (
                  <Radio key={sl.id} name={`slot-${p.store.id}`} testId={`slot-${p.store.id}-${sl.id}`}
                         label={`${sl.label} · ${sl.window}`}
                         detail={sl.fee ? `${money(sl.fee)} priority fee` : "No extra fee"}
                         checked={p.slotId === sl.id}
                         onChange={() => update((st) => { st.slots[p.store.id] = sl.id; return st; })} />
                ))}
                <Row label="Subtotal" value={money(p.t.items)} />
                <Row label="Service fee" value={money(p.t.serviceFee)} testId={`fee-service-${p.store.id}`} />
                <Row label="Delivery fee" value={p.t.deliveryFee === 0 ? "Free" : money(p.t.deliveryFee)} />
                {p.t.slotFee > 0 && <Row label="Priority fee" value={money(p.t.slotFee)} testId={`fee-priority-${p.store.id}`} />}
                <Row label="Store total" value={money(p.t.total)} strong testId={`store-total-${p.store.id}`} />
              </Card>
            ))}
          </div>

          <Card title="Payment">
            <Field label="Card number" error={err} hint="Test card 4242 4242 4242 4242">
              <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                     placeholder="4242 4242 4242 4242" aria-label="Card number" data-testid="card" />
            </Field>
            <div className="ck-strong" style={{ margin: "8px 0 6px" }}>Tip your shopper</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }} data-testid="tip-presets">
              {TIP_PRESETS.map((v) => (
                <Btn key={v} size="sm" variant={tip === v ? "primary" : "secondary"}
                     onClick={() => setTip(v)} data-testid={`tip-${v}`}>{money(v)}</Btn>
              ))}
            </div>
            <Row label="Tip" value={money(tip)} testId="tip-amount" />
            <Row label="Order total" value={money(grand)} strong testId="grand-total" />
            <Btn block onClick={place} data-testid="place-order">Place order</Btn>
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
