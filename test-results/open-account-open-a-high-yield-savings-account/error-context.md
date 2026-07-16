# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: open-account.spec.js >> open a high-yield savings account
- Location: demo/playwright/open-account.spec.js:15:5

# Error details

```
TimeoutError: locator.click: Timeout 8000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Continue →' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]: Open Bank Account
        - generic [ref=e6]: Start Saving Today
      - generic [ref=e7]:
        - link "GO MoneyRates" [ref=e8] [cursor=pointer]:
          - /url: /bank-clone-app
          - generic [ref=e9]: GO
          - generic [ref=e10]: MoneyRates
        - navigation [ref=e11]:
          - link "Banking" [ref=e12] [cursor=pointer]:
            - /url: /bank-clone-app/banking
          - link "Calculators" [ref=e13] [cursor=pointer]:
            - /url: /bank-clone-app/calculators
          - link "Financial Planning" [ref=e14] [cursor=pointer]:
            - /url: /bank-clone-app/article/financial-planning
          - link "Investing" [ref=e15] [cursor=pointer]:
            - /url: /bank-clone-app/article/investing
          - link "Saving & Spending" [ref=e16] [cursor=pointer]:
            - /url: /bank-clone-app/article/saving-and-spending
        - generic [ref=e17]:
          - generic [ref=e18]: Search
          - link "Get Started" [ref=e19] [cursor=pointer]:
            - /url: /bank-clone-app/open-account
    - main [ref=e20]:
      - generic [ref=e22]:
        - text: Open an account
        - heading "Open your savings account" [level=1] [ref=e23]
        - paragraph [ref=e24]: It takes about 5 minutes. Your money is FDIC-insured up to $250,000 (demo).
      - generic [ref=e27]:
        - complementary [ref=e28]:
          - generic [ref=e29]:
            - generic [ref=e30]: "1"
            - generic [ref=e31]:
              - strong [ref=e32]: Account type
              - text: Pick your savings account
          - generic [ref=e33]:
            - generic [ref=e34]: "2"
            - generic [ref=e35]:
              - strong [ref=e36]: About you
              - text: Identity & contact
          - generic [ref=e37]:
            - generic [ref=e38]: "3"
            - generic [ref=e39]:
              - strong [ref=e40]: Fund it
              - text: Initial deposit
          - generic [ref=e41]:
            - generic [ref=e42]: "4"
            - generic [ref=e43]:
              - strong [ref=e44]: Review
              - text: Confirm & open
        - generic [ref=e45]:
          - heading "Choose your account" [level=2] [ref=e46]
          - paragraph [ref=e47]: All accounts are fee-free. Rates shown are annual percentage yields (demo).
          - generic [ref=e48]:
            - 'button "4.34% High-Yield Savings No monthly fees, no minimums. Our most popular account. Min: $0" [active] [ref=e49] [cursor=pointer]':
              - generic [ref=e50]: 4.34%
              - heading "High-Yield Savings" [level=4] [ref=e51]
              - paragraph [ref=e52]: No monthly fees, no minimums. Our most popular account.
              - paragraph [ref=e53]: "Min: $0"
            - 'button "3.10% Everyday Savings Simple savings with easy transfers and automatic goals. Min: $0" [ref=e54] [cursor=pointer]':
              - generic [ref=e55]: 3.10%
              - heading "Everyday Savings" [level=4] [ref=e56]
              - paragraph [ref=e57]: Simple savings with easy transfers and automatic goals.
              - paragraph [ref=e58]: "Min: $0"
            - 'button "4.00% Money Market Higher tiers for larger balances, with check-writing access. Min: $100.00" [ref=e59] [cursor=pointer]':
              - generic [ref=e60]: 4.00%
              - heading "Money Market" [level=4] [ref=e61]
              - paragraph [ref=e62]: Higher tiers for larger balances, with check-writing access.
              - paragraph [ref=e63]: "Min: $100.00"
          - generic [ref=e64]:
            - link "Cancel" [ref=e65] [cursor=pointer]:
              - /url: /bank-clone-app
            - button "Next step →" [ref=e66] [cursor=pointer]
    - contentinfo [ref=e67]:
      - generic [ref=e68]:
        - generic [ref=e69]:
          - generic [ref=e70]:
            - link "GO MoneyRates" [ref=e71] [cursor=pointer]:
              - /url: /bank-clone-app
              - generic [ref=e72]: GO
              - generic [ref=e73]: MoneyRates
            - paragraph [ref=e74]: A demo banking experience. Not a real financial institution — for testing and prototyping only.
            - generic [ref=e75]:
              - textbox "Email address" [ref=e76]
              - button "Submit" [ref=e77] [cursor=pointer]
          - generic [ref=e78]:
            - heading "Company" [level=5] [ref=e79]
            - list [ref=e80]:
              - listitem [ref=e81]:
                - link "Who We Are" [ref=e82] [cursor=pointer]:
                  - /url: /bank-clone-app/article/who-we-are
              - listitem [ref=e83]:
                - link "Careers" [ref=e84] [cursor=pointer]:
                  - /url: /bank-clone-app/article/careers
              - listitem [ref=e85]:
                - link "Editorial Team" [ref=e86] [cursor=pointer]:
                  - /url: /bank-clone-app/article/editorial-team
              - listitem [ref=e87]:
                - link "Press Releases" [ref=e88] [cursor=pointer]:
                  - /url: /bank-clone-app/article/press-releases
          - generic [ref=e89]:
            - heading "Products" [level=5] [ref=e90]
            - list [ref=e91]:
              - listitem [ref=e92]:
                - link "Banking" [ref=e93] [cursor=pointer]:
                  - /url: /bank-clone-app/banking
              - listitem [ref=e94]:
                - link "Calculators" [ref=e95] [cursor=pointer]:
                  - /url: /bank-clone-app/calculators
              - listitem [ref=e96]:
                - link "Open Account" [ref=e97] [cursor=pointer]:
                  - /url: /bank-clone-app/open-account
              - listitem [ref=e98]:
                - link "Savings" [ref=e99] [cursor=pointer]:
                  - /url: /bank-clone-app/open-account
          - generic [ref=e100]:
            - heading "Legal" [level=5] [ref=e101]
            - list [ref=e102]:
              - listitem [ref=e103]:
                - link "Terms of Use" [ref=e104] [cursor=pointer]:
                  - /url: /bank-clone-app/article/terms-of-use
              - listitem [ref=e105]:
                - link "Privacy Policy" [ref=e106] [cursor=pointer]:
                  - /url: /bank-clone-app/article/privacy-policy
              - listitem [ref=e107]:
                - link "Advertiser Disclosure" [ref=e108] [cursor=pointer]:
                  - /url: /bank-clone-app/article/advertiser-disclosure
              - listitem [ref=e109]:
                - link "Sitemap" [ref=e110] [cursor=pointer]:
                  - /url: /bank-clone-app/article/sitemap
        - paragraph [ref=e111]: © 2026 GO MoneyRates (demo clone). Built with Next.js for testing purposes.
  - button "Open Next.js Dev Tools" [ref=e117] [cursor=pointer]:
    - img [ref=e118]
  - alert [ref=e121]
```

