"use client";
// Spotifly (Spotify) clone: the free tier really does interrupt playback with an
// ad every few tracks, premium removes it and lights the badge, playlists keep
// the tracks you add, playback state hands off between devices with the position
// intact, and a family invite sits pending until it is accepted.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Spotifly", slug: "spotify", mark: "◉", home: "/spotify-clone-app",
  accent: "#1db954", accentText: "#000", bg: "#f2fbf5" };
export const BASE = "/spotify-clone-app";

export const ME = { name: "Priya Nair", email: "priya@acmerobotics.test" };

export const TRACKS = [
  { id: "t1", title: "Neon Harbour", artist: "Vela Nine", album: "Tidewalk", seconds: 214 },
  { id: "t2", title: "Paper Lanterns", artist: "Hollow Coast", album: "Slow Signal", seconds: 187 },
  { id: "t3", title: "Glass Corridor", artist: "Vela Nine", album: "Tidewalk", seconds: 243 },
  { id: "t4", title: "Winter Radio", artist: "Marlowe Grey", album: "Static Bloom", seconds: 201 },
  { id: "t5", title: "Every Ember", artist: "Hollow Coast", album: "Slow Signal", seconds: 176 },
];

export const PLANS = {
  free: { id: "free", label: "Free", price: 0, ads: true },
  premium: { id: "premium", label: "Premium Individual", price: 11.99, ads: false },
  family: { id: "family", label: "Premium Family", price: 19.99, ads: false, seats: 6 },
};

/** Free listeners hear an ad after this many tracks. Premium never does. */
export const ADS_EVERY = 3;

const SEED = {
  plan: "free",
  playlists: [
    { id: "pl_liked", name: "Liked Songs", trackIds: ["t1"], owner: "Priya Nair" },
  ],
  devices: [
    { id: "web", name: "Web Player — Chrome", kind: "Computer", active: true },
    { id: "phone", name: "Priya's Phone", kind: "Phone", active: false },
    { id: "speaker", name: "Kitchen Speaker", kind: "Speaker", active: false },
  ],
  playback: { trackId: "t1", positionSeconds: 0, playing: false, deviceId: "web", tracksPlayed: 0 },
  adsSeen: 0,
  family: { members: [{ email: "priya@acmerobotics.test", name: "Priya Nair", status: "Owner" }], invites: [] },
  payments: [],
  counter: 100,
};

export const { useStore, reset } = createStore("spotify", SEED);

export const track = (id) => TRACKS.find((t) => t.id === id) || TRACKS[0];
export const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Whether the next track would be interrupted by an ad, given the plan. */
export function adDue(state) {
  if (!PLANS[state.plan].ads) return false;
  return (state.playback.tracksPlayed + 1) % ADS_EVERY === 0;
}
