---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/instant-deposit?reset=true
max_steps: 30
tags: [robinhood, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Robinhoot 16.4: Instant deposit flow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Robinhood · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/robinhood/instant-deposit?reset=true and verify the text "Use case 16.4" and "Instant deposit flow" are visible at the top of the page.

## Objective
Initiate a deposit and verify instant buying power credit.

## Key assertion
Verify: Buying power increases by deposit amount.
