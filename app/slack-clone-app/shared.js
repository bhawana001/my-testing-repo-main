"use client";
// Slaick (Slack) clone: a workspace with real channels, threads that carry their
// own reply counts, uploads that preview inline, search that can be scoped to a
// single channel, huddles that stay active across pages, and workflow forms that
// post a confirmation back into the channel they were triggered from.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Slaick", slug: "slack", mark: "⌗",
  home: "/slack-clone-app", accent: "#4a154b", accentText: "#fff", bg: "#f8f4f9" };
export const BASE = "/slack-clone-app";

export const ME = { id: "u_me", name: "Priya Nair", handle: "@priya" };
export const MEMBERS = [
  ME,
  { id: "u_tom", name: "Tom Alvarez", handle: "@tom" },
  { id: "u_mira", name: "Mira Shah", handle: "@mira" },
  { id: "u_dan", name: "Dan Okafor", handle: "@dan" },
];

export const CHANNELS = [
  { id: "general", name: "general", purpose: "Company-wide announcements" },
  { id: "design", name: "design", purpose: "Design crits and specs" },
  { id: "release", name: "release", purpose: "Ship logs and rollbacks" },
];

const SEED = {
  messages: {
    general: [
      { id: "m1", user: "Tom Alvarez", text: "Welcome to the release week thread.", at: "09:02", replies: [] },
      { id: "m2", user: "Mira Shah", text: "Reminder: deploy freeze starts Friday.", at: "09:14", replies: [] },
    ],
    design: [
      { id: "m3", user: "Mira Shah", text: "New checkout spec is in the deploy doc.", at: "10:20", replies: [] },
      { id: "m4", user: "Dan Okafor", text: "Deploy freeze does not apply to design tokens.", at: "10:41", replies: [] },
    ],
    release: [
      { id: "m5", user: "Dan Okafor", text: "Build 4.19 is green, starting the deploy now.", at: "11:05", replies: [] },
    ],
  },
  files: [],
  huddle: null,
  workflowRuns: [],
  counter: 100,
};

export const { useStore, reset } = createStore("slack", SEED);

export const nextId = (n) => `x${n}`;

/** Total replies under a message, which is what the thread badge shows. */
export const threadCount = (m) => (m.replies ? m.replies.length : 0);

/**
 * Cross-channel search. Returns one hit per matching message with the channel
 * it came from, so the results page can filter by channel without re-searching.
 */
export function searchMessages(messages, query, channelId = "all") {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];
  const hits = [];
  for (const ch of CHANNELS) {
    if (channelId !== "all" && ch.id !== channelId) continue;
    for (const m of messages[ch.id] || []) {
      const all = [m, ...(m.replies || [])];
      for (const item of all) {
        if (item.text.toLowerCase().includes(q)) {
          hits.push({ channel: ch.id, channelName: ch.name, user: item.user, text: item.text, at: item.at, id: item.id });
        }
      }
    }
  }
  return hits;
}

/** Splits text so the matched run can be wrapped in <mark> for the highlight. */
export function highlight(text, query) {
  const q = String(query || "").trim();
  if (!q) return [text];
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return [text];
  return [text.slice(0, i), text.slice(i, i + q.length), text.slice(i + q.length)];
}

export const WORKFLOWS = [
  { id: "wf_pto", name: "Time off request", channel: "general",
    fields: [
      { id: "dates", label: "Dates", type: "text", placeholder: "Oct 2 to Oct 6" },
      { id: "type", label: "Type", type: "select", options: ["Vacation", "Sick", "Personal"] },
      { id: "cover", label: "Who is covering", type: "text", placeholder: "Tom Alvarez" },
    ] },
];
