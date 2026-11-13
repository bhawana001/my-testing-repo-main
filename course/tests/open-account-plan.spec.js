// @ts-check
// spec: course/specs/open-account-plan.md
const { test, expect } = require("@playwright/test");

test.describe("Savings account products", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/bank-clone-app/open-account");
  });

  // AC-A1
  test("P1. Three savings products are listed", async ({ page }) => {
    // 2. Inspect the "Choose your account" panel.
    await expect(page.getByRole("heading", { name: "Choose your account" })).toBeVisible();

    // Expected: three cards with these headings, in this order.
    const headings = page.locator('[role="button"]').getByRole("heading", { level: 4 });
    await expect(headings).toHaveText(["High-Yield Savings", "Everyday Savings", "Money Market"]);

    // Expected: stepper shows step 1 "Account type" as current.
    // The stepper exposes no ARIA for the current step, so the is-active class is the only signal.
    await expect(page.locator(".b-step.is-active")).toContainText("Account type");
  });

  // AC-A2
  test("P2. High-Yield Savings advertises 4.34% APY", async ({ page }) => {
    // 2. Read the High-Yield Savings card.
    await expect(page.getByRole("button", { name: /High-Yield Savings/ })).toContainText("4.34%");
    // Other cards, per PRD table.
    await expect(page.getByRole("button", { name: /Everyday Savings/ })).toContainText("3.10%");
    await expect(page.getByRole("button", { name: /Money Market/ })).toContainText("4.00%");
  });

  // AC-A3
  test("P3. Minimum opening deposits are displayed", async ({ page }) => {
    // 2. Read the "Min:" line on each card.
    await expect(page.getByRole("button", { name: /High-Yield Savings/ })).toContainText("Min: $0");
    await expect(page.getByRole("button", { name: /Everyday Savings/ })).toContainText("Min: $0");
    await expect(page.getByRole("button", { name: /Money Market/ })).toContainText("Min: $100.00");
  });

  // AC-A4
  test("P4. High-Yield Savings is selected on load", async ({ page }) => {
    // 2. Without interacting, check which card is selected.
    // Selection has no ARIA state (plan scenario N7), so the is-selected class is asserted instead.
    await expect(page.getByRole("button", { name: /High-Yield Savings/ })).toHaveClass(/is-selected/);
    await expect(page.getByRole("button", { name: /Everyday Savings/ })).not.toHaveClass(/is-selected/);
    await expect(page.getByRole("button", { name: /Money Market/ })).not.toHaveClass(/is-selected/);
  });

  // AC-A2, AC-A4
  test("P8. Selected product is carried to the Fund-it step", async ({ page }) => {
    // 1. Leave HYSA selected.
    // 2. Continue, fill About-you with the test data, Continue.
    await page.getByRole("button", { name: /^(Continue|Next step) →$/ }).click();

    await page.getByLabel("First name", { exact: true }).fill("Ada");
    await page.getByLabel("Last name", { exact: true }).fill("Lovelace");
    await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
    await page.getByLabel("Date of birth", { exact: true }).fill("1990-01-01");
    await page.getByLabel("Phone", { exact: true }).fill("5555555555");
    await page.getByLabel("SSN (last 4)", { exact: true }).fill("1234");
    await page.getByLabel("Street address", { exact: true }).fill("1 Main St");
    await page.getByLabel("City", { exact: true }).fill("LA");
    await page.getByLabel("State", { exact: true }).fill("CA");
    await page.getByLabel("ZIP", { exact: true }).fill("90210");
    await page.getByRole("button", { name: /^(Continue|Next step) →$/ }).click();

    // Expected: Fund-it subtext names the product and APY.
    await expect(
      page.getByText("Make your opening deposit for the High-Yield Savings account (4.34% APY).")
    ).toBeVisible();
  });
});
