---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart/reorder-from-history?reset=true
max_steps: 30
tags: [walmart, e-commerce, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Walmartly 4.4: Reorder from history

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Walmart · Industry: E-commerce · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/walmart/reorder-from-history?reset=true and verify the text "Use case 4.4" and "Reorder from history" are visible at the top of the page.

## Objective
Reorder a past purchase in two clicks from order history.

## Key assertion
Verify: Cart prefilled with previous items.
