---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay/bid-placement?reset=true
max_steps: 30
tags: [ebay, e-commerce, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# eBidz 6.1: Bid placement

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: eBay · Industry: E-commerce · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/ebay/bid-placement?reset=true and verify the text "Use case 6.1" and "Bid placement" are visible at the top of the page.

## Objective
Place a bid above current price on an auction listing.

## Key assertion
Verify: Bid registered and user shown as high bidder.
