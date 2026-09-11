---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/one-click-checkout?reset=true
max_steps: 30
tags: [amazon, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Amazonia 1.3: One-click checkout

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Amazon · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/amazon/one-click-checkout?reset=true and verify the text "Use case 1.3" and "One-click checkout" are visible at the top of the page.

## Objective
Buy an item with saved address and payment, reach order confirmation.

## Key assertion
Verify: Order number shown and total matches PDP price.
