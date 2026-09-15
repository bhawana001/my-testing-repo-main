"use client";
// PhonePey (PhonePe) clone: scan-to-pay, UPI autopay mandates with real limits,
// history filtered by month and category, and an insurance quote journey.
import { createStore, inr } from "../clones/kit/store";

export const BRAND = { name: "PhonePey", slug: "phonepe", mark: "₹",
  home: "/phonepe-clone-app", accent: "#5f259f", accentText: "#fff", bg: "#f7f4fb" };
export const BASE = "/phonepe-clone-app";
export { inr as money };

// "Scanning" a QR resolves to one of these merchants.
export const QR_CODES = [
  { id: "qr_chai", merchant: "Sunrise Chai Corner", vpa: "sunrisechai@ybl", city: "Bengaluru" },
  { id: "qr_kirana", merchant: "Sharma Kirana Store", vpa: "sharmakirana@okhdfb", city: "Bengaluru" },
  { id: "qr_auto", merchant: "Auto — KA01AB1234", vpa: "autodriver@paytn", city: "Bengaluru" },
];

export const SERVICES = [
  { id: "sv_netflix", name: "StreamFlix Premium", amount: 649, frequency: "Monthly", maxLimit: 1000 },
  { id: "sv_gym", name: "IronWorks Gym", amount: 1800, frequency: "Monthly", maxLimit: 2500 },
  { id: "sv_sip", name: "BlueChip SIP", amount: 5000, frequency: "Monthly", maxLimit: 6000 },
];

export const CATEGORIES = ["All", "Food", "Groceries", "Travel", "Bills", "Shopping"];
export const MONTHS = ["All", "2026-09", "2026-08", "2026-07"];

export const BIKE_BRANDS = ["Hondaa", "Bajaaj", "TVSx", "Royal Enfeld"];
export const BIKE_MODELS = {
  Hondaa: ["Shine 125", "Unicorn 160"],
  Bajaaj: ["Pulsar 150", "Platina 110"],
  TVSx: ["Apache 160", "Jupiter 110"],
  "Royal Enfeld": ["Classic 350", "Hunter 350"],
};
export const COVERS = [
  { id: "third", label: "Third-party only", base: 1420, detail: "Legally required minimum cover" },
  { id: "comprehensive", label: "Comprehensive", base: 3180, detail: "Own damage plus third-party" },
  { id: "zero_dep", label: "Comprehensive + zero depreciation", base: 4560, detail: "Full claim value on parts" },
];

/** Premium rises with engine size and falls with no-claim bonus. */
export function premiumFor(coverId, cc, ncbPct) {
  const cover = COVERS.find((c) => c.id === coverId);
  const ccLoad = cc > 150 ? 1.25 : 1;
  const gross = cover.base * ccLoad;
  const ncb = +(gross * (ncbPct / 100)).toFixed(2);
  const net = +(gross - ncb).toFixed(2);
  const gst = +(net * 0.18).toFixed(2);
  return { gross: +gross.toFixed(2), ncb, net, gst, total: +(net + gst).toFixed(2) };
}

const SEED = {
  balance: 12480.0,
  transactions: [
    { id: "T-9001", merchant: "Sunrise Chai Corner", amount: 60, category: "Food", month: "2026-09", at: "2026-09-12" },
    { id: "T-9002", merchant: "BigBazaar", amount: 2140, category: "Groceries", month: "2026-09", at: "2026-09-08" },
    { id: "T-9003", merchant: "Uber India", amount: 318, category: "Travel", month: "2026-08", at: "2026-08-27" },
    { id: "T-9004", merchant: "Adani Electricity", amount: 1842, category: "Bills", month: "2026-08", at: "2026-08-21" },
    { id: "T-9005", merchant: "Myntraa", amount: 2499, category: "Shopping", month: "2026-07", at: "2026-07-30" },
    { id: "T-9006", merchant: "Sharma Kirana Store", amount: 745, category: "Groceries", month: "2026-07", at: "2026-07-14" },
  ],
  mandates: [],
  quotes: [],
  counter: 400,
};

export const { useStore, reset } = createStore("phonepe", SEED);
export const txnId = (n) => "T-" + (9100 + n);
