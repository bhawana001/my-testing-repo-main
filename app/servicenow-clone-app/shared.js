"use client";
// ServiceNau (ServiceNow) clone: incidents whose priority is derived from impact
// and urgency the way the real priority matrix does, change requests that move
// state only when an approver actually approves, catalog items whose form
// variables travel onto the RITM, and knowledge articles with a helpful vote.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "ServiceNau", slug: "servicenow", mark: "◎", home: "/servicenow-clone-app",
  accent: "#293e40", accentText: "#fff", bg: "#f2f6f6" };
export const BASE = "/servicenow-clone-app";

export const ME = "Priya Nair";
export const APPROVERS = ["Dan Okafor", "Mira Shah"];
export const ASSIGNMENT_GROUPS = [
  { id: "svcdesk", name: "Service Desk", members: ["Tom Alvarez"] },
  { id: "network", name: "Network", members: ["Dan Okafor"] },
  { id: "apps", name: "Application Support", members: ["Mira Shah"] },
];
export const CATEGORIES = ["Hardware", "Software", "Network", "Database", "Enquiry"];
export const IMPACT = ["1 - High", "2 - Medium", "3 - Low"];
export const URGENCY = ["1 - High", "2 - Medium", "3 - Low"];

/** The standard 3x3 priority matrix: impact rows, urgency columns. */
const MATRIX = [
  ["1 - Critical", "2 - High", "3 - Moderate"],
  ["2 - High", "3 - Moderate", "4 - Low"],
  ["3 - Moderate", "4 - Low", "5 - Planning"],
];
export function derivePriority(impact, urgency) {
  const i = IMPACT.indexOf(impact);
  const u = URGENCY.indexOf(urgency);
  if (i < 0 || u < 0) return "4 - Low";
  return MATRIX[i][u];
}

/** Which group picks the incident up, by category. */
export function routeCategory(category) {
  if (category === "Network") return ASSIGNMENT_GROUPS[1];
  if (category === "Software" || category === "Database") return ASSIGNMENT_GROUPS[2];
  return ASSIGNMENT_GROUPS[0];
}

export const CATALOG = [
  { id: "ci_laptop", name: "Standard laptop", blurb: "A managed laptop with the standard image.",
    variables: [
      { id: "model", label: "Model", type: "select", options: ["14 inch ultraportable", "16 inch workstation"] },
      { id: "memory", label: "Memory", type: "select", options: ["16 GB", "32 GB", "64 GB"] },
      { id: "justification", label: "Business justification", type: "text" },
    ] },
  { id: "ci_access", name: "Application access", blurb: "Request access to an internal application.",
    variables: [
      { id: "application", label: "Application", type: "select", options: ["Billing console", "Warehouse portal", "Reporting"] },
      { id: "level", label: "Access level", type: "select", options: ["Read only", "Contributor", "Administrator"] },
      { id: "until", label: "Needed until", type: "date" },
    ] },
];

export const KB = [
  { id: "KB0010021", title: "Resetting a locked account", category: "Access",
    body: "Open the Identity console, find the user, choose Unlock, then ask them to sign in within 15 minutes.",
    helpful: 34, notHelpful: 2 },
  { id: "KB0010044", title: "VPN drops every few minutes", category: "Network",
    body: "Switch the tunnel profile from split to full, restart the client, and retest for ten minutes.",
    helpful: 51, notHelpful: 7 },
  { id: "KB0010098", title: "Requesting a standard laptop", category: "Hardware",
    body: "Use the service catalog. Standard laptops ship in three working days; workstations take ten.",
    helpful: 18, notHelpful: 1 },
];

const SEED = {
  incidents: [],
  changes: [
    { id: "CHG0030011", summary: "Upgrade the load balancer firmware", risk: "Moderate",
      state: "Assess", requestedBy: "Tom Alvarez", approver: "Dan Okafor", approvals: [],
      window: "2026-09-20 22:00 to 02:00",
      log: [{ at: "2026-09-14", text: "Created in Assess" }] },
  ],
  requests: [],
  votes: {},
  counter: 1,
};

export const { useStore, reset } = createStore("servicenow", SEED);

export const incidentNumber = (n) => `INC${String(10000000 + 24501 + n).slice(-7)}`;
export const ritmNumber = (n) => `RITM${String(10000000 + 8810 + n).slice(-7)}`;
export const changeNumber = (n) => `CHG${String(10000000 + 30012 + n).slice(-7)}`;
