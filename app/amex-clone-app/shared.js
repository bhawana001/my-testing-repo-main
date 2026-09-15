"use client";
// Amrex (American Express) clone: a points balance that really goes down when
// redeemed and comes back as a pending statement credit, scheduled payments that
// hold the amount they were set for, disputes that open a case with a number,
// and offers that move from available to added on the card.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Amrex", slug: "amex", mark: "▰", home: "/amex-clone-app",
  accent: "#006fcf", accentText: "#fff", bg: "#f2f7fc" };
export const BASE = "/amex-clone-app";
export { money };

export const CARD = { name: "Amrex Platinum", number: "•••• •••••• 41008", holder: "Priya Nair" };

/** Membership points redeem for statement credit at this rate. */
export const CENTS_PER_POINT = 0.6;
export const MIN_REDEEM_POINTS = 1000;

export const OFFER_CATALOG = [
  { id: "of_harbour", merchant: "Harbour Grocers", detail: "Spend $50 or more, get $10 back", cap: 10 },
  { id: "of_skyline", merchant: "Skyline Airlines", detail: "Spend $300 or more, get 5,000 points", cap: 0 },
  { id: "of_marine", merchant: "Marine Drive Fuel", detail: "Spend $40 or more, get $8 back", cap: 8 },
];

const SEED = {
  points: 84200,
  statement: {
    balance: 2318.44, minimumDue: 115.92, dueDate: "2026-09-28", closingDate: "2026-09-05",
    credits: [],
  },
  charges: [
    { id: "ch1", at: "2026-09-02", merchant: "Skyline Airlines", amount: 642.10, disputed: false },
    { id: "ch2", at: "2026-08-29", merchant: "Harbour Grocers", amount: 184.25, disputed: false },
    { id: "ch3", at: "2026-08-24", merchant: "Nightowl Diner", amount: 96.40, disputed: false },
  ],
  scheduledPayments: [],
  disputes: [],
  addedOffers: [],
  counter: 100,
};

export const { useStore, reset } = createStore("amex", SEED);

export const pointsToDollars = (points) => Math.round(points * CENTS_PER_POINT) / 100;
export const caseNumber = (n) => `AMX-${String(58210 + n * 23)}`;
export const paymentRef = (n) => `PMT-${String(31840 + n * 17)}`;
