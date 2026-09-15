"use client";
// Chaise Bank clone: an online banking portal behind a 2FA login. Accounts are
// masked, transfers move real balances, and every action lands in the activity
// feed the dashboard reads.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Chaise Bank", slug: "chase", mark: "◆",
  home: "/chase-clone-app", accent: "#0b4a8f", accentText: "#fff", bg: "#f2f5f9" };
export const BASE = "/chase-clone-app";
export { money };

export const CREDENTIALS = { username: "priya.nair", password: "Bank2026!" };
export const OTP_CODE = "483921";

export const ZELLE_CONTACTS = [
  { id: "z_tom", name: "Tom Alvarez", handle: "tom.alvarez@example.com" },
  { id: "z_mira", name: "Mira Shah", handle: "+1 512 555 0134" },
  { id: "z_dan", name: "Dan Okafor", handle: "dan.okafor@example.com" },
];

export const PAYEES = [
  { id: "p_power", name: "Lone Star Power", account: "••••4471", category: "Utilities" },
  { id: "p_water", name: "Austin Water", account: "••••2208", category: "Utilities" },
  { id: "p_card", name: "Chaise Sapphire Card", account: "••••9921", category: "Credit card" },
];

export const DISPUTE_REASONS = [
  "I don't recognise this charge",
  "Charged more than once",
  "Item never arrived",
  "Item was returned but not refunded",
  "Amount is incorrect",
];

const SEED = {
  authed: false,
  stage: "credentials",       // credentials -> otp -> done
  accounts: [
    { id: "chk", name: "Total Checking", mask: "••••8841", balance: 4210.55, type: "checking" },
    { id: "sav", name: "Premier Savings", mask: "••••2290", balance: 18740.12, type: "savings" },
    { id: "cc", name: "Chaise Sapphire Card", mask: "••••9921", balance: -1284.37, type: "credit" },
  ],
  activity: [
    { id: "t1", accountId: "cc", date: "2026-09-11", merchant: "Brightline Electronics", amount: -349.99, disputable: true },
    { id: "t2", accountId: "cc", date: "2026-09-09", merchant: "Corner Grocer", amount: -82.14, disputable: true },
    { id: "t3", accountId: "chk", date: "2026-09-08", merchant: "Payroll — Northwind", amount: 2450.0, disputable: false },
    { id: "t4", accountId: "chk", date: "2026-09-05", merchant: "Lone Star Power", amount: -136.42, disputable: true },
  ],
  zellePayments: [],
  scheduledPayments: [],
  disputes: [],
  statements: [
    { id: "st_aug", period: "August 2026", account: "Total Checking", pages: 4, size: "128 KB" },
    { id: "st_jul", period: "July 2026", account: "Total Checking", pages: 3, size: "104 KB" },
    { id: "st_aug_cc", period: "August 2026", account: "Chaise Sapphire Card", pages: 2, size: "96 KB" },
  ],
  downloads: [],
  counter: 400,
};

export const { useStore, reset } = createStore("chase", SEED);
export const ref = (prefix, n) => prefix + (100000 + n * 137);
