"use client";
// Britannic Airways clone (British Airways). Every page lives under the same
// path the real site uses (/travel/home/public/en_in, /travel/managebooking/...,
// /content/en/in/flights/england/london, /nx/b/account/...), prefixed with
// /ba-clone-app. Fares, schedules and statuses are deterministic and "now" is
// pinned, so a Kane run sees the same prices and check-in windows every time.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Britannic Airways", slug: "ba", code: "BX", club: "The Britannic Club", points: "Avions" };
export const BASE = "/ba-clone-app";
export const R = {
  home: `${BASE}/travel/home/public/en_in`,
  book: `${BASE}/travel/book/public/en_in`,
  manage: `${BASE}/travel/managebooking/public/en_in`,
  checkin: `${BASE}/travel/olcilandingpageauthreq/public/en_in`,
  status: `${BASE}/travel/flightstatus/public/en_in`,
  statusSearch: `${BASE}/travel/flightstatus/public/en_in/search/`,
  help: `${BASE}/travel/helpcentre/public/en_in`,
  offers: `${BASE}/content/en/in/offers`,
  login: `${BASE}/nx/b/account/en/in/account/pre-login`,
  account: `${BASE}/nx/b/customerhub/en/in/your-account`,
  dest: (d) => `${BASE}/content/en/in/flights/${d.country}/${d.city}`,
};

// Pinned clock: 8 Oct 2026, 10:00 IST.
export const TODAY = "2026-10-08";
export const NOW_MIN = 10 * 60;

export const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;
export const IMG = {
  london: "1513635269975-59663e0ac1ad",
  paris: "1502602898657-3e91760cbb34",
  edinburgh: "1506377585622-bedcbb027afc",
  manchester: "1515586838455-8f8f940d6853",
  wing: "1436491865332-7a61a109cc05",
  cabin: "1540339832862-474599807836",
  lounge: "1530521954074-e64f6810b32d",
  window: "1488085061387-422e29b40080",
  board: "1517400508447-f8dd518b86db",
  dusk: "1464037866556-6812c9d1c72e",
  street: "1527631746610-bca00a040d60",
  barcelona: "1583422409516-2895a77efded",
  sky: "1587019158091-1a103c5dd17f",
  landing: "1556388158-158ea5ccacbd",
  seats: "1494515843206-f3117d3f51b7",
};

export const AIRPORTS = [
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi Intl", country: "India", india: true },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Intl", country: "India", india: true },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda Intl", country: "India", india: true },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi Intl", country: "India", india: true },
  { code: "MAA", city: "Chennai", name: "Chennai Intl", country: "India", india: true },
  { code: "LHR", city: "London", name: "Heathrow", country: "United Kingdom" },
  { code: "EDI", city: "Edinburgh", name: "Edinburgh", country: "United Kingdom" },
  { code: "MAN", city: "Manchester", name: "Manchester", country: "United Kingdom" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
];
export const airport = (code) => AIRPORTS.find((a) => a.code === code);
export const airportLabel = (a) => `${a.city}, ${a.name} (${a.code}), ${a.country}`;
export function matchAirports(q) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return AIRPORTS.filter((a) => [a.city, a.name, a.code, a.country].join(" ").toLowerCase().includes(t));
}

// Return Economy fares from India, matching the "best offers" cards.
export const DEST_BASE = { LHR: 77299, EDI: 66085, MAN: 66670, CDG: 88393 };

export const DESTINATIONS = [
  { code: "LHR", name: "London", country: "england", city: "london", img: IMG.london, month: "Mar 2027",
    blurb: "Theatre in the West End, markets in Borough and Shoreditch, and a pint in a pub that has been pouring since the 1700s. London does every kind of city break." },
  { code: "EDI", name: "Edinburgh", country: "scotland", city: "edinburgh", img: IMG.edinburgh, month: "Sep 2027",
    blurb: "Cobbled closes, a castle on a volcano and the biggest arts festival in the world every August." },
  { code: "MAN", name: "Manchester", country: "england", city: "manchester", img: IMG.manchester, month: "Apr 2027",
    blurb: "Two football cities in one, a music scene that shaped a generation, and red-brick mills turned into bars and galleries." },
  { code: "CDG", name: "Paris", country: "france", city: "paris", img: IMG.paris, month: "Sep 2027",
    blurb: "Long lunches, late galleries and the Seine at dusk. Connect through London to the city of light." },
];
export const destByPath = (country, city) => DESTINATIONS.find((d) => d.country === country && d.city === city);

