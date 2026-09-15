"use client";
// Venmoo (Venmo) clone: social payments where privacy genuinely controls who
// sees a feed entry, money requests you can remind on, instant or standard cash
// out with different fees, and a card feed carrying cashback tags.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Venmoo", slug: "venmo", mark: "◍",
  home: "/venmo-clone-app", accent: "#008cff", accentText: "#fff", bg: "#f4f9ff" };
export const BASE = "/venmo-clone-app";
export { money };

export const ME = { name: "Priya Nair", handle: "@priya-nair" };
export const FRIENDS = [
  { id: "f_tom", name: "Tom Alvarez", handle: "@tom-alvarez" },
  { id: "f_mira", name: "Mira Shah", handle: "@mira-shah" },
  { id: "f_dan", name: "Dan Okafor", handle: "@dan-okafor" },
];

export const PRIVACY = [
  { id: "public", label: "Public", detail: "Everyone on Venmoo can see this" },
  { id: "friends", label: "Friends", detail: "Only your friends can see this" },
  { id: "private", label: "Private", detail: "Only you and the other person" },
];

export const CASHOUT = {
  instant: { label: "Instant", feePct: 0.0175, minFee: 0.25, arrival: "Within 30 minutes" },
  standard: { label: "Standard", feePct: 0, minFee: 0, arrival: "1 to 3 business days" },
};

const SEED = {
  balance: 428.6,
  bank: "Chaise Bank ••••8841",
  feed: [
    { id: "p1", from: "Priya Nair", to: "Mira Shah", amount: 32.0, note: "🎟️ Concert tix",
      privacy: "friends", at: "2026-09-11", kind: "payment" },
  ],
  requests: [],
  cardTransactions: [
    { id: "c1", merchant: "Corner Grocer", amount: 42.18, at: "2026-09-13", cashback: 0.42, category: "Groceries" },
    { id: "c2", merchant: "Metro Transit", amount: 2.75, at: "2026-09-12", cashback: 0, category: "Transit" },
  ],
  cashouts: [],
  counter: 100,
};

export const { useStore, reset } = createStore("venmo", SEED);

/** What a given viewer can see, which is the point of the privacy setting. */
export function visibleTo(entry, viewer) {
  if (viewer === "self") return true;
  if (entry.privacy === "public") return true;
  if (entry.privacy === "friends") return viewer === "friend";
  return false;
}
