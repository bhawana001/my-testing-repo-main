---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike/size-guide?reset=true
max_steps: 30
tags: [nike, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Nyke 8.1: Size guide and selection

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Nike · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/nike/size-guide?reset=true and verify the text "Use case 8.1" and "Size guide and selection" are visible at the top of the page.

## Objective
Open size guide on a shoe, select a size, add to cart.

## Key assertion
Verify: Selected size carried into cart.
