---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase/recurring-buy?reset=true
max_steps: 30
tags: [coinbase, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Coinbayse 18.2: Recurring buy setup

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Coinbase · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/coinbase/recurring-buy?reset=true and verify the text "Use case 18.2" and "Recurring buy setup" are visible at the top of the page.

## Objective
Schedule a weekly buy and verify next run date.

## Key assertion
Verify: Recurring rule active with correct cadence.
