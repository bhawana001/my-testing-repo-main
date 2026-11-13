// @ts-check
const { test, expect } = require("@playwright/test");

test("shows gross income for an annual income of 85000", async ({ page }) => {
  await page.goto("/bank-clone-app/calculators");

  await page.getByLabel("Annual income", { exact: true }).fill("85000");

  // The estimate rows are plain <span>/<b> pairs with no role, so scope by the row's text.
  const grossRow = page.locator(".b-result__row").filter({ hasText: "Gross income" });
  // PRD AC-D1: Gross income of $85,000 (the page formats whole dollars, no cents).
  await expect(grossRow).toContainText("$85,000");
});
