// Writes ENTITY-EVALS-PLAN.md (the day-by-day ship plan) from lib/registry.js
// so the plan and the registry can never disagree.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FLOWS, ENTITIES, PATTERN_LABELS, INDUSTRIES } from "../lib/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const START = new Date(Date.UTC(2026, 8, 11)); // Day 1 = 2026-09-11
const dateOf = (day) => new Date(START.getTime() + (day - 1) * 86400000).toISOString().slice(0, 10);

const DAY_NOTES = {
  1: "Repo inspection, catalog import, registry, route namespace, homepage Entity Evals section, EvalShell + state/reset, design system, test.md generator + INDEX. Plan published.",
  2: "The 8 pattern engines (checkout, auth, form wizard, CRUD table/board, tracker timeline, media player, booking calendar, feed) + seed data. One pilot flow per engine shipped with a verified test.md.",
  3: "Checkout engine batch A: e-commerce carts, variants, coupons, pickup, multi-seller, tips.",
  4: "Checkout engine batch B: payment widgets (hosted checkout, 3DS, declines, UPI, EMI, drop-in, pay-in-4).",
  5: "Auth + transfer wizards: bank portals (2FA/OTP login, transfers, scheduling, disputes, FD, statements).",
  6: "Wallet + P2P skins (mobile web equivalents): UPI, recharge, bills, feeds, split bills, mandates.",
  7: "Trading and crypto: order tickets, portfolios, P&L tables, GTT, recurring buys, alerts; plus Nyke and eBidz leftovers.",
  8: "Form wizards + CRM: insurance quotes and claims, comparison tables, leads, kanban pipelines, reports, screen flows.",
  9: "Support SaaS CRUD: tickets, macros, help center, SLA timers, messenger/bot handoff, imports, blueprints.",
  10: "ITSM + work collab: incidents, approvals, catalog orders, Slacky feed, meetings, waiting rooms, recordings.",
  11: "Docs and boards: Notionly blocks/databases, Airtably grid/kanban/automations, Asanah, Jirah.",
  12: "Boards, e-sign and files: Mondayly, DocuSigned envelopes, Dropboxy and Drively sharing/versions.",
  13: "Booking + media: Calendlee, Netflixy playback/profiles/cancel, Spotifly, YouTubely; Amazonia search and returns.",
  14: "Remaining dashboards/admin flows, full verification pass of all 208 test.md against production, README route map, final deploy.",
};

const L = [];
L.push("# Entity Evals: 14-day build plan");
L.push("");
L.push(`Scope: catalog rows 2-209 (owner Bhawana) = **${ENTITIES.length} entities, ${FLOWS.length} flows**. Day 1 = ${dateOf(1)}, hard deadline day 14 = ${dateOf(14)}.`);
L.push("");
L.push("## Route namespace (confirmed free)");
L.push("");
L.push("- Flow pages: `/{entity-slug}/{flow-slug}` (e.g. `/amazon/add-to-cart-variant`, `/stripe/3ds-challenge`, `/netflix/profile-pin`).");
L.push("- Entity landing pages: `/{entity-slug}` listing that entity's flows.");
L.push("- Implemented as `app/[entity]/[flow]/page.js` with `dynamicParams=false`, so only registry slugs resolve; every existing route (`/bank-clone-app/*`, `/shop-clone-app/*`, `/cart`, `/checkout`, `/login`, `/interactive-website`, `/api/*`) is a static file route and keeps precedence. No existing file was modified except `app/page.js` (new section appended below the clones grid).");
L.push("- Every flow honours `?reset=true` and `?chaos=true` and shows a Reset button in the eval strip.");
L.push("- Tests: `tests/{entity-slug}/{flow-slug}_test.md` (kane-cli requires the `_test.md` suffix, so `.test.md` from the brief becomes `_test.md`).");
L.push("");
L.push("## Entities");
L.push("");
L.push("| # | Entity | Skin | Industry | Flows | Landing |");
L.push("|---|---|---|---|---|---|");
for (const e of ENTITIES) {
  const n = FLOWS.filter((f) => f.entitySlug === e.slug).length;
  L.push(`| ${e.no} | ${e.name} | ${e.skin} | ${e.industry} | ${n} | \`/${e.slug}\` |`);
}
L.push("");
L.push("## Pattern engines (app/components/engines)");
L.push("");
L.push("| Engine | Flows using it |");
L.push("|---|---|");
for (const [k, v] of Object.entries(PATTERN_LABELS)) {
  L.push(`| ${v} (\`${k}\`) | ${FLOWS.filter((f) => f.pattern === k).length} |`);
}
L.push("");
L.push("## Day-by-day");
L.push("");
L.push("| Day | Date | Flows | Cumulative | Focus |");
L.push("|---|---|---|---|---|");
let cum = 0;
for (let d = 1; d <= 14; d++) {
  const n = FLOWS.filter((f) => f.day === d).length;
  cum += n;
  L.push(`| ${d} | ${dateOf(d)} | ${n} | ${cum} | ${DAY_NOTES[d]} |`);
}
L.push("");
for (let d = 2; d <= 14; d++) {
  const fl = FLOWS.filter((f) => f.day === d);
  L.push(`### Day ${d} · ${dateOf(d)} · ${fl.length} flows`);
  L.push("");
  L.push(DAY_NOTES[d]);
  L.push("");
  L.push("| UC | Skin | Use case | Engine | Route |");
  L.push("|---|---|---|---|---|");
  for (const f of fl) L.push(`| ${f.uc} | ${f.skin} | ${f.useCase} | ${PATTERN_LABELS[f.pattern]} | \`${f.path}\` |`);
  L.push("");
}
L.push("## Industries");
L.push("");
L.push(INDUSTRIES.map((i) => `${i} (${ENTITIES.filter((e) => e.industry === i).length})`).join(" · "));
L.push("");
fs.writeFileSync(path.join(ROOT, "ENTITY-EVALS-PLAN.md"), L.join("\n"));
console.log("ENTITY-EVALS-PLAN.md written");
