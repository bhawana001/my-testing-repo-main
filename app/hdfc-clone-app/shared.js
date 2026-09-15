"use client";
// Hindfirst Bank (HDFC) clone: NetBanking with a customer id and a real second
// factor, a beneficiary that must finish its cooling period before it can be
// paid, fixed deposits whose maturity is actually compounded rather than
// invented, and a card statement whose minimum due is derived from the balance.
import { createStore, inr } from "../clones/kit/store";

export const BRAND = { name: "Hindfirst Bank", slug: "hdfc", mark: "▮", home: "/hdfc-clone-app",
  accent: "#004c8f", accentText: "#fff", bg: "#f2f6fb" };
export const BASE = "/hdfc-clone-app";
export { inr };

export const CUSTOMER = { id: "HF4471902", password: "Netbank@2026", name: "Priya Nair", mobile: "•••••• 4418" };
/** Fixed OTP so the flow is repeatable; a real bank would send it to the mobile. */
export const OTP = "481902";

/** Cooling period before a newly added beneficiary can be paid, in minutes. */
export const COOLING_MINUTES = 30;

export const FD_RATES = [
  { months: 6, rate: 6.25 },
  { months: 12, rate: 7.10 },
  { months: 24, rate: 7.35 },
  { months: 60, rate: 7.00 },
];

const SEED = {
  loggedIn: false,
  accounts: [
    { id: "sav", name: "Savings Account", number: "50100248817640", balance: 284530.75, type: "Savings" },
    { id: "cur", name: "Current Account", number: "50200119043872", balance: 91240.00, type: "Current" },
  ],
  beneficiaries: [
    { id: "b1", name: "Mira Shah", account: "50100774119023", ifsc: "HFBK0000412", status: "Active", addedAgo: 9999 },
  ],
  transfers: [],
  deposits: [],
  card: {
    number: "•••• •••• •••• 7712", holder: "Priya Nair",
    statementDate: "2026-09-05", dueDate: "2026-09-25",
    previousBalance: 18240.00, payments: 18240.00, purchases: 42618.5, interest: 0,
    creditLimit: 400000,
    transactions: [
      { at: "2026-08-12", detail: "Harbour Grocers", amount: 3184.25 },
      { at: "2026-08-19", detail: "Skyline Airlines", amount: 28450.00 },
      { at: "2026-08-27", detail: "Marine Drive Fuel", amount: 4120.00 },
      { at: "2026-09-02", detail: "Corner Pharmacy", amount: 6864.25 },
    ],
  },
  counter: 100,
};

export const { useStore, reset } = createStore("hdfc", SEED);

/** Total the statement asks for, and the 5% minimum the bank will accept. */
export function statementTotals(card) {
  const total = card.previousBalance - card.payments + card.purchases + card.interest;
  const minimum = Math.max(500, Math.round(total * 0.05 * 100) / 100);
  return { total: Math.round(total * 100) / 100, minimum };
}

/** Quarterly compounding, the way an Indian bank quotes an FD maturity. */
export function maturityAmount(principal, months, rate) {
  const quarters = months / 3;
  const value = principal * Math.pow(1 + rate / 400, quarters);
  return Math.round(value * 100) / 100;
}

export const rateFor = (months) => (FD_RATES.find((r) => r.months === months) || FD_RATES[1]).rate;

export const refNumber = (n) => `IMPS${String(620041 + n * 17)}`;
export const fdNumber = (n) => `FD${String(770118 + n * 13)}`;

export const beneficiaryReady = (b) => b.status === "Active" || b.addedAgo >= COOLING_MINUTES;
