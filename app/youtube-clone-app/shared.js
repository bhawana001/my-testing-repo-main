"use client";
// Yootube (YouTube) clone: uploads that sit in Processing before they are
// playable, a visibility setting a signed-out visitor is genuinely subject to,
// creator-pinned comments that jump to the top, a background-play entitlement
// that is only true on premium, and membership tiers with listed perks.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Yootube", slug: "youtube", mark: "▶", home: "/youtube-clone-app",
  accent: "#ff0033", accentText: "#fff", bg: "#fff5f6" };
export const BASE = "/youtube-clone-app";

export const ME = { name: "Priya Nair", handle: "@priyabuilds" };
export const CHANNEL = { name: "Acme Robotics", handle: "@acmerobotics", owner: "Dan Okafor" };

export const VISIBILITY = [
  { id: "public", label: "Public", detail: "Anyone can search for and watch it" },
  { id: "unlisted", label: "Unlisted", detail: "Only people with the link can watch it" },
  { id: "private", label: "Private", detail: "Only you and people you choose can watch it" },
];

export const TIERS = [
  { id: "supporter", name: "Supporter", price: 2.99, badge: "🔧",
    perks: ["Loyalty badge next to your name", "Members-only community posts"] },
  { id: "engineer", name: "Engineer", price: 9.99, badge: "🛠️",
    perks: ["Everything in Supporter", "Members-only videos", "Early access to build logs", "Custom emoji"] },
];

export const PREMIUM_FEATURES = [
  { id: "background", label: "Background play", premiumOnly: true },
  { id: "downloads", label: "Offline downloads", premiumOnly: true },
  { id: "adfree", label: "Ad-free viewing", premiumOnly: true },
  { id: "comments", label: "Comments", premiumOnly: false },
];

const SEED = {
  videos: [
    { id: "v1", title: "Building a six-axis arm from scrap", channel: "Acme Robotics",
      visibility: "public", status: "Ready", views: 18422, seconds: 742, uploadedBy: "Dan Okafor" },
  ],
  comments: [
    { id: "c1", videoId: "v1", by: "Mira Shah", text: "The harmonic drive section was worth the wait.", pinned: false, likes: 41 },
    { id: "c2", videoId: "v1", by: "Tom Alvarez", text: "What torque did you end up at?", pinned: false, likes: 12 },
  ],
  premium: false,
  memberships: [],
  payments: [],
  counter: 100,
};

export const { useStore, reset } = createStore("youtube", SEED);
export const nextId = (n) => `v${n}`;

/** Entitlement check the premium feature page asserts against. */
export function entitled(state, featureId) {
  const f = PREMIUM_FEATURES.find((x) => x.id === featureId);
  if (!f) return false;
  return f.premiumOnly ? !!state.premium : true;
}

/** A signed-out visitor sees public videos, and unlisted ones only by link. */
export function visibleToVisitor(video, viaLink) {
  if (video.status !== "Ready") return false;
  if (video.visibility === "public") return true;
  if (video.visibility === "unlisted") return !!viaLink;
  return false;
}

/** Pinned comments sort to the top; the rest keep their order. */
export const sortComments = (list) =>
  [...list].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
