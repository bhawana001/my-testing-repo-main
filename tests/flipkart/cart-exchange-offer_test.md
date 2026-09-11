---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart/cart-exchange-offer?reset=true
max_steps: 30
tags: [flipkart, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Flipmart 3.2: Cart with exchange offer

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Flipkart · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/flipkart/cart-exchange-offer?reset=true and verify the text "Use case 3.2" and "Cart with exchange offer" are visible at the top of the page.

## Objective
Add a phone with exchange offer, verify exchange discount in cart.

## Key assertion
Verify: Cart math includes exchange deduction correctly.
