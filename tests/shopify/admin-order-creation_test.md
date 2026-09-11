---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify/admin-order-creation?reset=true
max_steps: 30
tags: [shopify, e-commerce, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Shopifly 2.4: Admin order creation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 14). -->
<!-- Catalog entity: Shopify · Industry: E-commerce · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/shopify/admin-order-creation?reset=true and verify the text "Use case 2.4" and "Admin order creation" are visible at the top of the page.

## Objective
In admin, create a draft order for a customer and mark it paid.

## Key assertion
Verify: Order appears in orders list as paid.
