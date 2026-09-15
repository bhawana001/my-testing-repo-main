"use client";
// Robinhud (Robinhood) clone: market and limit orders against live-ish quotes,
// a portfolio whose total is the sum of its positions, instant deposits that
// credit buying power, and an options chain by expiry and strike.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Robinhud", slug: "robinhood", mark: "🪶",
  home: "/robinhood-clone-app", accent: "#00c805", accentText: "#06240b", bg: "#f6f8f6" };
export const BASE = "/robinhood-clone-app";
export { money };

export const INSTRUMENTS = [
  { symbol: "NVDA", name: "Nvidia Corp", price: 178.42, change: 2.13 },
  { symbol: "AAPL", name: "Apricot Inc", price: 226.8, change: -0.84 },
  { symbol: "TSLA", name: "Teslo Motors", price: 241.05, change: 4.02 },
  { symbol: "AMZN", name: "Amazonia Inc", price: 189.6, change: 0.55 },
];
export const findSym = (s) => INSTRUMENTS.find((i) => i.symbol === String(s).toUpperCase()) || null;

export const EXPIRIES = ["2026-09-26", "2026-10-17", "2026-12-19"];
export function chainFor(symbol, expiry) {
  const inst = findSym(symbol);
  if (!inst) return [];
  const base = Math.round(inst.price / 5) * 5;
  return [-10, -5, 0, 5, 10].map((offset) => {
    const strike = base + offset;
    const itm = strike < inst.price;
    const intrinsic = Math.max(inst.price - strike, 0);
    const timeValue = +(2.4 + Math.abs(offset) * 0.18 + EXPIRIES.indexOf(expiry) * 1.6).toFixed(2);
    return { strike, bid: +(intrinsic + timeValue - 0.05).toFixed(2), ask: +(intrinsic + timeValue + 0.05).toFixed(2),
             volume: 1200 - Math.abs(offset) * 70, itm };
  });
}

const SEED = {
  cash: 250.0,
  buyingPower: 250.0,
  positions: [
    { symbol: "AAPL", shares: 3, avgCost: 210.4 },
    { symbol: "AMZN", shares: 2, avgCost: 176.2 },
  ],
  orders: [],
  deposits: [],
  counter: 500,
};

export const { useStore, reset } = createStore("robinhood", SEED);
export const orderId = (n) => "ORD-" + (n + 1);
