---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-bank/card-statement?reset=true
max_steps: 30
tags: [hdfc-bank, banking, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# HDFB Bank 24.4: Credit card statement view

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: HDFC Bank · Industry: Banking · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/card-statement?reset=true and verify the text "Use case 24.4" and "Credit card statement view" are visible at the top of the page.

## Objective
Open card statement and verify due date and minimum due.

## Key assertion
Verify: Figures render and match summary.
