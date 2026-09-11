---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify/checkout-extension?reset=true
max_steps: 30
tags: [shopify, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Shopifly 2.3: Checkout extension render

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Shopify · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/shopify/checkout-extension?reset=true and verify the text "Use case 2.3" and "Checkout extension render" are visible at the top of the page.

## Objective
Proceed through checkout and confirm custom fields and upsell block appear.

## Key assertion
Verify: Extension renders without breaking payment step.
