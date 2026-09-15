"use client";
// Limonade (Lemonade) clone: a conversational quote whose premium is computed
// from the answers rather than picked at random, a purchase that produces a real
// policy document, coverage changes that move the premium by the same formula,
// and claims that open with a claim id and a status you can watch.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Limonade", slug: "lemonade", mark: "◕", home: "/lemonade-clone-app",
  accent: "#ff0083", accentText: "#fff", bg: "#fff5fa" };
export const BASE = "/lemonade-clone-app";
export { money };

export const CITIES = [
  { id: "portside", name: "Portside", factor: 1.0 },
  { id: "eastvale", name: "Eastvale", factor: 1.18 },
  { id: "kestrel", name: "Kestrel Heights", factor: 0.92 },
];

export const DEDUCTIBLES = [
  { value: 250, factor: 1.15 },
  { value: 500, factor: 1.0 },
  { value: 1000, factor: 0.88 },
];

/**
 * The whole pricing model, in one place. Property coverage drives most of it,
 * liability adds a little, and the city and deductible scale the result — so an
 * adjustment on the coverage page moves the premium by exactly this rule.
 */
export function monthlyPremium({ property, liability, deductible, cityId, hasPet }) {
  const city = CITIES.find((c) => c.id === cityId) || CITIES[0];
  const ded = DEDUCTIBLES.find((d) => d.value === Number(deductible)) || DEDUCTIBLES[1];
  const base = 4.5 + (property / 1000) * 0.55 + (liability / 100000) * 2.4;
  const withPet = base * (hasPet ? 1.12 : 1);
  return Math.round(withPet * city.factor * ded.factor * 100) / 100;
}

const SEED = {
  quote: null,
  policy: null,
  claims: [],
  counter: 100,
};

export const { useStore, reset } = createStore("lemonade", SEED);

export const policyNumber = (n) => `LMN-${String(770420 + n * 19)}`;
export const claimNumber = (n) => `CLM-${String(48120 + n * 13)}`;

export const PROPERTY_STEPS = [10000, 15000, 20000, 30000, 50000];
export const LIABILITY_STEPS = [100000, 300000, 500000];
