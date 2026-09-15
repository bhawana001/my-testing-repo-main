"use client";
// Membership, profiles, playback progress and downloads for StreamFlix.
// Added so the streaming clone carries a real account: a plan you signed up
// for, PIN-protected profiles, resume points that survive leaving the player,
// and offline downloads.
import { createStore } from "../clones/kit/store";

export const PLANS = [
  { id: "mobile", name: "Mobile", price: 6.99, quality: "480p", screens: 1, downloads: 1 },
  { id: "standard", name: "Standard", price: 15.49, quality: "1080p", screens: 2, downloads: 2 },
  { id: "premium", name: "Premium", price: 22.99, quality: "4K + HDR", screens: 4, downloads: 6 },
];
export const findPlan = (id) => PLANS.find((p) => p.id === id) || null;

// Episodes available to download, used by the offline flow.
export const EPISODES = [
  { id: "ep_b99_s1e1", titleId: "b99", label: "Brooklyn Nine-Nine · S1:E1 Pilot", size: "412 MB", runtime: 22 },
  { id: "ep_b99_s1e2", titleId: "b99", label: "Brooklyn Nine-Nine · S1:E2 The Tagger", size: "398 MB", runtime: 21 },
  { id: "ep_office_s2e1", titleId: "office", label: "The Office · S2:E1 The Dundies", size: "455 MB", runtime: 24 },
];

const SEED = {
  membership: { status: "none", planId: null, startedAt: null, endsOn: null, card: null },
  profiles: [
    { id: "pf_priya", name: "Priya", kids: false, pin: null, avatar: "🟣" },
    { id: "pf_marco", name: "Marco", kids: false, pin: "4821", avatar: "🔵" },
    { id: "pf_kids", name: "Kids", kids: true, pin: null, avatar: "🟡" },
  ],
  activeProfile: "pf_priya",
  progress: {
    b99: { seconds: 540, runtime: 1320, updatedAt: "2026-09-12" },
  },
  downloads: [],
};

export const { useStore, reset } = createStore("streamflix", SEED);

export const fmtTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};
