---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut/currency-exchange?reset=true
max_steps: 30
tags: [revolut, consumer-fintech, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Revolute 19.2: Currency exchange

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Revolut · Industry: Consumer fintech · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/revolut/currency-exchange?reset=true and verify the text "Use case 19.2" and "Currency exchange" are visible at the top of the page.

## Objective
Exchange between two currency pockets.

## Key assertion
Verify: Both balances update at quoted rate.
