"use client";
// Zohoe CRM (Zoho CRM) clone: a CSV import whose mapping decides which column
// lands in which field, workflow rules that genuinely rewrite a field when their
// criteria match, a blueprint that refuses a transition until its required
// inputs are supplied, and a dashboard whose KPI cards are computed by the same
// function as the report table beneath them.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Zohoe CRM", slug: "zoho", mark: "◑", home: "/zoho-clone-app",
  accent: "#e42527", accentText: "#fff", bg: "#fff5f5" };
export const BASE = "/zoho-clone-app";
export { money };

export const FIELDS = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "company", label: "Company" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "source", label: "Lead Source" },
  { id: "rating", label: "Rating" },
  { id: "amount", label: "Deal Amount" },
];

export const BLUEPRINT = [
  { id: "qualification", name: "Qualification", next: "needs",
    requires: [{ id: "budget", label: "Confirmed budget", type: "number" },
               { id: "authority", label: "Decision maker name", type: "text" }] },
  { id: "needs", name: "Needs analysis", next: "proposal",
    requires: [{ id: "painPoint", label: "Primary pain point", type: "text" }] },
  { id: "proposal", name: "Proposal sent", next: "won",
    requires: [{ id: "proposalDate", label: "Proposal sent on", type: "date" },
               { id: "discount", label: "Discount offered (%)", type: "number" }] },
  { id: "won", name: "Closed won", next: null, requires: [] },
];

export const WORKFLOW_RULES = [
  { id: "wf_hot", name: "Flag high value leads",
    when: "Deal Amount is 50,000 or more", field: "rating", value: "Hot",
    test: (lead) => Number(lead.amount || 0) >= 50000 },
  { id: "wf_web", name: "Route web leads",
    when: "Lead Source is Web", field: "owner", value: "Priya Nair",
    test: (lead) => String(lead.source || "").toLowerCase() === "web" },
];

const SEED = {
  leads: [
    { id: "L1", firstName: "Mira", lastName: "Shah", company: "Northgate Supply",
      email: "mira@northgate.test", phone: "555 0142", source: "Referral",
      rating: "Warm", amount: 24000, owner: "Unassigned", stage: "qualification", blueprintData: {},
      log: [{ at: "2026-09-08", text: "Lead created" }] },
  ],
  imports: [],
  ruleRuns: [],
  counter: 2,
};

export const { useStore, reset } = createStore("zoho", SEED);

export const leadId = (n) => `L${n}`;

/** Parses a small CSV into a header row and data rows. */
export function parseCsv(text) {
  const lines = String(text || "").trim().split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return { headers: [], rows: [], error: "Paste a header row and at least one data row." };
  const split = (l) => l.split(",").map((c) => c.trim());
  const headers = split(lines[0]);
  const rows = lines.slice(1).map(split).filter((r) => r.length === headers.length);
  if (rows.length === 0) return { headers, rows: [], error: "No data row matched the header column count." };
  return { headers, rows, error: null };
}

/** One place that decides the report numbers, so the KPI cards cannot drift. */
export function reportNumbers(leads) {
  const total = leads.length;
  const pipeline = leads.reduce((n, l) => n + Number(l.amount || 0), 0);
  const hot = leads.filter((l) => l.rating === "Hot").length;
  const unassigned = leads.filter((l) => !l.owner || l.owner === "Unassigned").length;
  const won = leads.filter((l) => l.stage === "won").length;
  const avg = total ? Math.round(pipeline / total) : 0;
  return { total, pipeline, hot, unassigned, won, avg };
}
