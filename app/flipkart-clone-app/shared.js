"use client";
// Flipkort (Flipkart) clone. Rupee pricing, exchange offers on phones, cash on
// delivery, and a SuperCoins rewards balance that earns on every order.
import { createStore, inr } from "../clones/kit/store";

export const BRAND = {
  name: "Flipkort", slug: "flipkart", mark: "🛒",
  home: "/flipkart-clone-app", accent: "#2874f0", accentText: "#fff", bg: "#f1f3f6",
};
export const BASE = "/flipkart-clone-app";
export { inr as money };

export const PRODUCTS = [
  { id: "f_shoe1", title: "Trailburst Running Shoes", brand: "Sprynt", price: 2499, emoji: "👟",
    category: "footwear", rating: 4.3, ratings: 12483, sizes: ["6", "7", "8", "9", "10"], stockBySize: { 6: 4, 7: 9, 8: 12, 9: 0, 10: 3 } },
  { id: "f_shoe2", title: "Cloudstep Road Runner", brand: "Vireo", price: 3799, emoji: "👟",
    category: "footwear", rating: 4.5, ratings: 8210, sizes: ["7", "8", "9", "10"], stockBySize: { 7: 6, 8: 2, 9: 7, 10: 5 } },
  { id: "f_shoe3", title: "Marathon Pro Trainer", brand: "Sprynt", price: 5299, emoji: "🏃",
    category: "footwear", rating: 4.6, ratings: 3390, sizes: ["8", "9", "10", "11"], stockBySize: { 8: 3, 9: 4, 10: 1, 11: 6 } },
  { id: "f_shoe4", title: "Daily Walk Sneaker", brand: "Pacer", price: 1299, emoji: "👞",
    category: "footwear", rating: 4.0, ratings: 22110, sizes: ["6", "7", "8", "9"], stockBySize: { 6: 11, 7: 14, 8: 9, 9: 8 } },
  { id: "f_phone1", title: "Nexa 12 Pro 5G (256 GB)", brand: "Nexa", price: 48999, emoji: "📱",
    category: "mobile", rating: 4.4, ratings: 51204, exchange: true },
  { id: "f_phone2", title: "Nexa 12 Lite 5G (128 GB)", brand: "Nexa", price: 27499, emoji: "📱",
    category: "mobile", rating: 4.2, ratings: 30110, exchange: true },
];
export const findProduct = (id) => PRODUCTS.find((p) => p.id === id) || null;

// Exchange valuations by device condition. The cart subtracts the chosen value,
// which is the arithmetic use case 3.2 checks.
export const EXCHANGE_MODELS = [
  { id: "ex_a", label: "Nexa 10 (128 GB)", good: 9500, fair: 6200 },
  { id: "ex_b", label: "Nexa 9 (64 GB)", good: 5400, fair: 3100 },
  { id: "ex_c", label: "Orbit S7 (128 GB)", good: 7200, fair: 4800 },
];
export const CONDITIONS = [
  { id: "good", label: "Good — no cracks, all functions work" },
  { id: "fair", label: "Fair — minor scratches or dents" },
];

export const PRICE_BANDS = [
  { id: "b1", label: "Under ₹1,500", min: 0, max: 1499 },
  { id: "b2", label: "₹1,500 – ₹3,000", min: 1500, max: 3000 },
  { id: "b3", label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
  { id: "b4", label: "Over ₹5,000", min: 5001, max: 1e9 },
];

export const DELIVERY_FEE = 40;
export const COD_FEE = 25;

const SEED = {
  cart: [],
  exchange: null, // { productId, modelId, condition, value }
  orders: [],
  superCoins: 1240,
  coinHistory: [
    { at: "2026-09-04", label: "Order OD1180 — earned", delta: 48 },
    { at: "2026-08-22", label: "Redeemed on Nexa case", delta: -200 },
    { at: "2026-08-02", label: "Order OD1142 — earned", delta: 92 },
  ],
  counter: 1180,
};

export const { useStore, reset } = createStore("flipkart", SEED);

export function cartTotals(cart, exchange, payMode) {
  const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const exchangeValue = exchange ? exchange.value : 0;
  const delivery = subtotal > 5000 ? 0 : DELIVERY_FEE;
  const codFee = payMode === "cod" ? COD_FEE : 0;
  const payable = Math.max(subtotal - exchangeValue, 0) + delivery + codFee;
  return { subtotal, exchangeValue, delivery, codFee, payable, coinsEarned: Math.floor(payable / 500) };
}
