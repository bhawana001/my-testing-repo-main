"use client";
// Zerodhaa Kyte (Zerodha) clone: intraday and delivery orders, GTT triggers
// that sit until price is hit, holdings with real P&L arithmetic, and UPI
// funding that credits the trading balance.
import { createStore, inr } from "../clones/kit/store";

export const BRAND = { name: "Zerodhaa Kyte", slug: "zerodha", mark: "◭",
  home: "/zerodha-clone-app", accent: "#387ed1", accentText: "#fff", bg: "#f7f9fb" };
export const BASE = "/zerodha-clone-app";
export { inr as money };

export const STOCKS = [
  { symbol: "RELIANCE", name: "Relianz Industries", ltp: 1530.4, exchange: "NSE" },
  { symbol: "INFY", name: "Infozys Ltd", ltp: 1842.15, exchange: "NSE" },
  { symbol: "TCS", name: "Tata Consult Serv", ltp: 4120.0, exchange: "NSE" },
  { symbol: "HDFCBANK", name: "HDFB Bank Ltd", ltp: 1668.9, exchange: "NSE" },
];
export const findStock = (s) => STOCKS.find((x) => x.symbol === String(s).toUpperCase()) || null;

const SEED = {
  balance: 25000,
  orders: [],
  gtts: [],
  holdings: [
    { symbol: "INFY", qty: 12, avg: 1705.5 },
    { symbol: "HDFCBANK", qty: 20, avg: 1712.25 },
  ],
  funds: [],
  counter: 2600,
};

export const { useStore, reset } = createStore("zerodha", SEED);
export const orderNo = (n) => "2609" + (n + 1);
