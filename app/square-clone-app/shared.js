"use client";
// Squair (Square) clone: checkout links, emailed invoices, a web POS that takes
// tips, and a dashboard that can refund part of a payment.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Squair", slug: "square", mark: "▣",
  home: "/square-clone-app", accent: "#1b1b1b", accentText: "#fff", bg: "#f4f4f5" };
export const BASE = "/square-clone-app";
export { money };

export const CHECKOUT_LINK = { id: "chk_7K21", title: "Pottery workshop — single seat", amount: 65.0, seller: "KilnAndClay Studio" };
export const POS_ITEMS = [
  { id: "i_latte", name: "Oat Latte", price: 5.25 },
  { id: "i_bun", name: "Cardamom Bun", price: 4.5 },
  { id: "i_filter", name: "Filter Coffee", price: 3.75 },
];
export const TIP_PRESETS = [0, 15, 18, 20];

const SEED = {
  link: { status: "unpaid", paymentId: null },
  invoices: [
    { id: "INV-2041", customer: "Northwind Software", email: "ap@northwind.example",
      amount: 480.0, due: "2026-09-22", status: "unpaid", issued: "2026-09-08",
      lines: [{ label: "Branding workshop — 4 hours", amount: 480.0 }] },
    { id: "INV-2036", customer: "Cedar Foods", email: "finance@cedarfoods.example",
      amount: 250.0, due: "2026-09-10", status: "paid", issued: "2026-08-30",
      lines: [{ label: "Menu photography", amount: 250.0 }] },
  ],
  payments: [
    { id: "pay_8812", source: "Invoice INV-2036", amount: 250.0, tip: 0, at: "2026-09-09",
      status: "Completed", card: "Visa ••••4242", refunded: 0 },
  ],
  counter: 8812,
};

export const { useStore, reset } = createStore("square", SEED);
export const nextPayId = (n) => "pay_" + (n + 1);
