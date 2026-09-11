---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/search-to-product?reset=true
max_steps: 30
tags: [amazon, e-commerce, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Amazonia 1.1: Search to product page

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Amazon · Industry: E-commerce · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/amazon/search-to-product?reset=true and verify the text "Use case 1.1" and "Search to product page" are visible at the top of the page.

## Objective
Search for wireless earbuds, apply brand and price filters, open the top result.

## Key assertion
Verify: Product page matches the filtered criteria.
