---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha/gtt-trigger?reset=true
max_steps: 30
tags: [zerodha, consumer-fintech, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zerodhi 17.2: GTT trigger creation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Zerodha · Industry: Consumer fintech · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zerodha/gtt-trigger?reset=true and verify the text "Use case 17.2" and "GTT trigger creation" are visible at the top of the page.

## Objective
Create a GTT with trigger and limit price.

## Key assertion
Verify: GTT listed active with correct values.
