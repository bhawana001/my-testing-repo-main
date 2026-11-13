// Playwright config for the Playwright course workspace.
// Run with `npm run course:test`; open the last HTML report with `npm run course:report`.
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests", // resolved relative to this file → course/tests
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000", // CI sets BASE_URL
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
