---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut/card-freeze?reset=true
max_steps: 30
tags: [revolut, consumer-fintech, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Revolute 19.1: Card freeze unfreeze

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: Revolut · Industry: Consumer fintech · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/revolut/card-freeze?reset=true and verify the text "Use case 19.1" and "Card freeze unfreeze" are visible at the top of the page.

## Objective
Freeze the virtual card and confirm declines, then unfreeze.

## Key assertion
Verify: State toggles and card usable again.