export const CABINS = [
  { id: "M", name: "Economy", mult: 1 },
  { id: "W", name: "Premium Economy", mult: 1.85 },
  { id: "C", name: "Business", mult: 3.6 },
  { id: "F", name: "First", mult: 5.2 },
];
export const cabin = (id) => CABINS.find((c) => c.id === id) || CABINS[0];

export const FAMILIES = [
  { id: "basic", name: "Basic", add: 0, bags: 0, perks: ["Hand baggage only", "Seat selection from INR 2,100", "No changes"] },
  { id: "standard", name: "Standard", add: 6400, bags: 1, perks: ["1 x 23kg checked bag", "Seat selection from INR 2,100", "Change for a fee"] },
  { id: "plus", name: "Plus", add: 14900, bags: 2, perks: ["2 x 23kg checked bags", "Free seat selection", "Free changes"] },
];
export const family = (id) => FAMILIES.find((f) => f.id === id) || FAMILIES[0];

export const PAX_TYPES = [
  { id: "ad", label: "Adults", hint: "Aged 16+", mult: 1 },
  { id: "ya", label: "Young adults", hint: "Aged 12-15", mult: 1 },
  { id: "ch", label: "Children", hint: "Aged 2-11", mult: 0.75 },
  { id: "inf", label: "Infants", hint: "Under 2", mult: 0.1 },
];

export const fmt = (n) => "INR " + Math.round(n).toLocaleString("en-US");

