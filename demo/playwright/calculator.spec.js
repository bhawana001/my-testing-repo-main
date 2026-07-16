// Playwright MCP side — tax calculator check. When the NaN bug is enabled,
// this fails with a bare "expected $60,000, received $NaN" — a symptom, not
// a cause. It cannot tell you WHY (the "$" prepended before Number()); a
// developer has to go spelunking. Contrast with Kane CLI's diagnosis.
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000/bank-clone-app";

test("tax calculator computes gross income", async ({ page }) => {
  await page.goto(`${BASE}/calculators`);

  await page.locator("#income").fill("60000");

  // Reads the "Gross income" row value.
  const gross = page.locator(".b-result__row", { hasText: "Gross income" }).locator("b");
  await expect(gross).toHaveText("$60,000"); // ⚠ under Bug break this is "$NaN"
});
