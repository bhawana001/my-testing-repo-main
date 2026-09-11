---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart/grocery-substitution?reset=true
max_steps: 30
tags: [walmart, e-commerce, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Walmartly 4.2: Grocery substitution

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Walmart · Industry: E-commerce · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/walmart/grocery-substitution?reset=true and verify the text "Use case 4.2" and "Grocery substitution" are visible at the top of the page.

## Objective
Add groceries, enable substitutions on one item, place test order.

## Key assertion
Verify: Substitution preference saved on the item.