// --- dates (strings only, UTC maths, never local time) ---
export const addDays = (iso, n) => {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const prettyDate = (iso) => {
  const d = new Date(iso + "T00:00:00Z");
  return `${DOW[d.getUTCDay()]} ${String(d.getUTCDate()).padStart(2, "0")} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
export const dayDiff = (a, b) => Math.round((new Date(b + "T00:00:00Z") - new Date(a + "T00:00:00Z")) / 864e5);
const hm = (x) => { const m = ((x % 1440) + 1440) % 1440; return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; };
export const dur = (m) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;

// --- schedules ---
// India <-> London is nonstop; every other pair connects through Heathrow.
const LEG = {
  DEL: { out: [["142", 155, 595], ["256", 830, 590]], back: [["143", 685, 545], ["257", 1215, 540]] },
  BOM: { out: [["138", 140, 620], ["198", 790, 615]], back: [["139", 640, 570], ["199", 1200, 565]] },
  BLR: { out: [["118", 400, 655] , ["124", 960, 650]], back: [["119", 650, 605], ["125", 1260, 600]] },
  HYD: { out: [["276", 115, 640]], back: [["277", 705, 590]] },
  MAA: { out: [["36", 330, 650]], back: [["37", 645, 600]] },
};
const ONWARD = { EDI: [["1438", 85], ["1442", 85]], MAN: [["1386", 70], ["1390", 70]], CDG: [["306", 75], ["314", 75]] };

function legsFor(from, to) {
  const fa = airport(from), ta = airport(to);
  if (fa.india && LEG[from]) {
    return LEG[from].out.map(([no, dep, d], i) => {
      const seg1 = { flight: "BX" + no, from, to: "LHR", dep, dur: d };
      if (to === "LHR") return [seg1];
      const [ono, odur] = (ONWARD[to] || ONWARD.EDI)[i % 2];
      const odep = dep + d - 330 + 90; // landing at LHR in UK time, then a 90 min connection
      return [seg1, { flight: "BX" + ono, from: "LHR", to, dep: odep, dur: odur }];
    });
  }
  if (ta.india && LEG[to]) {
    return LEG[to].back.map(([no, dep, d], i) => {
      const seg2 = { flight: "BX" + no, from: "LHR", to, dep, dur: d };
      if (from === "LHR") return [seg2];
      const [ono, odur] = (ONWARD[from] || ONWARD.EDI)[i % 2];
      const odep = dep - 90 - odur + TZ[airport(from).country]; // origin local time
      return [{ flight: "BX" + (Number(ono) + 1), from, to: "LHR", dep: odep, dur: odur }, seg2];
    });
  }
  return [];
}
const TZ = { India: 330, "United Kingdom": 0, France: 60, USA: -300 };
function shape(segs) {
  const first = segs[0], last = segs[segs.length - 1];
  const depLocal = first.dep;
  const startUtc = first.dep - TZ[airport(first.from).country];
  const endUtc = last.dep - TZ[airport(last.from).country] + last.dur;
  const arrLocal = endUtc + TZ[airport(last.to).country];
  return {
    id: segs.map((s) => s.flight).join("-"),
    segs,
    depTime: hm(depLocal),
    arrTime: hm(((arrLocal % 1440) + 1440) % 1440),
    plusDays: Math.floor(arrLocal / 1440) - Math.floor(depLocal / 1440),
    duration: dur(endUtc - startUtc),
    stops: segs.length - 1,
  };
}
export const searchFlights = (from, to) => legsFor(from, to).map(shape);

/** One searched segment on a given travel date, in the shape a stored booking uses. */
export function segToLeg(sg, date) {
  const depDay = Math.floor(sg.dep / 1440);
  const arrLocal = sg.dep - TZ[airport(sg.from).country] + sg.dur + TZ[airport(sg.to).country];
  const plus = Math.floor(arrLocal / 1440) - depDay;
  const gate = String(4 + (parseInt(sg.flight.slice(2), 10) % 29));
  return { flight: sg.flight, from: sg.from, to: sg.to, date: addDays(date, depDay), dep: hm(sg.dep), arr: hm(arrLocal) + (plus > 0 ? `+${plus}` : ""), gate };
}

// Small, fixed day-of-week swing so the date strip looks like a real one.
const SWING = [0, 1850, -2100, 3400, -900, 2600, 1200];
const destCode = (from, to) => (airport(from).india ? to : from);

/** Per-person price for one leg. Return trips split the return fare in half; one-way pays 62%. */
export function legPrice({ from, to, date, cabinId, familyId, optionIdx, trip }) {
  const base = DEST_BASE[destCode(from, to)] || 80000;
  const half = trip === "one" ? base * 0.62 : base / 2;
  const dow = new Date(date + "T00:00:00Z").getUTCDay();
  const raw = (half + SWING[dow] / 2 + optionIdx * 2100) * cabin(cabinId).mult + family(familyId).add;
  return Math.round(raw);
}
export const paxCount = (pax) => PAX_TYPES.reduce((n, t) => n + (pax[t.id] || 0), 0);
export const paxWeight = (pax) => PAX_TYPES.reduce((n, t) => n + (pax[t.id] || 0) * t.mult, 0);
export const totalFor = (legs, pax) => Math.round(legs.reduce((s, l) => s + l.price, 0) * paxWeight(pax));

export const CARD_TEST = { number: "4111 1111 1111 1111", expiry: "12/29", cvv: "123", otp: "482913" };
export const EXTRA_BAG = 6500;
export const SEAT_FEE = 2100;

// Booking references: 6 letters/digits, deterministic per counter.
const ALPH = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function bookingRef(n) {
  let x = Math.imul(n + 7, 2654435761) >>> 0, y = Math.imul(n + 13, 40503) >>> 0, s = "";
  for (let i = 0; i < 6; i++) { s += ALPH[(i % 2 ? y : x) % 32]; if (i % 2) y = Math.floor(y / 32); else x = Math.floor(x / 32); }
  return s;
}

export const MEMBER = { email: "ananya.sharma@example.com", number: "48210937", password: "Fly2026!", first: "Ananya", last: "Sharma", tier: "Bronze", avions: 48250, tierPoints: 210 };

const seg = (flight, from, to, date, dep, arr, gate) => ({ flight, from, to, date, dep, arr, gate });
const SEED = {
  user: null,
  counter: 0,
  bookings: [
    {
      ref: "QX7K4P", surname: "Sharma", email: MEMBER.email, cabin: "M", family: "standard", total: 89699,
      passengers: [{ id: "p1", title: "Ms", first: "Ananya", last: "Sharma", bags: 1, meal: "Standard", seat: null, checkedIn: false, passport: null }],
      legs: [seg("BX142", "DEL", "LHR", "2026-10-09", "02:35", "07:00", "14"), seg("BX143", "LHR", "DEL", "2026-10-23", "11:25", "02:00+1", "B42")],
      payments: [{ label: "Flights", amount: 89699 }],
    },
    {
      ref: "LM2R9D", surname: "Patel", email: "rohan.patel@example.com", cabin: "C", family: "standard", total: 289380,
      passengers: [{ id: "p1", title: "Mr", first: "Rohan", last: "Patel", bags: 1, meal: "Standard", seat: null, checkedIn: false, passport: null },
                   { id: "p2", title: "Mrs", first: "Meera", last: "Patel", bags: 1, meal: "Standard", seat: null, checkedIn: false, passport: null }],
      legs: [seg("BX138", "BOM", "LHR", "2026-10-20", "02:20", "07:10", "6")],
      payments: [{ label: "Flights", amount: 289380 }],
    },
  ],
};
export const { useStore, reset } = createStore("ba", SEED);
/** Where a booking starts and turns around: the return begins at the first gap of more than a day. */
export function tripEnds(legs) {
  const from = legs[0].from;
  const gap = legs.findIndex((l, i) => i > 0 && dayDiff(legs[i - 1].date, l.date) > 1);
  const to = gap > 0 ? legs[gap - 1].to : legs[legs.length - 1].to;
  return { from, to, isReturn: gap > 0 };
}
export const findBooking = (s, ref, surname) =>
  s.bookings.find((b) => b.ref.toUpperCase() === ref.trim().toUpperCase() && b.surname.toLowerCase() === surname.trim().toLowerCase());

/** Online check-in opens 24 hours before departure (pinned clock). */
export function checkinWindow(leg) {
  const [h, m] = leg.dep.split(":").map(Number);
  const minsUntil = dayDiff(TODAY, leg.date) * 1440 + h * 60 + m - NOW_MIN;
  return { open: minsUntil > 60 && minsUntil <= 1440, minsUntil };
}

// Seat map for check-in: Economy rows 30-41, A B C | D E F G | H J K.
export const SEAT_ROWS = Array.from({ length: 12 }, (_, i) => 30 + i);
export const SEAT_COLS = ["A", "B", "C", "", "D", "E", "F", "G", "", "H", "J", "K"];
export const TAKEN = new Set(["30A", "30B", "31C", "31D", "32E", "32K", "33A", "33F", "34G", "34H", "35D", "35E", "36J", "36K", "37B", "38C", "39F", "40A", "40K", "41E"]);

// Flight status board. Dates are yesterday / today / tomorrow on the pinned clock.
export const STATUS_DATES = [addDays(TODAY, -1), TODAY, addDays(TODAY, 1)];
export const STATUSES = [
  { flight: "BX142", from: "DEL", to: "LHR", date: "2026-10-08", sched: "02:35", est: "04:10", arr: "08:35", status: "Delayed", note: "Late arrival of inbound aircraft", gate: "14", terminal: "3" },
  { flight: "BX142", from: "DEL", to: "LHR", date: "2026-10-09", sched: "02:35", est: "02:35", arr: "07:00", status: "On time", note: "", gate: "14", terminal: "3" },
  { flight: "BX142", from: "DEL", to: "LHR", date: "2026-10-07", sched: "02:35", est: "02:41", arr: "07:06", status: "Landed", note: "", gate: "12", terminal: "3" },
  { flight: "BX256", from: "DEL", to: "LHR", date: "2026-10-08", sched: "13:50", est: "13:50", arr: "18:10", status: "On time", note: "", gate: "18", terminal: "3" },
  { flight: "BX138", from: "BOM", to: "LHR", date: "2026-10-08", sched: "02:20", est: "02:24", arr: "07:14", status: "Departed", note: "", gate: "6", terminal: "2" },
  { flight: "BX143", from: "LHR", to: "DEL", date: "2026-10-08", sched: "11:25", est: "—", arr: "—", status: "Cancelled", note: "Operational reasons. Customers have been rebooked onto BX257.", gate: "—", terminal: "5" },
  { flight: "BX257", from: "LHR", to: "DEL", date: "2026-10-08", sched: "20:15", est: "20:15", arr: "10:45+1", status: "On time", note: "", gate: "B36", terminal: "5" },
  { flight: "BX198", from: "BOM", to: "LHR", date: "2026-10-08", sched: "13:10", est: "13:10", arr: "17:55", status: "On time", note: "", gate: "9", terminal: "2" },
];

export const HELP = [
  { q: "How much baggage can I take?", a: "Basic fares include hand baggage only: one cabin bag up to 23kg and one handbag or laptop bag. Standard fares add one checked bag up to 23kg, and Plus fares add two. You can add extra checked bags in Manage My Booking for INR 6,500 each." },
  { q: "When does online check-in open?", a: "Online check-in opens 24 hours before departure and closes 60 minutes before departure for long-haul flights." },
  { q: "Can I change my flight?", a: "Plus fares can be changed for free. Standard fares can be changed for a fee plus any fare difference. Basic fares cannot be changed." },
  { q: "How do I request a special meal?", a: "Choose a special meal in Manage My Booking up to 24 hours before departure. Options include vegetarian, vegan, Hindu, Jain, halal, kosher and gluten-free." },
  { q: "My flight is cancelled. What happens now?", a: "We will rebook you onto the next available flight and email the new itinerary. You can see your new flight in Manage My Booking, or request a refund there instead." },
  { q: "How do I collect Avions?", a: "Join The Britannic Club for free and add your membership number when you book. You collect Avions on every flight with us and our partner airlines." },
];

export const MEALS = ["Standard", "Vegetarian (Asian)", "Vegan", "Jain", "Hindu", "Halal", "Gluten-free"];
