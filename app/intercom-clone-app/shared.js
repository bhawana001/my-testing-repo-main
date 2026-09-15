"use client";
// Intercomm (Intercom) clone: one conversation store that the customer-facing
// messenger and the agent inbox both read, so a handoff really does carry the
// transcript across; article suggestions matched from what is typed; and
// outbound messages whose audience rules decide which page they appear on.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Intercomm", slug: "intercom", mark: "◗", home: "/intercom-clone-app",
  accent: "#1f8ded", accentText: "#fff", bg: "#f3f8fe" };
export const BASE = "/intercom-clone-app";

export const VISITOR = { name: "Sam Rivera", email: "sam@riverfield.test", plan: "Pro", country: "India" };
export const AGENTS = ["Priya Nair", "Tom Alvarez"];

export const ARTICLES = [
  { id: "a1", title: "Resetting your password", tags: ["password", "reset", "login", "sign in"],
    body: "Open Settings, choose Security, then Reset password. The link expires in 30 minutes." },
  { id: "a2", title: "Changing your billing plan", tags: ["billing", "plan", "upgrade", "invoice", "price"],
    body: "Go to Billing, pick a plan, and confirm. Changes are prorated to the day." },
  { id: "a3", title: "Inviting teammates", tags: ["invite", "team", "seat", "member", "teammate"],
    body: "Settings then Teammates, enter an email, choose a role and send." },
  { id: "a4", title: "Exporting your data", tags: ["export", "csv", "download", "data"],
    body: "Reports then Export. Large exports arrive by email within ten minutes." },
];

/** The scripted bot: each branch either answers or offers a human. */
export const BOT_OPTIONS = [
  { id: "billing", label: "A billing question", reply: "I can help with billing. Which plan are you on?" },
  { id: "bug", label: "Something is broken", reply: "Sorry about that. What were you doing when it broke?" },
  { id: "human", label: "I want to talk to a person", reply: null },
];

/** Outbound rules decide the page a message shows on and who sees it. */
export const OUTBOUND = [
  { id: "ob_pricing", title: "Not sure which plan fits?", body: "Book 15 minutes with us and we will size it with you.",
    cta: "Book a call", page: "pricing", audience: "Pro" },
  { id: "ob_docs", title: "New: bulk export", body: "You can now export a whole workspace in one go.",
    cta: "Read the guide", page: "docs", audience: "all" },
];
export const PAGES = [
  { id: "pricing", label: "Pricing page" },
  { id: "docs", label: "Documentation" },
  { id: "home", label: "Home page" },
];

const SEED = {
  conversations: [],
  ctaClicks: [],
  counter: 100,
};

export const { useStore, reset } = createStore("intercom", SEED);
export const convId = (n) => `CNV-${String(41820 + n * 7)}`;

/** Articles whose tags or title match what the visitor typed. */
export function suggestArticles(text) {
  const q = String(text || "").toLowerCase();
  if (q.trim().length < 3) return [];
  return ARTICLES.filter((a) =>
    a.tags.some((t) => q.includes(t)) || q.includes(a.title.toLowerCase().split(" ")[0]));
}

export function matchingOutbound(pageId, plan) {
  return OUTBOUND.filter((o) => o.page === pageId && (o.audience === "all" || o.audience === plan));
}
