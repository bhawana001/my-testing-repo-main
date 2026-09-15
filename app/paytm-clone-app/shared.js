"use client";
// Paytem (Paytm) clone: UPI transfers, prepaid recharges, electricity bill
// fetch-and-pay, wallet-to-bank settlement, and movie seat booking.
import { createStore, inr } from "../clones/kit/store";

export const BRAND = { name: "Paytem", slug: "paytm", mark: "◐",
  home: "/paytm-clone-app", accent: "#00b9f1", accentText: "#03232e", bg: "#f2fafd" };
export const BASE = "/paytm-clone-app";
export { inr as money };

export const VPA_RE = /^[a-z0-9._-]{3,}@[a-z]{3,}$/i;
export const KNOWN_VPAS = { "tom@okhdfb": "Tom Alvarez", "mira@ybl": "Mira Shah", "dan@paytn": "Dan Okafor" };

export const OPERATORS = ["Jiofy", "Airtelz", "VI-Mobile", "BSNLx"];
export const PLANS = [
  { id: "p_239", price: 239, data: "1.5 GB/day", validity: "28 days", talktime: "Unlimited calls" },
  { id: "p_299", price: 299, data: "2 GB/day", validity: "28 days", talktime: "Unlimited calls + 100 SMS/day" },
  { id: "p_479", price: 479, data: "1.5 GB/day", validity: "56 days", talktime: "Unlimited calls" },
  { id: "p_666", price: 666, data: "1.5 GB/day", validity: "84 days", talktime: "Unlimited calls + 100 SMS/day" },
];

export const BOARDS = ["Adani Electric", "Tata Power", "BESCOM", "MSEDCL"];
// Consumer numbers map to real-looking bills so the fetch step returns data.
export const BILLS = {
  "100200300": { name: "Priya Nair", amount: 1842.5, due: "2026-09-22", units: 284, period: "Aug 2026" },
  "400500600": { name: "Marco Oduya", amount: 962.0, due: "2026-09-19", units: 148, period: "Aug 2026" },
};

export const MOVIES = [
  { id: "m_kalki", title: "Kalkii 2898", cert: "U/A", lang: "Hindi", times: ["10:15 AM", "1:40 PM", "6:20 PM", "9:50 PM"] },
  { id: "m_drishyam", title: "Drishyem 3", cert: "U/A", lang: "Hindi", times: ["11:00 AM", "2:30 PM", "7:10 PM"] },
];
export const SEAT_ROWS = ["A", "B", "C", "D"];
export const SEATS_PER_ROW = 8;
export const SEAT_PRICE = 220;
// A fixed set of taken seats keeps booking deterministic.
export const TAKEN = ["A3", "A4", "B5", "C2", "C7", "D1"];

const SEED = {
  walletBalance: 4820.0,
  bankAccount: "HDFB Bank ••••8841",
  transactions: [],
  bookings: [],
  counter: 700,
};

export const { useStore, reset } = createStore("paytm", SEED);
export const txnId = (n) => "PTM" + (9000000 + n * 137);
