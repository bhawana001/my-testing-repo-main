// Demo flag system (mirrors bank-clone-app/demo.js). All default OFF.
export const demo = {
  autoheal: process.env.NEXT_PUBLIC_DEMO_AUTOHEAL === "1",
  bug: process.env.NEXT_PUBLIC_DEMO_BUG === "1",
  visual: process.env.NEXT_PUBLIC_DEMO_VISUAL === "1",
};
