"use client";
// Dropbaks (Dropbox) clone: share links that a signed-out visitor can actually
// open at view-only, folder permissions that decide whether a member sees an
// Edit button at all, file requests that drop a guest upload into the folder
// they were aimed at, and version history where restoring really swaps the
// content back.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Dropbaks", slug: "dropbox", mark: "❒", home: "/dropbox-clone-app",
  accent: "#0061fe", accentText: "#fff", bg: "#f2f7ff" };
export const BASE = "/dropbox-clone-app";

export const ME = "Priya Nair";
export const MEMBERS = ["Tom Alvarez", "Mira Shah", "Dan Okafor"];
export const ACCESS = [
  { id: "view", label: "Can view", detail: "Members can open and download, not change" },
  { id: "edit", label: "Can edit", detail: "Members can rename, replace and delete" },
];

const SEED = {
  folders: {
    launch: { id: "launch", name: "Launch assets", access: "view", members: ["Tom Alvarez", "Mira Shah"] },
    finance: { id: "finance", name: "Finance", access: "edit", members: ["Dan Okafor"] },
  },
  files: [
    { id: "f1", name: "launch-brief.txt", folder: "launch", owner: "Priya Nair", size: "14 KB",
      content: "Launch brief — version 3\nAudience: existing customers",
      versions: [
        { v: 1, at: "2026-09-08 09:10", by: "Priya Nair", content: "Launch brief — version 1\nAudience: everyone" },
        { v: 2, at: "2026-09-10 11:42", by: "Mira Shah", content: "Launch brief — version 2\nAudience: enterprise" },
        { v: 3, at: "2026-09-12 16:05", by: "Priya Nair", content: "Launch brief — version 3\nAudience: existing customers" },
      ] },
    { id: "f2", name: "pricing.csv", folder: "finance", owner: "Dan Okafor", size: "3 KB",
      content: "plan,price\nstarter,19\npro,49",
      versions: [{ v: 1, at: "2026-09-09 10:00", by: "Dan Okafor", content: "plan,price\nstarter,19\npro,49" }] },
  ],
  shareLinks: [],
  fileRequests: [],
  counter: 100,
};

export const { useStore, reset } = createStore("dropbox", SEED);

/** Share and request tokens are sequential so a link is reproducible in a test. */
export const token = (prefix, n) => `${prefix}${String(4820 + n * 13)}`;
export const nextId = (n) => `f${n}`;

/** What a member may do in a folder — the whole point of the permission change. */
export function canEdit(folder, who) {
  if (who === ME) return true;
  if (!folder.members.includes(who)) return false;
  return folder.access === "edit";
}
