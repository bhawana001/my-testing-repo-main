---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/options-chain?reset=true
max_steps: 30
tags: [robinhood, consumer-fintech, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Robinhoot 16.5: Options chain display

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Robinhood · Industry: Consumer fintech · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/robinhood/options-chain?reset=true and verify the text "Use case 16.5" and "Options chain display" are visible at the top of the page.

## Objective
Open an options chain and select an expiry and strike.

## Key assertion
Verify: Greeks and premium render for selection.
