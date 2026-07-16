// ============================================================
// Demo failure-mode flags for the Kane CLI vs Playwright MCP video.
//
// Flip these OFF-SCREEN between takes via `.env.local` (the
// demo/demo-toggle.mjs helper does it safely), then let Next.js
// hot-reload. All flags default OFF, so the normal app is unaffected.
//
//   NEXT_PUBLIC_DEMO_AUTOHEAL=1  -> renames CTAs so hard-coded
//                                   selectors break (Auto-Heal act)
//   NEXT_PUBLIC_DEMO_BUG=1       -> injects a logic bug in the tax
//                                   calculator (Bug Diagnosis act)
//   NEXT_PUBLIC_DEMO_VISUAL=1    -> CSS-only regression, DOM intact
//                                   (Visual Validation act)
// ============================================================

export const demo = {
  autoheal: process.env.NEXT_PUBLIC_DEMO_AUTOHEAL === "1",
  bug: process.env.NEXT_PUBLIC_DEMO_BUG === "1",
  visual: process.env.NEXT_PUBLIC_DEMO_VISUAL === "1",
};
