"use client";
// Splitwyse (Splitwise) clone: one group, the people in it, expenses paid by one
// person and split equally between a chosen subset, and the simplified list of
// who owes whom. All maths runs in whole cents so $10 / 3 never drifts.
import { createStore, money } from "../clones/kit/store";
import { sendEmail } from "@/lib/inbox";

export const BRAND = { name: "Splitwyse", slug: "splitwise", mark: "◧",
  home: "/splitwise-clone-app", accent: "#1cc29f", accentText: "#04211a", bg: "#0f1514" };
export const BASE = "/splitwise-clone-app";
export { money };

const SEED = {
  group: { id: "g_goa", name: "Goa Trip" },
  people: [],
  expenses: [],
  counter: 100,
  // Sign-in: `pending` holds the emailed code until it is used.
  auth: { email: null, pending: null },
};

export const { useStore, reset } = createStore("splitwise", SEED);

const cents = (n) => Math.round(Number(n) * 100);

/** Each participant's share in cents; leftover cents go to the first people listed. */
export function shares(amount, splitWith) {
  const total = cents(amount);
  const n = splitWith.length;
  const base = Math.floor(total / n);
  const extra = total - base * n;
  return Object.fromEntries(splitWith.map((id, i) => [id, base + (i < extra ? 1 : 0)]));
}

/** Net position per person in cents: positive means the group owes them. */
export function netBalances(people, expenses) {
  const net = Object.fromEntries(people.map((p) => [p.id, 0]));
  for (const e of expenses) {
    net[e.paidBy] = (net[e.paidBy] || 0) + cents(e.amount);
    for (const [id, c] of Object.entries(shares(e.amount, e.splitWith))) net[id] = (net[id] || 0) - c;
  }
  return net;
}

/**
 * Simplified debts: repeatedly match the biggest debtor with the biggest
 * creditor, so each pair appears at most once. Amounts come back in dollars.
 */
export function settlements(people, expenses) {
  const net = netBalances(people, expenses);
  const name = (id) => people.find((p) => p.id === id)?.name || id;
  const debtors = Object.entries(net).filter(([, v]) => v < 0).map(([id, v]) => ({ id, v: -v }));
  const creditors = Object.entries(net).filter(([, v]) => v > 0).map(([id, v]) => ({ id, v }));
  const out = [];
  while (debtors.length && creditors.length) {
    debtors.sort((a, b) => b.v - a.v);
    creditors.sort((a, b) => b.v - a.v);
    const d = debtors[0], c = creditors[0];
    const amt = Math.min(d.v, c.v);
    out.push({ from: name(d.id), to: name(c.id), amount: amt / 100 });
    d.v -= amt; c.v -= amt;
    if (!d.v) debtors.shift();
    if (!c.v) creditors.shift();
  }
  return out;
}

/**
 * Form checks for a new expense. Amount must be a plain positive number with
 * at most 2 decimals; Number() alone would accept "0x10", "1e3" or "Infinity".
 */
export function validateExpense({ description, amount, payer, splitWith }) {
  const errors = {};
  const raw = String(amount ?? "").trim();
  if (!String(description ?? "").trim()) errors.description = "Enter a description.";
  if (!raw) errors.amount = "Enter an amount.";
  else if (!/^-?\d+(\.\d+)?$/.test(raw)) errors.amount = "Amount must be a number, like 12.50.";
  else if (Number(raw) <= 0) errors.amount = "Amount must be more than $0.00.";
  else if (!/^\d+(\.\d{1,2})?$/.test(raw)) errors.amount = "Use at most 2 decimal places.";
  if (!payer) errors.paidBy = "Add someone to the group first.";
  else if (!splitWith.length) errors.split = "Pick at least one person to split with.";
  return errors;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Emails a fresh 6-digit sign-in code to the simulated /inbox and returns it
 * for the store. The code is random on purpose: it is never shown on the
 * sign-in page, so the only way to get it is to read the email.
 */
export function sendSignInCode(email) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  sendEmail({
    to: email,
    from: "no-reply@splitwyse.dev",
    subject: "Your Splitwyse sign-in code",
    body: `Your Splitwyse sign-in code is ${code}.\n\nEnter it on the sign-in page to open your groups. If you did not ask for this, you can ignore this email.`,
    flow: "splitwise-clone-app/login",
  });
  return code;
}
