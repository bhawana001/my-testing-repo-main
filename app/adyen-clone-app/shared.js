"use client";
// Adyeen (Adyen) clone: a drop-in component with cards, iDEAL and stored
// tokens. Every payment produces both a shopper-facing result and a webhook
// notification, so the merchant order page can be checked against it.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Adyeen", slug: "adyen", mark: "◐",
  home: "/adyen-clone-app", accent: "#0abf53", accentText: "#062e18", bg: "#f3f7f4" };
export const BASE = "/adyen-clone-app";
export { money };

export const ORDER = { reference: "ORD-55120", merchant: "Northwind Software", amount: 129.5, currency: "EUR" };

// 3DS2 is triggered by the card, not by a toggle.
export const CARDS = {
  "4111111111111111": { outcome: "authorised", brand: "Visa", last4: "1111" },
  "4212345678901237": { outcome: "3ds2", brand: "Visa", last4: "1237" },
  "4000000000000101": { outcome: "refused", brand: "Visa", last4: "0101", reason: "Refused by the issuer" },
};
export const lookupCard = (n) => CARDS[String(n).replace(/\s+/g, "")] || null;

export const IDEAL_ISSUERS = [
  { id: "ing", name: "INK Bank" },
  { id: "rabo", name: "Rabbo Bank" },
  { id: "abn", name: "ABNA Bank" },
];

const SEED = {
  storedCards: [
    { token: "tok_8812", brand: "Visa", last4: "1111", exp: "03/30", label: "Visa ending 1111" },
  ],
  payments: [],
  webhooks: [],
  counter: 100,
};

export const { useStore, reset } = createStore("adyen", SEED);
export const pspRef = (n) => "PSP" + (883000000000 + n * 17);
