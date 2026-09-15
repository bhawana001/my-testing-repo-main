"use client";
// Instacrate (Instacart) clone. Each store is a separate cart with its own
// delivery window and service fee, items carry replacement preferences, and the
// tip stays adjustable for 24 hours after delivery.
import { createStore, money } from "../clones/kit/store";

export const BRAND = {
  name: "Instacrate", slug: "instacart", mark: "🥕",
  home: "/instacart-clone-app", accent: "#0aad0a", accentText: "#fff", bg: "#f7f8f6",
};
export const BASE = "/instacart-clone-app";
export { money };

export const STORES = [
  { id: "s_green", name: "GreenLeaf Market", eta: "in 2 hours", serviceFee: 3.99, deliveryFee: 3.99, emoji: "🥬" },
  { id: "s_costo", name: "BulkBarn Wholesale", eta: "in 3 hours", serviceFee: 5.49, deliveryFee: 0, emoji: "📦" },
  { id: "s_petco", name: "PetPantry", eta: "tomorrow", serviceFee: 2.99, deliveryFee: 4.99, emoji: "🐾" },
];
export const findStore = (id) => STORES.find((s) => s.id === id) || null;

export const ITEMS = [
  { id: "i_straw", storeId: "s_green", title: "Organic Strawberries, 1 lb", price: 5.49, emoji: "🍓", flaky: true },
  { id: "i_spin", storeId: "s_green", title: "Baby Spinach, 5 oz", price: 3.99, emoji: "🥬", flaky: true },
  { id: "i_milk", storeId: "s_green", title: "Oat Milk, 64 oz", price: 4.79, emoji: "🥛", flaky: false },
  { id: "i_paper", storeId: "s_costo", title: "Paper Towels, 12 rolls", price: 21.99, emoji: "🧻", flaky: false },
  { id: "i_coffee", storeId: "s_costo", title: "Coffee Beans, 2 lb", price: 17.49, emoji: "☕", flaky: true },
  { id: "i_kib", storeId: "s_petco", title: "Grain-Free Dog Food, 12 lb", price: 32.99, emoji: "🦴", flaky: false },
];
export const findItem = (id) => ITEMS.find((i) => i.id === id) || null;

// What the shopper should do if an item is unavailable.
export const REPLACEMENTS = [
  { id: "best", label: "Find best match", detail: "Shopper picks the closest item" },
  { id: "specific", label: "Choose a specific replacement", detail: "Pick a backup item yourself" },
  { id: "refund", label: "Don't replace — refund", detail: "Remove it and refund the price" },
];
export const BACKUPS = {
  i_straw: ["Conventional Strawberries, 1 lb", "Organic Raspberries, 6 oz"],
  i_spin: ["Baby Kale, 5 oz", "Spring Mix, 5 oz"],
  i_coffee: ["Medium Roast Beans, 2 lb", "Espresso Beans, 1.5 lb"],
};

export const SLOTS = [
  { id: "sl_2h", label: "Within 2 hours", fee: 0, window: "3:00pm – 5:00pm" },
  { id: "sl_1h", label: "Priority — within 1 hour", fee: 4.99, window: "2:00pm – 3:00pm" },
  { id: "sl_eve", label: "This evening", fee: 0, window: "6:00pm – 8:00pm" },
];

export const TIP_PRESETS = [0, 3, 5, 8, 12];
export const TAX_RATE = 0.07;

const SEED = {
  carts: {},          // storeId -> [{ itemId, qty }]
  replacements: {},   // itemId -> { choice, backup }
  slots: {},          // storeId -> slotId
  orders: [],
  counter: 5500,
};

export const { useStore, reset } = createStore("instacart", SEED);

export function storeTotals(lines, slotId, tip = 0) {
  const store = findStore(lines.storeId);
  const items = lines.list.reduce((s, l) => s + findItem(l.itemId).price * l.qty, 0);
  const slot = SLOTS.find((x) => x.id === slotId);
  const slotFee = slot?.fee || 0;
  const tax = +(items * TAX_RATE).toFixed(2);
  const total = +(items + store.serviceFee + store.deliveryFee + slotFee + tax + tip).toFixed(2);
  return { items: +items.toFixed(2), serviceFee: store.serviceFee, deliveryFee: store.deliveryFee,
           slotFee, tax, tip: +tip.toFixed(2), total };
}
