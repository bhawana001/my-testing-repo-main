"use client";
// Nyke (Nike) clone: size guides with real conversions, membership gating on
// exclusive products, launch draws, and saved-card checkout.
import { createStore, money } from "../clones/kit/store";

export const BRAND = {
  name: "Nyke", slug: "nike", mark: "◢",
  home: "/nike-clone-app", accent: "#111111", accentText: "#fff", bg: "#f5f5f5",
};
export const BASE = "/nike-clone-app";
export { money };

export const MEMBER = {
  email: "priya.nair@example.com",
  password: "member2026",
  name: "Priya Nair",
  card: { brand: "Visa", last4: "4242", exp: "12/34" },
  address: "418 Maple Street, Austin TX 78701",
};

export const PRODUCTS = [
  { id: "n_pegasus", title: "Nyke Aeroglide 41", price: 139.99, emoji: "👟", memberOnly: false,
    colorway: "Black / Volt", category: "Running",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "11"], lowStock: ["7", "11"], soldOut: ["9.5"] },
  { id: "n_court", title: "Nyke Court Classic Low", price: 94.99, emoji: "👟", memberOnly: false,
    colorway: "White / Gum", category: "Lifestyle",
    sizes: ["7", "8", "9", "10", "11"], lowStock: ["8"], soldOut: [] },
  { id: "n_flyknit", title: "Nyke Flyknit Elite — Member Exclusive", price: 179.99, emoji: "🏃", memberOnly: true,
    colorway: "Midnight Navy", category: "Running",
    sizes: ["8", "9", "10", "11"], lowStock: ["11"], soldOut: [] },
];
export const findProduct = (id) => PRODUCTS.find((p) => p.id === id) || null;

// US / UK / EU / CM conversions shown in the size guide.
export const SIZE_CHART = [
  { us: "7", uk: "6", eu: "40", cm: "25" },
  { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" },
  { us: "8", uk: "7", eu: "41", cm: "26" },
  { us: "8.5", uk: "7.5", eu: "42", cm: "26.5" },
  { us: "9", uk: "8", eu: "42.5", cm: "27" },
  { us: "9.5", uk: "8.5", eu: "43", cm: "27.5" },
  { us: "10", uk: "9", eu: "44", cm: "28" },
  { us: "11", uk: "10", eu: "45", cm: "29" },
];

export const LAUNCH = {
  id: "lnch_air",
  title: "Nyke Air Meridian 'First Light'",
  price: 210.0,
  emoji: "🌅",
  releaseDate: "September 22, 2026",
  drawCloses: "September 20, 2026 at 9:00 AM",
  sizes: ["8", "9", "10", "11", "12"],
};

const SEED = {
  signedIn: false,
  cart: [],
  drawEntry: null,
  orders: [],
  counter: 8800,
};

export const { useStore, reset } = createStore("nike", SEED);
