---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy/review-submission?reset=true
max_steps: 30
tags: [etsy, e-commerce, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Etsily 5.4: Review submission

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 14). -->
<!-- Catalog entity: Etsy · Industry: E-commerce · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/etsy/review-submission?reset=true and verify the text "Use case 5.4" and "Review submission" are visible at the top of the page.

## Objective
Leave a review with photo on a delivered order.

## Key assertion
Verify: Review appears under the listing.
