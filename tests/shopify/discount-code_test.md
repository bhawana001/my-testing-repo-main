---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify/discount-code?reset=true
max_steps: 30
tags: [shopify, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Shopifly 2.2: Discount code application

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Shopify · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/shopify/discount-code?reset=true and verify the text "Use case 2.2" and "Discount code application" are visible at the top of the page.

## Objective
Apply a discount code at checkout and verify the reduced total.

## Key assertion
Verify: Discount line item matches expected percent.
