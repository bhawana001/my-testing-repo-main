---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart/search-with-filters?reset=true
max_steps: 30
tags: [flipkart, e-commerce, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Flipmart 3.1: Search with filters

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 14). -->
<!-- Catalog entity: Flipkart · Industry: E-commerce · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/flipkart/search-with-filters?reset=true and verify the text "Use case 3.1" and "Search with filters" are visible at the top of the page.

## Objective
Search for running shoes, filter by size and price band, open a result.

## Key assertion
Verify: Result respects size and price filters.
