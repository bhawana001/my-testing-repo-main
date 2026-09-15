"use client";
// Klarnah (Klarna) clone: pay-in-4 at a merchant checkout, a real credit
// decision that can decline, and an app view whose schedule recalculates when
// part of the order is returned.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Klarnah", slug: "klarna", mark: "◒",
  home: "/klarna-clone-app", accent: "#ffb3c7", accentText: "#17120f", bg: "#fdf6f8" };
export const BASE = "/klarna-clone-app";
export { money };

export const CART = {
  merchant: "Studio Lamps",
  items: [
    { id: "l_arc", name: "Arc Floor Lamp", price: 120.0, qty: 1 },
    { id: "l_bulb", name: "Warm LED Bulbs (4 pack)", price: 60.0, qty: 1 },
  ],
};
export const cartTotal = () => CART.items.reduce((n, i) => n + i.price * i.qty, 0);

// The SSN-style last four decides the credit outcome, so the decline path is
// reachable deterministically rather than at random.
export const DECLINE_CODE = "0000";
export const INSTALMENT_DATES = ["2026-09-15", "2026-09-29", "2026-10-13", "2026-10-27"];

export function scheduleFor(total) {
  const per = Math.floor((total / 4) * 100) / 100;
  const last = +(total - per * 3).toFixed(2);
  return INSTALMENT_DATES.map((date, i) => ({
    n: i + 1, date, amount: i === 3 ? last : per,
    status: i === 0 ? "Paid" : "Scheduled",
  }));
}

const SEED = {
  order: null,       // { id, total, schedule, items }
  returns: [],
  counter: 3300,
};
export const { useStore, reset } = createStore("klarna", SEED);
