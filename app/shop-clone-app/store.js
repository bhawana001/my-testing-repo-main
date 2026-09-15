"use client";
// Persistent account state for the ShopKart (Amazon) clone: orders, returns,
// addresses and saved cards. Everything a signed-in shopper would carry between
// pages lives here, so search -> product -> buy -> track -> return is one
// continuous session rather than five disconnected screens.
//
// Deterministic by design: the seed is fixed (no random ids, no "now"-relative
// dates) so a test asserting "order 112-4419602-7831456 is Delivered" is stable.
// `?reset=true` on any route restores this exact seed.
import { useCallback, useEffect, useState } from "react";

const KEY = "shopkart_account";
export const STORE_EVENT = "shopkart:store";

// Two seeded orders cover the post-purchase journeys: one still in transit
// (tracking) and one already delivered (returns). A third is archived so the
// order list has history to filter through.
export const SEED = {
  profile: { name: "Priya Nair", email: "priya.nair@example.com", prime: true },
  addresses: [
    { id: "addr_home", label: "Home", line1: "418 Maple Street", city: "Austin", state: "TX", zip: "78701", country: "United States", default: true },
    { id: "addr_work", label: "Work", line1: "2100 Congress Ave, Suite 400", city: "Austin", state: "TX", zip: "78704", country: "United States", default: false },
  ],
  cards: [
    { id: "card_visa", brand: "Visa", last4: "4242", exp: "12/34", default: true },
    { id: "card_mc", brand: "Mastercard", last4: "5455", exp: "08/28", default: false },
  ],
  orders: [
    {
      id: "112-4419602-7831456",
      placedAt: "2026-09-02",
      status: "delivered",
      deliveredOn: "Friday, September 5",
      addressId: "addr_home",
      cardId: "card_visa",
      items: [{ productId: "sku_headset", variant: "Midnight Black · Wireless", qty: 1, price: 79.99 }],
      total: 86.39,
      returnable: true,
      returnWindowEnds: "October 5, 2026",
    },
    {
      id: "112-8830571-2094318",
      placedAt: "2026-09-10",
      status: "shipped",
      carrier: "ShopKart Logistics",
      trackingId: "TBA304991285001",
      eta: "Tuesday, September 16",
      addressId: "addr_home",
      cardId: "card_visa",
      items: [{ productId: "sku_lamp", variant: "White · 3000K", qty: 2, price: 27.99 }],
      total: 60.46,
      returnable: false,
    },
    {
      id: "112-2207744-6610923",
      placedAt: "2026-08-14",
      status: "delivered",
      deliveredOn: "Monday, August 18",
      addressId: "addr_work",
      cardId: "card_mc",
      items: [{ productId: "sku_mug", variant: "12 oz · Reactive Blue", qty: 1, price: 24.0 }],
      total: 25.92,
      returnable: false,
      returnWindowEnds: "September 13, 2026",
    },
  ],
  returns: [],
};

// Where an order sits on the delivery timeline. Index drives the progress bar.
export const TIMELINE = ["Ordered", "Shipped", "Out for delivery", "Delivered"];
export function stageIndex(status) {
  if (status === "placed") return 0;
  if (status === "shipped") return 1;
  if (status === "out_for_delivery") return 2;
  return 3;
}

function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && parsed.orders ? parsed : null;
  } catch {
    return null;
  }
}
function write(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent(STORE_EVENT));
  } catch {}
}
export function resetAccount() {
  const fresh = structuredClone(SEED);
  write(fresh);
  return fresh;
}

/**
 * Account state bound to localStorage. Returns the seed on the server and on
 * the first client render so markup matches, then swaps in stored state.
 * `?reset=true` re-seeds before the first read.
 */
export function useAccount() {
  const [state, setState] = useState(SEED);

  useEffect(() => {
    const wantsReset =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("reset") === "true";
    if (wantsReset) {
      setState(resetAccount());
    } else {
      setState(read() || resetAccount());
    }
    const sync = () => setState(read() || SEED);
    window.addEventListener(STORE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STORE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn) => {
    setState((prev) => {
      const next = fn(structuredClone(prev));
      write(next);
      return next;
    });
  }, []);

  return [state, update];
}

// --- Order helpers -------------------------------------------------------

// Sequential, non-random order ids so a placed order is assertable.
export function nextOrderId(orders) {
  const n = 9000000 + orders.length * 137;
  return `112-${String(n).slice(0, 7)}-${String(n * 3).slice(0, 7)}`;
}

export function placeOrder(update, { items, total, addressId, cardId }) {
  let placed = null;
  update((s) => {
    const order = {
      id: nextOrderId(s.orders),
      placedAt: "2026-09-15",
      status: "placed",
      addressId: addressId || s.addresses.find((a) => a.default).id,
      cardId: cardId || s.cards.find((c) => c.default).id,
      carrier: "ShopKart Logistics",
      trackingId: "TBA" + (305000000000 + s.orders.length * 7).toString().slice(0, 12),
      eta: "Thursday, September 18",
      items,
      total,
      returnable: false,
    };
    placed = order;
    s.orders.unshift(order);
    return s;
  });
  return placed;
}

export const RETURN_REASONS = [
  "Item arrived damaged",
  "Wrong item was sent",
  "No longer needed",
  "Better price available",
  "Item defective or does not work",
];
export const RETURN_METHODS = [
  { id: "dropoff", label: "Drop off at ShopKart Locker", detail: "Free · no box needed" },
  { id: "pickup", label: "Schedule a pickup", detail: "Free · Tue, Sep 17" },
  { id: "mail", label: "Mail it back yourself", detail: "$4.99 shipping deducted from refund" },
];

export function createReturn(update, { orderId, reason, method, comment }) {
  let created = null;
  update((s) => {
    const order = s.orders.find((o) => o.id === orderId);
    if (!order) return s;
    const refund = Number(order.total.toFixed(2)) - (method === "mail" ? 4.99 : 0);
    const ret = {
      id: "RMA-" + (48210 + s.returns.length * 13),
      orderId,
      reason,
      method,
      comment: comment || "",
      refund: Number(refund.toFixed(2)),
      status: "Return started",
      createdAt: "2026-09-15",
    };
    created = ret;
    s.returns.unshift(ret);
    order.returnStatus = "Return started";
    order.returnable = false;
    return s;
  });
  return created;
}
