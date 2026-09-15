"use client";
// Jiira (Jira) clone: issues that get a real project key, a sprint board whose
// moves apply a status transition and write to the issue history, a JQL box that
// genuinely parses the query it is given, and a workflow that refuses to close
// an issue whose required fields are empty.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Jiira", slug: "jira", mark: "◆", home: "/jira-clone-app",
  accent: "#0052cc", accentText: "#fff", bg: "#f4f7fd" };
export const BASE = "/jira-clone-app";

export const PROJECT = { key: "ACME", name: "Acme Platform" };
export const TYPES = ["Bug", "Story", "Task"];
export const PRIORITIES = ["Highest", "High", "Medium", "Low"];
export const COMPONENTS = ["Checkout", "Search", "Billing", "Mobile"];
export const STATUSES = ["To Do", "In Progress", "In Review", "Done"];
export const RESOLUTIONS = ["Fixed", "Won't Fix", "Duplicate", "Cannot Reproduce"];
export const PEOPLE = ["Priya Nair", "Tom Alvarez", "Mira Shah", "Dan Okafor"];

const SEED = {
  issues: [
    { key: "ACME-101", type: "Bug", summary: "Coupon field rejects valid codes", priority: "High",
      component: "Checkout", status: "In Progress", assignee: "Mira Shah", resolution: null,
      history: [{ at: "09:00", text: "Created" }, { at: "09:40", text: "Status: To Do → In Progress" }] },
    { key: "ACME-102", type: "Story", summary: "Save recent searches", priority: "Medium",
      component: "Search", status: "To Do", assignee: "Dan Okafor", resolution: null,
      history: [{ at: "09:05", text: "Created" }] },
    { key: "ACME-103", type: "Bug", summary: "Invoice PDF misses the tax line", priority: "Highest",
      component: "Billing", status: "To Do", assignee: "Tom Alvarez", resolution: null,
      history: [{ at: "09:12", text: "Created" }] },
    { key: "ACME-104", type: "Task", summary: "Raise the mobile tap target size", priority: "Low",
      component: "Mobile", status: "Done", assignee: "Priya Nair", resolution: "Fixed",
      history: [{ at: "08:30", text: "Created" }, { at: "08:58", text: "Status: To Do → Done (Fixed)" }] },
  ],
  savedFilters: [],
  counter: 105,
};

export const { useStore, reset } = createStore("jira", SEED);
export const nextKey = (n) => `${PROJECT.key}-${n}`;

/**
 * A small but real JQL parser: `field op value` clauses joined by AND, with an
 * optional ORDER BY. Anything it cannot parse comes back as an error string so
 * the UI can say what is wrong rather than silently returning everything.
 */
export function runJql(issues, jql) {
  const raw = String(jql || "").trim();
  if (!raw) return { error: "Enter a JQL query.", rows: [] };

  const FIELDS = { project: "project", status: "status", priority: "priority",
    component: "component", type: "type", assignee: "assignee" };

  let where = raw, order = null;
  const om = raw.match(/\border\s+by\s+(.+)$/i);
  if (om) {
    where = raw.slice(0, om.index).trim();
    const [field, dir] = om[1].trim().split(/\s+/);
    order = { field: field.toLowerCase(), dir: (dir || "asc").toLowerCase() };
  }

  const clauses = where.split(/\s+AND\s+/i).map((c) => c.trim()).filter(Boolean);
  const parsed = [];
  for (const c of clauses) {
    const m = c.match(/^(\w+)\s*(!=|=)\s*("[^"]*"|'[^']*'|[^\s]+)$/);
    if (!m) return { error: `Could not parse: ${c}`, rows: [] };
    const field = m[1].toLowerCase();
    if (!FIELDS[field]) return { error: `Unknown field: ${m[1]}`, rows: [] };
    const value = m[3].replace(/^["']|["']$/g, "");
    parsed.push({ field, op: m[2], value });
  }

  let rows = issues.filter((i) =>
    parsed.every(({ field, op, value }) => {
      const actual = field === "project" ? i.key.split("-")[0] : String(i[field] ?? "");
      const hit = actual.toLowerCase() === value.toLowerCase();
      return op === "=" ? hit : !hit;
    })
  );

  if (order && order.field !== "key") {
    rows = [...rows].sort((a, b) => String(a[order.field] ?? "").localeCompare(String(b[order.field] ?? "")));
  } else if (order) {
    rows = [...rows].sort((a, b) => a.key.localeCompare(b.key));
  }
  if (order && order.dir === "desc") rows.reverse();

  return { error: null, rows, clauses: parsed, order };
}

/**
 * The close transition requires a resolution. This is the workflow rule the
 * validation use case exercises, so it is stated once here.
 */
export function transitionBlockers(issue, toStatus, patch = {}) {
  const blockers = [];
  if (toStatus === "Done") {
    const resolution = patch.resolution !== undefined ? patch.resolution : issue.resolution;
    if (!resolution) blockers.push("Resolution is required before this issue can be closed.");
    const assignee = patch.assignee !== undefined ? patch.assignee : issue.assignee;
    if (!assignee) blockers.push("Assignee is required before this issue can be closed.");
  }
  return blockers;
}
