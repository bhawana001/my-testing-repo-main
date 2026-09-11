---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase/price-alert?reset=true
max_steps: 30
tags: [coinbase, consumer-fintech, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Coinbayse 18.4: Price alert creation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Coinbase · Industry: Consumer fintech · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/coinbase/price-alert?reset=true and verify the text "Use case 18.4" and "Price alert creation" are visible at the top of the page.

## Objective
Set a price alert on ETH.

## Key assertion
Verify: Alert saved with target price.
