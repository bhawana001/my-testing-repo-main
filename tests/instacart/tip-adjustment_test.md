---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart/tip-adjustment?reset=true
max_steps: 30
tags: [instacart, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Instakart 7.4: Tip adjustment

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Instacart · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/instacart/tip-adjustment?reset=true and verify the text "Use case 7.4" and "Tip adjustment" are visible at the top of the page.

## Objective
Adjust tip after checkout from order page.

## Key assertion
Verify: Updated tip reflected in order total.
