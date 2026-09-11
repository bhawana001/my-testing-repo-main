#!/usr/bin/env node
// ============================================================
// Off-screen failure-mode toggle for the Kane CLI vs Playwright MCP demo.
//
//   node demo/demo-toggle.mjs reset      # all breaks OFF (baseline, green)
//   node demo/demo-toggle.mjs autoheal   # Act 1 — rename CTAs
//   node demo/demo-toggle.mjs bug         # Act 2 — calculator NaN bug
//   node demo/demo-toggle.mjs visual      # Act 3 — CSS-only regression
//   node demo/demo-toggle.mjs paybug      # Loop demo — checkout hangs on "Processing…"
//   node demo/demo-toggle.mjs payfix      # Loop demo — the fixed checkout
//   node demo/demo-toggle.mjs status      # show current flags
//
// paybug/payfix are file swaps, not env flags: they copy
// demo/checkout-variants/checkout.{broken,fixed}.js over
// app/shop-clone-app/checkout/page.js. Use paybug to reset the loop demo to its
// failing state between takes; payfix restores green without waiting on the agent.
//
// Rewrites ONLY the NEXT_PUBLIC_DEMO_* lines in .env.local; every other
// line (your Supabase keys, etc.) is preserved untouched. Next.js dev
// hot-reloads on the file change, so the app updates without a manual
// restart. Run these BETWEEN takes, off camera.
// ============================================================

import { readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENV = join(ROOT, ".env.local");
const FLAGS = {
  autoheal: "NEXT_PUBLIC_DEMO_AUTOHEAL",
  bug: "NEXT_PUBLIC_DEMO_BUG",
  visual: "NEXT_PUBLIC_DEMO_VISUAL",
};

const CHECKOUT_PAGE = join(ROOT, "app/shop-clone-app/checkout/page.js");
const VARIANTS = {
  paybug: join(ROOT, "demo/checkout-variants/checkout.broken.js"),
  payfix: join(ROOT, "demo/checkout-variants/checkout.fixed.js"),
};

const mode = (process.argv[2] || "status").toLowerCase();
const valid = ["reset", "autoheal", "bug", "visual", "paybug", "payfix", "status"];
if (!valid.includes(mode)) {
  console.error(`Unknown mode "${mode}". Use one of: ${valid.join(", ")}`);
  process.exit(1);
}

if (mode === "paybug" || mode === "payfix") {
  copyFileSync(VARIANTS[mode], CHECKOUT_PAGE);
  console.log(
    mode === "paybug"
      ? '✓ Checkout is BROKEN — it will hang on "Processing…" after a successful charge.'
      : "✓ Checkout is FIXED — payment shows the confirmation screen."
  );
  process.exit(0);
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
  const checkout = existsSync(CHECKOUT_PAGE) ? readFileSync(CHECKOUT_PAGE, "utf8") : "";
  console.log(
    checkout.includes("receiptRef")
      ? 'Checkout: BROKEN (hangs on "Processing…")'
      : "Checkout: FIXED (shows the confirmation)"
  );
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
