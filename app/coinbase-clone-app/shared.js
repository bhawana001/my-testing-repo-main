"use client";
// Coinbaze (Coinbase) clone: card purchases that credit a real holding,
// recurring buys with a computed next run date, sends with address validation
// and network warnings, and price alerts.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Coinbaze", slug: "coinbase", mark: "◉",
  home: "/coinbase-clone-app", accent: "#0052ff", accentText: "#fff", bg: "#f5f8ff" };
export const BASE = "/coinbase-clone-app";
export { money };

export const ASSETS = [
  { id: "BTC", name: "Bitcorn", price: 64280.55, change: 1.8, decimals: 8 },
  { id: "ETH", name: "Etherium", price: 3120.4, change: -0.6, decimals: 6 },
  { id: "SOL", name: "Solania", price: 148.22, change: 3.4, decimals: 4 },
];
export const findAsset = (id) => ASSETS.find((a) => a.id === id) || null;

export const CARD_FEE_PCT = 0.0149;
export const SPREAD_PCT = 0.005;

export function quoteBuy(amountUsd, assetId) {
  const asset = findAsset(assetId);
  const fee = +(amountUsd * CARD_FEE_PCT).toFixed(2);
  const spread = +(amountUsd * SPREAD_PCT).toFixed(2);
  const net = +(amountUsd - fee - spread).toFixed(2);
  const units = +(net / asset.price).toFixed(asset.decimals);
  return { fee, spread, net, units, price: asset.price };
}

// Address shapes per network, so validation is genuine rather than length-only.
export const ADDRESS_RULES = {
  BTC: { re: /^(bc1[a-z0-9]{25,50}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/, hint: "Starts with bc1, 1 or 3" },
  ETH: { re: /^0x[a-fA-F0-9]{40}$/, hint: "0x followed by 40 hex characters" },
  SOL: { re: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/, hint: "32 to 44 base58 characters" },
};

export const FREQUENCIES = [
  { id: "daily", label: "Every day", days: 1 },
  { id: "weekly", label: "Every week", days: 7 },
  { id: "biweekly", label: "Every two weeks", days: 14 },
  { id: "monthly", label: "Every month", days: 30 },
];

/** Next run date from a fixed "today" so the value is deterministic. */
export function nextRun(freqId) {
  const days = FREQUENCIES.find((f) => f.id === freqId)?.days ?? 7;
  const base = new Date("2026-09-15T00:00:00Z");
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}

const SEED = {
  cashBalance: 500.0,
  holdings: { BTC: 0.00412, ETH: 0.84, SOL: 0 },
  transactions: [],
  recurring: [],
  alerts: [],
  counter: 900,
};

export const { useStore, reset } = createStore("coinbase", SEED);
