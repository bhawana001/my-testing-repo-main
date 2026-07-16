// Playwright MCP side — a recorded-style script for the "open a savings
// account" flow. Selectors are hard-coded to exact button text, exactly as
// a generated Playwright script would capture them. There is NO visual
// validation and NO auto-heal: when a label changes, this dies on a stale
// selector; when the page is visually broken but the DOM is intact, this
// still passes green.
//
// Off-screen prereq (NOT filmed):
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test demo/playwright/open-account.spec.js --headed
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000/bank-clone-app";

test("open a high-yield savings account", async ({ page }) => {
  await page.goto(`${BASE}/open-account`);

  // Step 1 — account type
  await page.getByText("High-Yield Savings").click();
  await page.getByRole("button", { name: "Continue →" }).click(); // ⚠ breaks under Auto-Heal

  // Step 2 — about you
  await page.locator("#firstName").fill("Alex");
  await page.locator("#lastName").fill("Rivera");
  await page.locator("#email").fill("alex@example.com");
  await page.locator("#dob").fill("1990-05-14");
  await page.locator("#phone").fill("5551234567");
  await page.locator("#ssn").fill("1234");
  await page.locator("#address").fill("123 Market St");
  await page.locator("#city").fill("San Francisco");
  await page.locator("#state").fill("CA");
  await page.locator("#zip").fill("94103");
  await page.getByRole("button", { name: "Continue →" }).click(); // ⚠ breaks under Auto-Heal

  // Step 3 — fund it
  await page.locator("#deposit").fill("500");
  await page.getByRole("button", { name: "Continue →" }).click(); // ⚠ breaks under Auto-Heal

  // Step 4 — review & submit
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Open account" }).click(); // ⚠ breaks under Auto-Heal

  // Only a DOM/text assertion — no eyes on the actual rendering.
  await expect(page.getByText("You're all set")).toBeVisible();
});
