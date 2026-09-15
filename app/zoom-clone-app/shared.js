"use client";
// Zuum (Zoom) clone: meetings you schedule with a real registration link and
// form, a waiting room that genuinely gates entry until the host admits, screen
// sharing that shows an indicator on every participant tile, and recordings
// that finish into a cloud library with playback.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Zuum", slug: "zoom", mark: "▶", home: "/zoom-clone-app",
  accent: "#2d8cff", accentText: "#fff", bg: "#f3f8ff" };
export const BASE = "/zoom-clone-app";

export const HOST = { name: "Priya Nair", email: "priya@acmerobotics.test" };

const SEED = {
  meetings: [
    { id: "914 2200 5501", topic: "Quarterly product review", when: "2026-09-18 10:00",
      duration: 45, registration: true, waitingRoom: true, registrants: [],
      participants: [{ name: "Priya Nair", role: "host", muted: false, sharing: false }],
      waiting: [], sharing: null, recording: null },
  ],
  recordings: [],
  counter: 100,
};

export const { useStore, reset } = createStore("zoom", SEED);

/** Meeting ids read like Zoom's: 11 digits in 3-4-4 groups, allocated in order. */
export function nextMeetingId(n) {
  const base = 91422005501 + n * 7;
  const s = String(base);
  return `${s.slice(0, 3)} ${s.slice(3, 7)} ${s.slice(7)}`;
}
export const slug = (id) => id.replace(/\s/g, "");
export const findMeeting = (list, s) => list.find((m) => slug(m.id) === s) || null;
