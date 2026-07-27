// Demo flag system (mirrors bank-clone-app/demo.js). All default OFF so the
// normal app is unaffected; toggled off-screen via NEXT_PUBLIC_* env vars.
export const demo = {
  autoheal: process.env.NEXT_PUBLIC_DEMO_AUTOHEAL === "1",
  bug: process.env.NEXT_PUBLIC_DEMO_BUG === "1",
  visual: process.env.NEXT_PUBLIC_DEMO_VISUAL === "1",
};
