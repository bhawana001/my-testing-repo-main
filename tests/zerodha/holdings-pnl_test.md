---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha/holdings-pnl?reset=true
max_steps: 30
tags: [zerodha, consumer-fintech, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zerodhi 17.3: Holdings P and L

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Zerodha · Industry: Consumer fintech · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zerodha/holdings-pnl?reset=true and verify the text "Use case 17.3" and "Holdings P and L" are visible at the top of the page.

## Objective
Open holdings and verify P and L math on one position.

## Key assertion
Verify: P and L equals quantity times price delta.
