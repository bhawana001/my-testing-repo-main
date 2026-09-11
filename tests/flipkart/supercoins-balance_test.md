---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart/supercoins-balance?reset=true
max_steps: 30
tags: [flipkart, e-commerce, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Flipmart 3.4: SuperCoins balance

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 14). -->
<!-- Catalog entity: Flipkart · Industry: E-commerce · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/flipkart/supercoins-balance?reset=true and verify the text "Use case 3.4" and "SuperCoins balance" are visible at the top of the page.

## Objective
Open rewards section and verify SuperCoins balance renders.

## Key assertion
Verify: Balance is a number, not an error state.
