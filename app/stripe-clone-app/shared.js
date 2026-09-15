"use client";
// Stripey (Stripe) clone: a hosted checkout that behaves differently per test
// card, a customer billing portal, and a merchant dashboard fed by the same
// payment records the checkout creates.
import { createStore, money } from "../clones/kit/store";

export const BRAND = {
  name: "Stripey", slug: "stripe", mark: "◈",
  home: "/stripe-clone-app", accent: "#635bff", accentText: "#fff", bg: "#f6f8fb",
};
export const BASE = "/stripe-clone-app";
export { money };

// Test cards drive the outcome, the way a real sandbox does.
export const TEST_CARDS = {
  "4242424242424242": { outcome: "success", brand: "Visa", last4: "4242" },
  "4000002500003155": { outcome: "3ds", brand: "Visa", last4: "3155" },
  "4000000000000002": { outcome: "declined", brand: "Visa", last4: "0002", code: "card_declined",
    message: "Your card was declined." },
  "4000000000009995": { outcome: "declined", brand: "Visa", last4: "9995", code: "insufficient_funds",
    message: "Your card has insufficient funds." },
};
export function lookupCard(number) {
  return TEST_CARDS[String(number).replace(/\s+/g, "")] || null;
}

export const PRODUCT = { name: "Pro plan — annual", price: 240.0, description: "Billed once a year, cancel any time." };

const SEED = {
  payments: [
    { id: "pi_3Qa81Lx02", amount: 240.0, status: "succeeded", card: "Visa ••••4242",
      customer: "priya.nair@example.com", at: "2026-09-09 14:22", description: "Pro plan — annual", threeDS: false },
    { id: "pi_3QZ44Kw91", amount: 49.0, status: "succeeded", card: "Mastercard ••••5455",
      customer: "dan.okafor@example.com", at: "2026-09-06 09:05", description: "Starter plan — monthly", threeDS: false },
    { id: "pi_3QY19Jv77", amount: 240.0, status: "failed", card: "Visa ••••0002",
      customer: "test@example.com", at: "2026-09-05 17:48", description: "Pro plan — annual", threeDS: false },
  ],
  paymentMethods: [
    { id: "pm_visa42", brand: "Visa", last4: "4242", exp: "12/34", default: true },
    { id: "pm_mc55", brand: "Mastercard", last4: "5455", exp: "08/28", default: false },
  ],
  counter: 100,
};

export const { useStore, reset } = createStore("stripe", SEED);

export function newPaymentId(counter) {
  return "pi_3Qb" + (counter + 1) + "Mx03";
}
