"use client";
// Revolat (Revolut) clone: a freezable virtual card that actually declines while
// frozen, currency pockets you exchange between, bill splitting with contacts,
// and a savings vault fed by round-ups.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Revolat", slug: "revolut", mark: "◈",
  home: "/revolut-clone-app", accent: "#191c1f", accentText: "#fff", bg: "#f5f6f7" };
export const BASE = "/revolut-clone-app";

export const SYM = { USD: "$", EUR: "€", GBP: "£" };
export const RATES = { "USD-EUR": 0.92, "EUR-USD": 1.087, "USD-GBP": 0.79, "GBP-USD": 1.266,
                       "EUR-GBP": 0.858, "GBP-EUR": 1.165 };
export const rateFor = (a, b) => (a === b ? 1 : RATES[`${a}-${b}`] || 1);
export const fmt = (n, c) => (SYM[c] || "") + Number(n).toFixed(2);

export const CONTACTS = [
  { id: "c_tom", name: "Tom Alvarez" },
  { id: "c_mira", name: "Mira Shah" },
  { id: "c_dan", name: "Dan Okafor" },
];

export const ROUNDUP_MULTIPLIERS = [1, 2, 5];

const SEED = {
  cardFrozen: false,
  pockets: [
    { currency: "USD", amount: 1240.5 },
    { currency: "EUR", amount: 180.0 },
    { currency: "GBP", amount: 60.0 },
  ],
  transactions: [
    { id: "t1", merchant: "Metro Grocer", amount: 42.15, currency: "USD", at: "2026-09-14", split: null },
    { id: "t2", merchant: "Ridehail", amount: 18.4, currency: "USD", at: "2026-09-13", split: null },
    { id: "t3", merchant: "Corner Cafe", amount: 9.35, currency: "USD", at: "2026-09-12", split: null },
  ],
  declined: [],
  vault: { enabled: false, name: "Rainy day", balance: 0, multiplier: 1, roundups: [] },
  counter: 300,
};

export const { useStore, reset } = createStore("revolut", SEED);

/** Round-up on a purchase: difference to the next whole unit, times the multiplier. */
export function roundUpFor(amount, multiplier) {
  const up = +(Math.ceil(amount) - amount).toFixed(2);
  return +((up === 0 ? 1 : up) * multiplier).toFixed(2);
}
