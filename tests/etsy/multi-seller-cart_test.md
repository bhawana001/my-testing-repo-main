---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy/multi-seller-cart?reset=true
max_steps: 30
tags: [etsy, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Etsily 5.3: Cart with multiple sellers

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Etsy · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/etsy/multi-seller-cart?reset=true and verify the text "Use case 5.3" and "Cart with multiple sellers" are visible at the top of the page.

## Objective
Add items from two shops and verify shipping calculated per shop.

## Key assertion
Verify: Two shipping lines with separate totals.
