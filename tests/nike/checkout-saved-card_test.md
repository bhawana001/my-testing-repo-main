---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike/checkout-saved-card?reset=true
max_steps: 30
tags: [nike, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Nyke 8.4: Checkout with saved card

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Nike · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/nike/checkout-saved-card?reset=true and verify the text "Use case 8.4" and "Checkout with saved card" are visible at the top of the page.

## Objective
Checkout a cart item with saved payment in under the flow.

## Key assertion
Verify: Order confirmation with correct size and price.
