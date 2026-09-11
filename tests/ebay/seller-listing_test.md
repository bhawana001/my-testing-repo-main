---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay/seller-listing?reset=true
max_steps: 30
tags: [ebay, e-commerce, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# eBidz 6.4: Seller listing creation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: eBay · Industry: E-commerce · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/ebay/seller-listing?reset=true and verify the text "Use case 6.4" and "Seller listing creation" are visible at the top of the page.

## Objective
Create a listing with photos, condition, and price, publish it.

## Key assertion
Verify: Listing live and searchable by title.
