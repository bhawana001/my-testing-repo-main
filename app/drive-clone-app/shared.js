"use client";
// Drivve (Google Drive) clone: permission levels that really gate the controls a
// recipient gets, a document two sessions can edit at once with visible cursors
// and no lost line, drive-wide search filtered by file type, and an offline mode
// that queues edits locally and flushes them on reconnect.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Drivve", slug: "drive", mark: "▲", home: "/drive-clone-app",
  accent: "#1a73e8", accentText: "#fff", bg: "#f6f9fe" };
export const BASE = "/drive-clone-app";

export const ME = "Priya Nair";
export const PEOPLE = ["Tom Alvarez", "Mira Shah", "Dan Okafor"];

export const ROLES = [
  { id: "viewer", label: "Viewer", detail: "Can read. No comments, no edits." },
  { id: "commenter", label: "Commenter", detail: "Can read and comment. Cannot edit the document." },
  { id: "editor", label: "Editor", detail: "Can read, comment and edit." },
];
export const FILE_TYPES = ["Document", "Spreadsheet", "Presentation", "PDF", "Image"];

const SEED = {
  files: [
    { id: "d1", name: "Launch plan", type: "Document", owner: "Priya Nair", modified: "2026-09-12",
      body: ["Launch plan — Acme Robotics", "Owner: Priya Nair"] },
    { id: "d2", name: "Q3 revenue model", type: "Spreadsheet", owner: "Dan Okafor", modified: "2026-09-09",
      body: ["Revenue model for Q3"] },
    { id: "d3", name: "Launch deck", type: "Presentation", owner: "Mira Shah", modified: "2026-09-11",
      body: ["Slide 1 — why now"] },
    { id: "d4", name: "Security review.pdf", type: "PDF", owner: "Tom Alvarez", modified: "2026-08-30",
      body: ["Security review, signed off"] },
    { id: "d5", name: "Launch banner", type: "Image", owner: "Mira Shah", modified: "2026-09-05",
      body: ["binary image"] },
  ],
  shares: [],
  comments: [],
  coedit: { docId: "d1", lines: ["Launch plan — Acme Robotics", "Owner: Priya Nair"], cursors: {} },
  offline: { connected: true, queue: [], docId: "d1" },
  counter: 100,
};

export const { useStore, reset } = createStore("drive", SEED);
export const nextId = (n) => `x${n}`;

export const roleOf = (shares, fileId, who) => {
  const s = shares.find((x) => x.fileId === fileId && x.who === who);
  return s ? s.role : null;
};
export const can = (role, action) => {
  if (role === "editor") return true;
  if (role === "commenter") return action !== "edit";
  if (role === "viewer") return action === "view";
  return false;
};

/** Drive search: keyword over name and body, then narrowed by file type. */
export function searchFiles(files, query, type = "all") {
  const q = String(query || "").trim().toLowerCase();
  return files.filter((f) => {
    if (type !== "all" && f.type !== type) return false;
    if (!q) return true;
    return f.name.toLowerCase().includes(q) || f.body.join(" ").toLowerCase().includes(q);
  });
}
