// @ts-check
const { test, expect } = require("@playwright/test");

test("opens a High-Yield Savings account with a $500 deposit", async ({ page }) => {
  await page.goto("/bank-clone-app/open-account");

  // Step 1: account type
  await page.getByRole("button", { name: /High-Yield Savings/ }).click();
  await page.getByRole("button", { name: /^(Continue|Next step) →$/ }).click();

  // Step 2: about you
  await page.getByLabel("First name", { exact: true }).fill("Alex");
  await page.getByLabel("Last name", { exact: true }).fill("Rivera");
  await page.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await page.getByLabel("Date of birth", { exact: true }).fill("1990-05-14");
  await page.getByLabel("Phone", { exact: true }).fill("(555) 123-4567");
  await page.getByLabel("SSN (last 4)", { exact: true }).fill("1234");
  await page.getByLabel("Street address", { exact: true }).fill("123 Market St");
  await page.getByLabel("City", { exact: true }).fill("San Francisco");
  await page.getByLabel("State", { exact: true }).fill("CA");
  await page.getByLabel("ZIP", { exact: true }).fill("94103");
  await page.getByRole("button", { name: /^(Continue|Next step) →$/ }).click();

  // Step 3: fund it
  await page.getByLabel("Opening deposit (USD)", { exact: true }).fill("500");
  await page.getByRole("button", { name: /^(Continue|Next step) →$/ }).click();

  // Step 4: review & open
  await page.getByRole("checkbox", { name: /I agree to the Account Terms/ }).check();
  await page.getByRole("button", { name: /^(Open account|Submit application)$/ }).click();

  // Confirmation
  const heading = page.getByRole("heading", { name: "You're all set, Alex!" });
  await expect(heading).toBeVisible();
  const confirmation = page.locator(".b-success");
  await expect(confirmation).toContainText("High-Yield Savings");
  await expect(confirmation).toContainText("$500.00");
});
