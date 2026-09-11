---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart/replacement-preferences?reset=true
max_steps: 30
tags: [instacart, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Instakart 7.2: Replacement preferences

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Instacart · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/instacart/replacement-preferences?reset=true and verify the text "Use case 7.2" and "Replacement preferences" are visible at the top of the page.

## Objective
Set replacement choice on an out-of-stock-prone item.

## Key assertion
Verify: Preference persists in cart item detail.
