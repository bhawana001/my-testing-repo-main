"use client";
// Mondee (Monday.com) clone: two boards so sharing means something, items with
// status and person columns, automation recipes that fire on a status change and
// leave a notification behind, a dashboard widget computed from live board data,
// and guests whose access is scoped to exactly the boards they were invited to.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Mondee", slug: "monday", mark: "▤", home: "/monday-clone-app",
  accent: "#ff3d57", accentText: "#fff", bg: "#fff6f7" };
export const BASE = "/monday-clone-app";

export const STATUSES = ["Working on it", "Stuck", "Done", "Not started"];
export const STATUS_TONE = { "Done": "ok", "Working on it": "info", "Stuck": "bad", "Not started": "neutral" };
export const PEOPLE = ["Priya Nair", "Tom Alvarez", "Mira Shah", "Dan Okafor"];

const SEED = {
  boards: {
    launch: {
      id: "launch", name: "Launch plan",
      items: [
        { id: "i1", name: "Book the venue", status: "Done", person: "Mira Shah", due: "2026-09-10" },
        { id: "i2", name: "Print the banners", status: "Working on it", person: "Tom Alvarez", due: "2026-09-18" },
        { id: "i3", name: "Confirm the keynote", status: "Stuck", person: "Dan Okafor", due: "2026-09-15" },
      ],
    },
    hiring: {
      id: "hiring", name: "Hiring pipeline",
      items: [
        { id: "i4", name: "Screen backend candidates", status: "Working on it", person: "Priya Nair", due: "2026-09-20" },
        { id: "i5", name: "Schedule design panel", status: "Not started", person: "Mira Shah", due: "2026-09-24" },
      ],
    },
  },
  automations: [],
  notifications: [],
  guests: [],
  widgets: [],
  counter: 100,
};

export const { useStore, reset } = createStore("monday", SEED);
export const nextId = (n) => `i${n}`;

/** Counts per status for one board — the number the chart widget draws. */
export function statusBreakdown(board) {
  const out = {};
  for (const st of STATUSES) out[st] = 0;
  for (const it of board.items) out[it.status] = (out[it.status] || 0) + 1;
  return out;
}

/**
 * Fires every recipe matching this status change and returns the notifications
 * it produced, so the caller can commit them alongside the item change itself.
 */
export function fireAutomations(automations, boardId, item, to) {
  const out = [];
  for (const a of automations) {
    if (a.boardId !== boardId) continue;
    if (a.whenStatus !== to) continue;
    out.push({
      id: `n_${item.id}_${a.id}`,
      to: a.notify, recipe: a.label,
      text: `“${item.name}” changed to ${to} on ${a.boardName}`,
      at: "now",
    });
  }
  return out;
}

/** A guest sees only the boards they were invited to — nothing else. */
export function boardsVisibleTo(state, viewer) {
  if (viewer === "owner") return Object.values(state.boards);
  const guest = state.guests.find((g) => g.email === viewer);
  if (!guest) return [];
  return guest.boardIds.map((id) => state.boards[id]).filter(Boolean);
}
