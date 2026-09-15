"use client";
// Wize (Wise) clone: transfer quotes that break the fee down, saved recipients,
// tracked transfers, and multi-currency balances that convert at the shown rate.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Wize", slug: "wise", mark: "◇",
  home: "/wise-clone-app", accent: "#163300", accentText: "#9fe870", bg: "#f5f7f2" };
export const BASE = "/wise-clone-app";

export const SYM = { USD: "$", INR: "₹", EUR: "€", GBP: "£" };
export const RATES = { "USD-INR": 83.42, "USD-EUR": 0.92, "USD-GBP": 0.79,
                       "EUR-USD": 1.087, "GBP-USD": 1.266, "INR-USD": 0.0120 };
export const rateFor = (from, to) => (from === to ? 1 : RATES[`${from}-${to}`] || 1);

// Wise-style pricing: a fixed component plus a percentage of the send amount.
export const FIXED_FEE = { USD: 0.71, EUR: 0.63, GBP: 0.55, INR: 42.0 };
export const VARIABLE_PCT = 0.0043;

export function quote(amount, from, to) {
  const fixed = FIXED_FEE[from] ?? 0.71;
  const variable = +(amount * VARIABLE_PCT).toFixed(2);
  const fee = +(fixed + variable).toFixed(2);
  const converted = +((amount - fee) * rateFor(from, to)).toFixed(2);
  return { fixed, variable, fee, rate: rateFor(from, to), sending: amount,
           afterFee: +(amount - fee).toFixed(2), converted,
           arrival: "by Wednesday, 17 September" };
}

export const TRANSFER_STEPS = ["You set up the transfer", "We received your money", "We paid out your money", "Money delivered"];

const SEED = {
  balances: [
    { currency: "USD", amount: 2480.4 },
    { currency: "EUR", amount: 310.0 },
    { currency: "GBP", amount: 0 },
  ],
  recipients: [
    { id: "r_mira", name: "Mira Shah", currency: "INR", bank: "HDFB Bank",
      account: "••••4471", ifsc: "HDFB0001234", email: "mira.shah@example.in" },
  ],
  transfers: [
    { id: "TR-80114", to: "Mira Shah", from: "USD", toCurrency: "INR", sending: 500,
      converted: 41481.29, fee: 2.86, step: 1, createdAt: "2026-09-14",
      arrival: "by Wednesday, 17 September" },
  ],
  counter: 80114,
};

export const { useStore, reset } = createStore("wise", SEED);
export const fmt = (n, c) => (SYM[c] || "") + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
