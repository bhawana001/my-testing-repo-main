"use client";
// Airtabel (Airtable) clone: one base, many views over the same records. The
// grid writes through to the store so edits survive a reload, the form view
// appends a real record, the kanban board writes the stage field back onto the
// record it moved, and automations fire on a record change with a run log.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Airtabel", slug: "airtable", mark: "▦", home: "/airtable-clone-app",
  accent: "#2d7ff9", accentText: "#fff", bg: "#f5f8ff" };
export const BASE = "/airtable-clone-app";

export const STAGES = ["Backlog", "In progress", "Review", "Shipped"];
export const OWNERS = ["Priya Nair", "Tom Alvarez", "Mira Shah", "Dan Okafor"];

const SEED = {
  baseName: "Product tracker",
  records: [
    { id: "rec001", name: "Checkout redesign", owner: "Mira Shah", stage: "In progress", effort: 8, notes: "Spec signed off" },
    { id: "rec002", name: "Search relevance", owner: "Dan Okafor", stage: "Backlog", effort: 13, notes: "" },
    { id: "rec003", name: "Billing migration", owner: "Tom Alvarez", stage: "Shipped", effort: 5, notes: "Done in 4.18" },
  ],
  automations: [
    { id: "auto_stage", name: "Notify on Shipped",
      trigger: "When stage becomes Shipped",
      action: "Post to #release and email the owner", enabled: true },
  ],
  runLog: [],
  formSubmissions: 0,
  counter: 4,
};

export const { useStore, reset } = createStore("airtable", SEED);

/** Record ids match Airtable's shape and increment, so assertions stay stable. */
export const nextRecordId = (n) => `rec${String(n).padStart(3, "0")}`;

/**
 * Runs any enabled automation whose trigger matches this change and returns the
 * log entries. Returned rather than pushed so the caller can commit them in the
 * same update as the record change itself.
 */
export function runAutomations(automations, record, change) {
  const entries = [];
  for (const a of automations) {
    if (!a.enabled) continue;
    if (a.id === "auto_stage" && change.field === "stage" && change.to === "Shipped") {
      entries.push({
        id: `run_${record.id}_${entries.length + 1}`,
        automation: a.name, record: record.name,
        detail: `${a.action} — ${record.name} moved ${change.from} → ${change.to}`,
        status: "Succeeded", at: "now",
      });
    }
  }
  return entries;
}
