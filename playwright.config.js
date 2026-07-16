// Playwright config for the Kane CLI vs Playwright MCP demo.
// Default = HEADED + slow motion so the browser is visible and filmable.
// (Rehearsal runs can set PW_HEADLESS=1 to run without a window.)
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./demo/playwright",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  timeout: 20000, // whole test cap
  use: {
    baseURL: "http://localhost:3000",
    headless: process.env.PW_HEADLESS === "1",
    viewport: { width: 1280, height: 800 },
    actionTimeout: 8000, // a missing selector fails in ~8s, not 30s — filmable
    launchOptions: { slowMo: 600 },
  },
});
