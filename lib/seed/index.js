// Shared seeded fixtures. Fixed values -> deterministic runs.
export const DEMO_USER = {
  email: "demo@evals.dev",
  password: "Demo123!",
  name: "Demo User",
  firstName: "Demo",
  lastName: "User",
  phone: "+1 555 010 0123",
  customerId: "DEMO12345",
};
export const OTP = "123456";
export const CARDS = {
  success: "4242 4242 4242 4242",
  decline: "4000 0000 0000 0002",
  threeDS: "4000 0000 0000 3220",
  exp: "12/29",
  cvc: "123",
};
export const ADDRESSES = {
  home: {
    label: "Home",
    line1: "221B Baker Street",
    city: "London",
    state: "Greater London",
    zip: "NW1 6XE",
    country: "United Kingdom",
  },
  us: {
    label: "Home",
    line1: "1200 Market St",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
  },
  in: {
    label: "Home",
    line1: "14 MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    zip: "560001",
    country: "India",
  },
};
export const FX = { USD_INR: 83.2, USD_EUR: 0.92, USD_GBP: 0.79, EUR_GBP: 0.86, GBP_INR: 105.3 };

export function money(n, cur = "USD") {
  const symbols = { USD: "$", INR: "₹", EUR: "€", GBP: "£" };
  const sym = symbols[cur] || cur + " ";
  const v = Math.abs(Number(n));
  const s = v.toLocaleString(cur === "INR" ? "en-IN" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (n < 0 ? "-" : "") + sym + s;
}
export function round2(n) {
  return Math.round(n * 100) / 100;
}
export function normalizeCard(s) {
  return String(s || "").replace(/\s+/g, "");
}
/** Card outcome: "success" | "decline" | "3ds" | "invalid" */
export function cardOutcome(number) {
  const n = normalizeCard(number);
  if (n === normalizeCard(CARDS.success)) return "success";
  if (n === normalizeCard(CARDS.decline)) return "decline";
  if (n === normalizeCard(CARDS.threeDS)) return "3ds";
  if (/^\d{16}$/.test(n)) return "success";
  return "invalid";
}
export function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || ""));
}
