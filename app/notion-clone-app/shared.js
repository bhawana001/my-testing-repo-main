"use client";
// Notiond (Notion) clone: pages assembled from real block types that survive a
// reload, a database view whose filter and sort actually change the rows shown,
// web publishing that produces a page anyone can open without signing in,
// templates that duplicate into the workspace, and per-block comments whose
// mentions raise a notification.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Notiond", slug: "notion", mark: "◼", home: "/notion-clone-app",
  accent: "#2f3437", accentText: "#fff", bg: "#f7f6f3" };
export const BASE = "/notion-clone-app";

export const ME = { name: "Priya Nair" };
export const TEAMMATES = ["Tom Alvarez", "Mira Shah", "Dan Okafor"];

export const BLOCK_TYPES = [
  { id: "heading", label: "Heading" },
  { id: "text", label: "Text" },
  { id: "todo", label: "To-do" },
  { id: "table", label: "Table" },
];

export const STATUSES = ["Not started", "In progress", "Done"];

const SEED = {
  pages: {
    home: {
      id: "home", title: "Team home", published: false,
      blocks: [
        { id: "b1", type: "heading", text: "Team home" },
        { id: "b2", type: "text", text: "Everything the team needs, in one place." },
      ],
      comments: [],
    },
  },
  database: {
    name: "Roadmap",
    rows: [
      { id: "r1", name: "Checkout redesign", status: "In progress", due: "2026-09-18", owner: "Mira Shah" },
      { id: "r2", name: "Search relevance", status: "Not started", due: "2026-10-02", owner: "Dan Okafor" },
      { id: "r3", name: "Billing migration", status: "Done", due: "2026-08-29", owner: "Tom Alvarez" },
      { id: "r4", name: "Mobile nav polish", status: "In progress", due: "2026-09-25", owner: "Priya Nair" },
      { id: "r5", name: "Onboarding emails", status: "Not started", due: "2026-09-12", owner: "Mira Shah" },
    ],
  },
  notifications: [],
  counter: 100,
};

export const TEMPLATES = [
  { id: "tpl_meeting", name: "Meeting notes",
    blocks: [
      { type: "heading", text: "Meeting notes" },
      { type: "text", text: "Attendees: " },
      { type: "todo", text: "Share the recording", done: false },
      { type: "todo", text: "File follow-up tickets", done: false },
    ] },
  { id: "tpl_prd", name: "Product brief",
    blocks: [
      { type: "heading", text: "Product brief" },
      { type: "text", text: "Problem statement" },
      { type: "table", rows: [["Metric", "Today", "Target"], ["Conversion", "2.1%", "3.0%"]] },
    ] },
];

export const { useStore, reset } = createStore("notion", SEED);
export const nextId = (n) => `n${n}`;

/** Filter then sort — the order matters, and the row count proves both ran. */
export function viewRows(rows, { status = "all", sort = "none" }) {
  let out = rows.filter((r) => status === "all" || r.status === status);
  if (sort === "due-asc") out = [...out].sort((a, b) => a.due.localeCompare(b.due));
  if (sort === "due-desc") out = [...out].sort((a, b) => b.due.localeCompare(a.due));
  return out;
}
