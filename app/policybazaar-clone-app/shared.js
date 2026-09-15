"use client";
// Policybaazar (Policybazaar) clone: an aggregator whose numbers actually come
// from the profile you enter — term premiums rise with age, smoking and cover;
// health plans are filtered by both room rent limit and premium at once; and the
// calculator recomputes on every change rather than on a submit.
import { createStore, inr } from "../clones/kit/store";

export const BRAND = { name: "Policybaazar", slug: "policybazaar", mark: "◈",
  home: "/policybazaar-clone-app", accent: "#0065ff", accentText: "#fff", bg: "#f3f7ff" };
export const BASE = "/policybazaar-clone-app";
export { inr };

export const INSURERS = [
  { id: "ins_mer", name: "Meridian Life", claimRatio: 98.4, factor: 1.0 },
  { id: "ins_kit", name: "Kestrel Assurance", claimRatio: 97.1, factor: 0.92 },
  { id: "ins_har", name: "Harbour Mutual", claimRatio: 99.0, factor: 1.14 },
  { id: "ins_sun", name: "Sundial Insurance", claimRatio: 96.2, factor: 0.86 },
];

export const COVERS = [5000000, 10000000, 20000000, 50000000];
export const TERMS = [20, 25, 30, 40];

/**
 * Annual term premium. Age is the dominant driver, smoking adds ~55%, and cover
 * scales linearly — so a comparison table can be checked by hand.
 */
export function termPremium({ age, cover, term, smoker, insurerFactor }) {
  const perLakhBase = 32 + Math.max(0, age - 25) * 3.6 + Math.max(0, term - 20) * 1.1;
  const lakhs = cover / 100000;
  const gross = perLakhBase * lakhs * (smoker ? 1.55 : 1) * insurerFactor;
  return Math.round(gross);
}

export const HEALTH_PLANS = [
  { id: "hp1", insurer: "Meridian Life", name: "Meridian Care 10L", sumInsured: 1000000,
    roomRent: "Single private room", roomRentCapPct: 0, premium: 14280, cashless: 7400 },
  { id: "hp2", insurer: "Kestrel Assurance", name: "Kestrel Secure 5L", sumInsured: 500000,
    roomRent: "Capped at 1% of sum insured", roomRentCapPct: 1, premium: 8940, cashless: 6100 },
  { id: "hp3", insurer: "Harbour Mutual", name: "Harbour Total 20L", sumInsured: 2000000,
    roomRent: "Any room", roomRentCapPct: 0, premium: 21650, cashless: 9200 },
  { id: "hp4", insurer: "Sundial Insurance", name: "Sundial Value 5L", sumInsured: 500000,
    roomRent: "Capped at 2% of sum insured", roomRentCapPct: 2, premium: 6720, cashless: 4300 },
  { id: "hp5", insurer: "Meridian Life", name: "Meridian Essential 7.5L", sumInsured: 750000,
    roomRent: "Single private room", roomRentCapPct: 0, premium: 11430, cashless: 7400 },
];

export const ROOM_FILTERS = [
  { id: "any", label: "Any room rent condition" },
  { id: "no_cap", label: "No room rent cap" },
  { id: "cap_ok", label: "Cap of 1% or better" },
];

/** Both filters apply together — that is what the use case checks. */
export function filterHealth(plans, { room, maxPremium }) {
  return plans.filter((p) => {
    if (room === "no_cap" && p.roomRentCapPct !== 0) return false;
    if (room === "cap_ok" && !(p.roomRentCapPct === 0 || p.roomRentCapPct <= 1)) return false;
    if (maxPremium && p.premium > Number(maxPremium)) return false;
    return true;
  });
}

const SEED = { profile: null, callbacks: [], counter: 100 };
export const { useStore, reset } = createStore("policybazaar", SEED);

export const leadId = (n) => `PB-${String(310442 + n * 11)}`;
