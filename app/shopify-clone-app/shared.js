"use client";
// Shoplify (Shopify) clone: one store backing both the buyer storefront and the
// merchant admin, so a draft order created in admin is the same order the
// storefront's thank-you page produced.
import { createStore, money } from "../clones/kit/store";

export const BRAND = {
  name: "Shoplify",
  slug: "shopify",
  mark: "🛍️",
  home: "/shopify-clone-app",
  accent: "#0f7a5a",
  accentText: "#fff",
  bg: "#f6f7f9",
};
export const BASE = "/shopify-clone-app";
export { money };

export const PRODUCTS = [
  { id: "p_tee", title: "Heavyweight Cotton Tee", price: 32.0, emoji: "👕", sku: "SHP-TEE-01", stock: 40,
    options: { Size: ["S", "M", "L", "XL"], Color: ["Bone", "Slate"] },
    blurb: "260gsm combed cotton, boxy fit, pre-shrunk." },
  { id: "p_mug", title: "Enamel Camp Mug", price: 18.5, emoji: "☕", sku: "SHP-MUG-01", stock: 120,
    options: { Size: ["10 oz", "14 oz"] }, blurb: "Speckled enamel over steel, campfire safe." },
  { id: "p_tote", title: "Canvas Market Tote", price: 26.0, emoji: "👜", sku: "SHP-TOT-01", stock: 18,
    options: { Color: ["Natural", "Olive"] }, blurb: "16oz canvas, reinforced base, interior pocket." },
  { id: "p_candle", title: "Cedar & Salt Candle", price: 24.0, emoji: "🕯️", sku: "SHP-CND-01", stock: 0,
    options: {}, blurb: "Soy wax, 50 hour burn, hand poured." },
];
export const findProduct = (id) => PRODUCTS.find((p) => p.id === id) || null;

// Discount codes the storefront checkout accepts. Percent and fixed both exist
// so the discount line can be asserted against an expected amount.
export const DISCOUNTS = {
  WELCOME10: { type: "percent", value: 10, label: "WELCOME10 (10% off)" },
  SAVE5: { type: "fixed", value: 5, label: "SAVE5 ($5 off)" },
  FREESHIP: { type: "shipping", value: 0, label: "FREESHIP (free shipping)" },
};

export const THEMES = [
  { id: "theme_dawn", name: "Dawn", version: "12.0.1", accent: "#0f7a5a" },
  { id: "theme_craft", name: "Craft", version: "4.2.0", accent: "#7a4b12" },
  { id: "theme_refresh", name: "Refresh", version: "9.1.3", accent: "#1d4ed8" },
];

export const SHIPPING = 6.5;
export const TAX_RATE = 0.08;

const SEED = {
  cart: [],
  orders: [
    { id: "#1001", email: "rhea@example.com", customer: "Rhea Patel", total: 57.78, status: "paid",
      channel: "Online Store", placedAt: "2026-09-08", items: [{ id: "p_tee", title: "Heavyweight Cotton Tee", variant: "M · Bone", qty: 1, price: 32.0 }] },
    { id: "#1002", email: "dan@example.com", customer: "Dan Okafor", total: 26.99, status: "unfulfilled",
      channel: "Online Store", placedAt: "2026-09-11", items: [{ id: "p_mug", title: "Enamel Camp Mug", variant: "14 oz", qty: 1, price: 18.5 }] },
  ],
  drafts: [],
  activeTheme: "theme_dawn",
  themeHistory: [{ theme: "Dawn", at: "2026-09-01", action: "Published" }],
  counter: 1002,
};

export const { useStore, reset } = createStore("shopify", SEED);

export function totals(lines, discountCode) {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const d = discountCode ? DISCOUNTS[discountCode] : null;
  let discount = 0;
  let shipping = lines.length ? SHIPPING : 0;
  if (d?.type === "percent") discount = subtotal * (d.value / 100);
  if (d?.type === "fixed") discount = Math.min(d.value, subtotal);
  if (d?.type === "shipping") shipping = 0;
  const taxed = Math.max(subtotal - discount, 0);
  const tax = taxed * TAX_RATE;
  return {
    subtotal: +subtotal.toFixed(2),
    discount: +discount.toFixed(2),
    shipping: +shipping.toFixed(2),
    tax: +tax.toFixed(2),
    total: +(taxed + shipping + tax).toFixed(2),
  };
}

export function nextOrderId(counter) {
  return "#" + (counter + 1);
}
