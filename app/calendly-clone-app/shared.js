"use client";
// Calendari (Calendly) clone: one source of truth for slots — UTC minutes — so
// the host's time and the invitee's time are two renderings of the same instant
// rather than two guesses. Busy blocks remove slots from the grid entirely,
// rescheduling frees the old slot before taking the new one, and a paid event
// will not confirm until the card is charged.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Calendari", slug: "calendly", mark: "◷", home: "/calendly-clone-app",
  accent: "#006bff", accentText: "#fff", bg: "#f4f8ff" };
export const BASE = "/calendly-clone-app";

export const HOST = { name: "Priya Nair", tz: "Asia/Kolkata" };
export const DATE = "2026-09-21";

/**
 * Fixed offsets in minutes for the chosen date. Hard-coding them keeps the
 * conversion identical on every machine, which a DST-aware lookup would not.
 */
export const ZONES = [
  { id: "Asia/Kolkata", label: "India Standard Time (IST)", offset: 330, abbr: "IST" },
  { id: "America/New_York", label: "Eastern Time (EDT)", offset: -240, abbr: "EDT" },
  { id: "Europe/London", label: "British Summer Time (BST)", offset: 60, abbr: "BST" },
  { id: "UTC", label: "Coordinated Universal Time", offset: 0, abbr: "UTC" },
];
export const zone = (id) => ZONES.find((z) => z.id === id) || ZONES[0];

/** Working hours 09:00–17:00 IST, expressed once in UTC minutes past midnight. */
const DAY_START_UTC = 9 * 60 - 330;   // 03:30 UTC
const DAY_END_UTC = 17 * 60 - 330;    // 11:30 UTC
export const SLOT_MINUTES = 30;

export const EVENT_TYPES = [
  { id: "intro", name: "30 minute meeting", minutes: 30, price: 0 },
  { id: "consult", name: "60 minute paid consultation", minutes: 60, price: 75 },
];

const SEED = {
  // Busy blocks in the host's own timezone, which is how a host thinks about them.
  busy: [
    { label: "Standup", startIst: "11:00", endIst: "12:00" },
    { label: "1:1 with Dan", startIst: "15:30", endIst: "16:00" },
  ],
  bookings: [],
  counter: 100,
};

export const { useStore, reset } = createStore("calendly", SEED);

export const istToUtc = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m - 330;
};

export const fmt = (utcMinutes, tzId) => {
  const z = zone(tzId);
  let total = utcMinutes + z.offset;
  const dayShift = Math.floor(total / 1440);
  total = ((total % 1440) + 1440) % 1440;
  const h = String(Math.floor(total / 60)).padStart(2, "0");
  const m = String(total % 60).padStart(2, "0");
  return `${h}:${m}${dayShift ? (dayShift > 0 ? " (+1d)" : " (-1d)") : ""} ${z.abbr}`;
};

/** Every slot the host's working hours allow, before busy blocks are applied. */
export function allSlots(minutes) {
  const out = [];
  for (let t = DAY_START_UTC; t + minutes <= DAY_END_UTC; t += SLOT_MINUTES) out.push(t);
  return out;
}

/** The slots actually offered: working hours minus busy blocks minus bookings. */
export function openSlots(state, minutes) {
  const busy = state.busy.map((b) => ({ ...b, start: istToUtc(b.startIst), end: istToUtc(b.endIst) }));
  const taken = state.bookings.filter((b) => b.status === "Confirmed")
    .map((b) => ({ start: b.startUtc, end: b.startUtc + b.minutes }));
  return allSlots(minutes).filter((t) => {
    const end = t + minutes;
    const clashesBusy = busy.some((b) => t < b.end && end > b.start);
    const clashesBooking = taken.some((b) => t < b.end && end > b.start);
    return !clashesBusy && !clashesBooking;
  });
}

/** Why a given slot is not offered, so the availability page can say so. */
export function busyReason(state, t, minutes) {
  const end = t + minutes;
  const hit = state.busy.find((b) => t < istToUtc(b.endIst) && end > istToUtc(b.startIst));
  if (hit) return hit.label;
  const booked = state.bookings.find(
    (b) => b.status === "Confirmed" && t < b.startUtc + b.minutes && end > b.startUtc);
  return booked ? `Booked by ${booked.name}` : null;
}

export const bookingRef = (n) => `CAL-${4100 + n * 7}`;
