---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay/best-offer?reset=true
max_steps: 30
tags: [ebay, e-commerce, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# eBidz 6.3: Best Offer flow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: eBay · Industry: E-commerce · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/ebay/best-offer?reset=true and verify the text "Use case 6.3" and "Best Offer flow" are visible at the top of the page.

## Objective
Submit a best offer below asking and verify pending state.

## Key assertion
Verify: Offer shows as sent with correct amount.
