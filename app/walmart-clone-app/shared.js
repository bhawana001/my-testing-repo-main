"use client";
// Wallmark (Walmart) clone: pickup slots at nearby stores, per-item grocery
// substitution preferences, a Wallmark+ membership upsell, and reorderable
// order history.
import { createStore, money } from "../clones/kit/store";

export const BRAND = {
  name: "Wallmark", slug: "walmart", mark: "✦",
  home: "/walmart-clone-app", accent: "#0071dc", accentText: "#fff", bg: "#f2f5f8",
};
export const BASE = "/walmart-clone-app";
export { money };

export const PRODUCTS = [
  { id: "w_milk", title: "Whole Milk, 1 gal", price: 3.64, emoji: "🥛", grocery: true, substitutable: true, aisle: "Dairy" },
  { id: "w_bread", title: "Honey Wheat Bread", price: 2.48, emoji: "🍞", grocery: true, substitutable: true, aisle: "Bakery" },
  { id: "w_eggs", title: "Large Eggs, 12 ct", price: 3.12, emoji: "🥚", grocery: true, substitutable: true, aisle: "Dairy" },
  { id: "w_bananas", title: "Bananas, 3 lb", price: 1.74, emoji: "🍌", grocery: true, substitutable: true, aisle: "Produce" },
  { id: "w_tv", title: '55" 4K Smart TV', price: 268.0, emoji: "📺", grocery: false, substitutable: false, aisle: "Electronics" },
  { id: "w_pan", title: "Nonstick Fry Pan 10in", price: 16.88, emoji: "🍳", grocery: false, substitutable: false, aisle: "Kitchen" },
];
export const findProduct = (id) => PRODUCTS.find((p) => p.id === id) || null;

export const STORES = [
  { id: "st_lamar", name: "Wallmark Supercenter — Lamar Blvd", distance: "1.2 mi", address: "2701 Lamar Blvd, Austin TX" },
  { id: "st_ben", name: "Wallmark Neighborhood Market — Ben White", distance: "3.8 mi", address: "710 E Ben White Blvd, Austin TX" },
  { id: "st_round", name: "Wallmark Supercenter — Round Rock", distance: "9.4 mi", address: "120 Sundance Pkwy, Round Rock TX" },
];
export const PICKUP_SLOTS = [
  { id: "sl_1", label: "Today, 4pm – 5pm", fee: 0 },
  { id: "sl_2", label: "Today, 6pm – 7pm", fee: 0 },
  { id: "sl_3", label: "Tomorrow, 8am – 9am", fee: 0 },
  { id: "sl_4", label: "Tomorrow, 12pm – 1pm · Express", fee: 2.95 },
];

// What to do when an item is out of stock at pick time.
export const SUBSTITUTION_CHOICES = [
  { id: "best", label: "Pick the best available match", detail: "Our shopper chooses a comparable item" },
  { id: "brand", label: "Same brand only", detail: "Substitute only within the same brand" },
  { id: "none", label: "Do not substitute", detail: "Refund the item if it is out of stock" },
];

export const MEMBERSHIP = {
  name: "Wallmark+",
  monthly: 12.95,
  annual: 98.0,
  perks: ["Free delivery from your store", "Member prices on fuel", "Early access to deals", "Free returns from home"],
};

export const TAX_RATE = 0.0825;

const SEED = {
  cart: [],
  fulfilment: "pickup",
  storeId: "st_lamar",
  slotId: null,
  substitutions: {}, // productId -> choice id
  isMember: false,
  orders: [
    { id: "W-2208145", placedAt: "2026-08-29", total: 24.07, fulfilment: "pickup",
      storeId: "st_lamar", slot: "Saturday, 10am – 11am", status: "Picked up",
      items: [
        { id: "w_milk", title: "Whole Milk, 1 gal", price: 3.64, qty: 2 },
        { id: "w_bread", title: "Honey Wheat Bread", price: 2.48, qty: 1 },
        { id: "w_eggs", title: "Large Eggs, 12 ct", price: 3.12, qty: 3 },
      ] },
    { id: "W-2194003", placedAt: "2026-08-15", total: 18.62, fulfilment: "delivery",
      storeId: "st_ben", slot: "Friday, 5pm – 6pm", status: "Delivered",
      items: [{ id: "w_pan", title: "Nonstick Fry Pan 10in", price: 16.88, qty: 1 }] },
  ],
  counter: 2208145,
};

export const { useStore, reset } = createStore("walmart", SEED);

export function totals(cart, slotId, isMember) {
  const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const slot = PICKUP_SLOTS.find((s) => s.id === slotId);
  const slotFee = isMember ? 0 : slot?.fee || 0;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  return { subtotal: +subtotal.toFixed(2), slotFee: +slotFee.toFixed(2), tax, total: +(subtotal + slotFee + tax).toFixed(2) };
}
