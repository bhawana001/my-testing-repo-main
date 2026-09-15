"use client";
// PayPaal (PayPal) clone: a merchant checkout that opens the PayPaal approval
// window, guest card payments for people without an account, P2P sends with
// live FX, and disputes raised from the activity feed.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "PayPaal", slug: "paypal", mark: "₱",
  home: "/paypal-clone-app", accent: "#003087", accentText: "#fff", bg: "#f5f7fa" };
export const BASE = "/paypal-clone-app";
export { money };

export const ACCOUNT = { name: "Priya Nair", email: "priya.nair@example.com", balance: 842.15,
  card: { brand: "Visa", last4: "4242" }, bank: "Chaise Bank ••••8841" };

export const CONTACTS = [
  { id: "c_tom", name: "Tom Alvarez", email: "tom.alvarez@example.com", country: "US", currency: "USD" },
  { id: "c_mira", name: "Mira Shah", email: "mira.shah@example.in", country: "IN", currency: "INR" },
  { id: "c_luc", name: "Luc Moreau", email: "luc.moreau@example.fr", country: "FR", currency: "EUR" },
];

// Mid-market rates plus the spread PayPaal charges, so the quoted rate and the
// converted amount can both be checked.
export const RATES = { USD: 1, INR: 83.42, EUR: 0.92 };
export const FX_SPREAD = 0.035;
export function convert(amountUsd, currency) {
  const mid = RATES[currency];
  const rate = +(mid * (1 - FX_SPREAD)).toFixed(4);
  const converted = +(amountUsd * rate).toFixed(2);
  const fee = +(amountUsd * 0.005 + 0.3).toFixed(2);
  return { mid, rate, converted, fee, spreadPct: FX_SPREAD * 100 };
}

export const DISPUTE_REASONS = [
  "I did not receive the item",
  "The item is significantly not as described",
  "I was charged more than once",
  "I did not authorise this payment",
];

export const CART = { merchant: "Alder & Oak", item: "Heavyweight Cotton Tee", amount: 41.06 };

const SEED = {
  activity: [
    { id: "TX-9920", type: "payment", counterparty: "Brightline Electronics", amount: -128.4,
      currency: "USD", at: "2026-09-10", status: "Completed", disputable: true },
    { id: "TX-9915", type: "received", counterparty: "Dana Reyes", amount: 60.0,
      currency: "USD", at: "2026-09-07", status: "Completed", disputable: false },
  ],
  disputes: [],
  counter: 9920,
};

export const { useStore, reset } = createStore("paypal", SEED);
export const nextTx = (n) => "TX-" + (n + 1);
