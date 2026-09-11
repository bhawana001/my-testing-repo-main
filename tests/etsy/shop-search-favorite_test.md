---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy/shop-search-favorite?reset=true
max_steps: 30
tags: [etsy, e-commerce, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Etsily 5.2: Shop search and favorite

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 14). -->
<!-- Catalog entity: Etsy · Industry: E-commerce · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/etsy/shop-search-favorite?reset=true and verify the text "Use case 5.2" and "Shop search and favorite" are visible at the top of the page.

## Objective
Search a shop, favorite an item, verify it in favorites list.

## Key assertion
Verify: Favorited item persists after reload.
