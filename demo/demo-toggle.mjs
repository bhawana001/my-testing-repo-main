#!/usr/bin/env node
// ============================================================
// Off-screen failure-mode toggle for the Kane CLI vs Playwright MCP demo.
//
//   node demo/demo-toggle.mjs reset      # all breaks OFF (baseline, green)
//   node demo/demo-toggle.mjs autoheal   # Act 1 — rename CTAs
//   node demo/demo-toggle.mjs bug         # Act 2 — calculator NaN bug
//   node demo/demo-toggle.mjs visual      # Act 3 — CSS-only regression
//   node demo/demo-toggle.mjs status      # show current flags
//
// Rewrites ONLY the NEXT_PUBLIC_DEMO_* lines in .env.local; every other
// line (your Supabase keys, etc.) is preserved untouched. Next.js dev
// hot-reloads on the file change, so the app updates without a manual
// restart. Run these BETWEEN takes, off camera.
// ============================================================

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENV = join(ROOT, ".env.local");
const FLAGS = {
  autoheal: "NEXT_PUBLIC_DEMO_AUTOHEAL",
  bug: "NEXT_PUBLIC_DEMO_BUG",
  visual: "NEXT_PUBLIC_DEMO_VISUAL",
};

const mode = (process.argv[2] || "status").toLowerCase();
const valid = ["reset", "autoheal", "bug", "visual", "status"];
if (!valid.includes(mode)) {
  console.error(`Unknown mode "${mode}". Use one of: ${valid.join(", ")}`);
  process.exit(1);
}

const base = existsSync(ENV) ? readFileSync(ENV, "utf8") : "";
// Strip any existing demo lines, keep everything else.
const kept = base
  .split("\n")
  .filter((l) => !Object.values(FLAGS).some((k) => l.startsWith(k + "=")))
  .join("\n")
  .replace(/\n+$/, "");

if (mode === "status") {
  const active = base
    .split("\n")
    .filter((l) => Object.values(FLAGS).some((k) => l.startsWith(k + "=1")));
  console.log(active.length ? "Active break:\n  " + active.join("\n  ") : "Baseline — all breaks OFF");
  process.exit(0);
}

let demoLines = "# --- demo failure-mode flags (managed by demo-toggle.mjs) ---";
if (mode !== "reset") {
  demoLines += `\n${FLAGS[mode]}=1`;
}

writeFileSync(ENV, kept + "\n" + demoLines + "\n");
console.log(
  mode === "reset"
    ? "✓ Reset — all breaks OFF (baseline)."
    : `✓ Enabled "${mode}" break (${FLAGS[mode]}=1). Next.js will hot-reload.`
);