# Test source

```ts
  1  | // Playwright MCP side — a recorded-style script for the "open a savings
  2  | // account" flow. Selectors are hard-coded to exact button text, exactly as
  3  | // a generated Playwright script would capture them. There is NO visual
  4  | // validation and NO auto-heal: when a label changes, this dies on a stale
  5  | // selector; when the page is visually broken but the DOM is intact, this
  6  | // still passes green.
  7  | //
  8  | // Off-screen prereq (NOT filmed):
  9  | //   npm i -D @playwright/test && npx playwright install chromium
  10 | //   npx playwright test demo/playwright/open-account.spec.js --headed
  11 | import { test, expect } from "@playwright/test";
  12 | 
  13 | const BASE = "http://localhost:3000/bank-clone-app";
  14 | 
  15 | test("open a high-yield savings account", async ({ page }) => {
  16 |   await page.goto(`${BASE}/open-account`);
  17 | 
  18 |   // Step 1 — account type
  19 |   await page.getByText("High-Yield Savings").click();
> 20 |   await page.getByRole("button", { name: "Continue →" }).click(); // ⚠ breaks under Auto-Heal
     |                                                          ^ TimeoutError: locator.click: Timeout 8000ms exceeded.
  21 | 
  22 |   // Step 2 — about you
  23 |   await page.locator("#firstName").fill("Alex");
  24 |   await page.locator("#lastName").fill("Rivera");
  25 |   await page.locator("#email").fill("alex@example.com");
  26 |   await page.locator("#dob").fill("1990-05-14");
  27 |   await page.locator("#phone").fill("5551234567");
  28 |   await page.locator("#ssn").fill("1234");
  29 |   await page.locator("#address").fill("123 Market St");
  30 |   await page.locator("#city").fill("San Francisco");
  31 |   await page.locator("#state").fill("CA");
  32 |   await page.locator("#zip").fill("94103");
  33 |   await page.getByRole("button", { name: "Continue →" }).click(); // ⚠ breaks under Auto-Heal
  34 | 
  35 |   // Step 3 — fund it
  36 |   await page.locator("#deposit").fill("500");
  37 |   await page.getByRole("button", { name: "Continue →" }).click(); // ⚠ breaks under Auto-Heal
  38 | 
  39 |   // Step 4 — review & submit
  40 |   await page.getByRole("checkbox").check();
  41 |   await page.getByRole("button", { name: "Open account" }).click(); // ⚠ breaks under Auto-Heal
  42 | 
  43 |   // Only a DOM/text assertion — no eyes on the actual rendering.
  44 |   await expect(page.getByText("You're all set")).toBeVisible();
  45 | });
  46 | 
```