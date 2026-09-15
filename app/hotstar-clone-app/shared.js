"use client";
// Hotstarr (Disney+ Hotstar) clone: live sport with a score overlay that moves
// as the match does, a live edge you can fall behind and jump back to, and a
// catalogue of shows alongside it.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Hotstarr", slug: "hotstar", mark: "★", home: "/hotstar-clone-app",
  accent: "#1f80e0", accentText: "#fff", bg: "#0f1014" };
export const BASE = "/hotstar-clone-app";

export const MATCHES = [
  {
    id: "m1", competition: "Trident T20 Cup", status: "LIVE",
    home: { name: "Harbour Kings", short: "HKG", runs: 148, wickets: 4, overs: "16.2" },
    away: { name: "Summit Royals", short: "SMR", runs: 0, wickets: 0, overs: "0.0" },
    innings: 1, target: null, commentary: [
      "16.2 — Driven through extra cover for four.",
      "16.1 — Short and pulled away for a single.",
      "15.6 — Beaten outside off, no run.",
    ],
    venue: "Marine Drive Stadium",
  },
  {
    id: "m2", competition: "Continental Football League", status: "UPCOMING",
    home: { name: "Northgate United", short: "NGU", runs: 0, wickets: 0, overs: "—" },
    away: { name: "Riverfield FC", short: "RVF", runs: 0, wickets: 0, overs: "—" },
    innings: 0, target: null, commentary: [], venue: "Northgate Park",
    startsAt: "19:30 IST",
  },
];

export const SHOWS = [
  { id: "s1", title: "The Quiet Signal", kind: "Series", seasons: 2, rating: "U/A 16+" },
  { id: "s2", title: "Monsoon Line", kind: "Film", minutes: 132, rating: "U/A 13+" },
  { id: "s3", title: "Workshop Diaries", kind: "Series", seasons: 1, rating: "U" },
];

const SEED = {
  // Seconds behind the live edge. Zero means you are watching live.
  behindSeconds: 0,
  playing: false,
  quality: "Auto (1080p)",
  ballsBowled: 0,
  score: { runs: 148, wickets: 4, overs: "16.2" },
  watchlist: [],
};

export const { useStore, reset } = createStore("hotstar", SEED);

export const match = (id) => MATCHES.find((m) => m.id === id) || MATCHES[0];

/** Advances the over by one legal ball, which is what moves the overlay. */
export function nextBall(overs, runs) {
  const [o, b] = overs.split(".").map(Number);
  const ball = b + 1;
  const newOvers = ball >= 6 ? `${o + 1}.0` : `${o}.${ball}`;
  return { overs: newOvers, runs: runs + 1 };
}
