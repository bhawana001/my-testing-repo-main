"use client";
// Teemz (Microsoft Teams) clone: a calendar you actually join from into a live
// meeting screen with working mic and camera controls, channel posts whose
// @ mentions land in the mentioned person's Activity feed, shared documents
// that keep every typed line plus a presence list, and custom tab apps that
// load their own surface inside the channel.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Teemz", slug: "teams", mark: "❒",
  home: "/teams-clone-app", accent: "#4b53bc", accentText: "#fff", bg: "#f5f5fb" };
export const BASE = "/teams-clone-app";

export const ME = { id: "u_me", name: "Priya Nair", initials: "PN" };
export const PEOPLE = [
  ME,
  { id: "u_tom", name: "Tom Alvarez", initials: "TA" },
  { id: "u_mira", name: "Mira Shah", initials: "MS" },
  { id: "u_dan", name: "Dan Okafor", initials: "DO" },
];

export const TEAM_CHANNELS = [
  { id: "eng", name: "Engineering", team: "Acme Robotics" },
  { id: "launch", name: "Launch planning", team: "Acme Robotics" },
];

export const TAB_APPS = [
  { id: "tasks", name: "Task Board", blurb: "A shared board pinned into the channel." },
  { id: "wiki", name: "Team Wiki", blurb: "Long-form notes that live beside the chat." },
];

const SEED = {
  meetings: [
    { id: "mtg_1", title: "Launch readiness review", time: "10:00 – 10:30", organizer: "Mira Shah",
      attendees: 4, joined: false },
    { id: "mtg_2", title: "Design sync", time: "14:00 – 14:45", organizer: "Dan Okafor",
      attendees: 3, joined: false },
  ],
  inMeeting: null,
  posts: {
    eng: [
      { id: "p1", user: "Dan Okafor", text: "Build 4.19 is green.", mentions: [], at: "09:30", replies: [] },
    ],
    launch: [
      { id: "p2", user: "Mira Shah", text: "Launch checklist is in the shared doc.", mentions: [], at: "09:48", replies: [] },
    ],
  },
  activity: [],
  docs: {
    launch_plan: {
      id: "launch_plan", name: "Launch plan.docx", channel: "launch",
      lines: ["Launch plan — Acme Robotics", "1. Freeze on Friday"],
      editors: ["Mira Shah"],
    },
  },
  tabs: [],
  counter: 100,
};

export const { useStore, reset } = createStore("teams", SEED);
export const nextId = (n) => `t${n}`;

/** Picks out @Name mentions so they can be routed to the Activity feed. */
export function parseMentions(text) {
  const found = [];
  for (const p of PEOPLE) {
    const tag = "@" + p.name;
    if (text.includes(tag) || text.toLowerCase().includes("@" + p.name.split(" ")[0].toLowerCase())) {
      found.push(p.name);
    }
  }
  return [...new Set(found)];
}
