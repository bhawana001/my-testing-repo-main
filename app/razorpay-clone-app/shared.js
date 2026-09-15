"use client";
// Razorpie (Razorpay) clone: a merchant checkout modal with UPI, cards and EMI,
// plus shareable payment links that can only be paid once.
import { createStore, inr } from "../clones/kit/store";

export const BRAND = { name: "Razorpie", slug: "razorpay", mark: "⟐",
  home: "/razorpay-clone-app", accent: "#0c2451", accentText: "#fff", bg: "#f4f6fa" };
export const BASE = "/razorpay-clone-app";
export { inr as money };

export const ORDERS = [
  { id: "ord_low", label: "Cotton kurta set", amount: 1899 },
  { id: "ord_high", label: "Nexa 12 Pro 5G (256 GB)", amount: 48999 },
];

// EMI is offered only above the bank's minimum ticket size.
export const EMI_MIN = 3000;
export const EMI_BANKS = [
  { id: "hdfc", name: "HDFB Bank", plans: [
    { months: 3, rate: 13 }, { months: 6, rate: 14 }, { months: 9, rate: 15 }, { months: 12, rate: 16 } ] },
  { id: "icici", name: "ICICE Bank", plans: [
    { months: 3, rate: 12 }, { months: 6, rate: 13.5 }, { months: 12, rate: 15.5 } ] },
];

/** Standard reducing-balance EMI, rounded to whole rupees. */
export function emiFor(amount, months, ratePct) {
  const r = ratePct / 100 / 12;
  const emi = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const monthly = Math.round(emi);
  const total = monthly * months;
  return { monthly, total, interest: total - amount };
}

// A VPA looks like name@bank -- anything else is rejected before it is sent.
export const VPA_RE = /^[a-z0-9._-]{3,}@[a-z]{3,}$/i;
export const KNOWN_VPAS = ["priya@okhdfb", "priya@ybl", "marco@paytn"];

const SEED = {
  payments: [],
  link: { id: "plink_9K2R4TQ", label: "Design consultation — 1 hour", amount: 3500, status: "unpaid", paidAt: null, paymentId: null },
  counter: 700,
};
export const { useStore, reset } = createStore("razorpay", SEED);
export const newPayId = (c) => "pay_R" + (c + 1) + "kLm8Xq";
