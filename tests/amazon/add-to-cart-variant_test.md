---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/add-to-cart-variant?reset=true
max_steps: 30
tags: [amazon, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Amazonia 1.2: Add to cart with variant

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 2). -->
<!-- Catalog entity: Amazon · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/amazon/add-to-cart-variant?reset=true and verify the text "Use case 1.2" and "Add to cart with variant" are visible at the top of the page.

## Objective
Pick a size and color variant, add to cart, open the cart.

## Key assertion
Verify: Cart shows exact variant and correct price.
