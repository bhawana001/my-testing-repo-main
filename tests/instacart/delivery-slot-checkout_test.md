---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart/delivery-slot-checkout?reset=true
max_steps: 30
tags: [instacart, e-commerce, booking]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Instakart 7.3: Delivery slot checkout

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 3). -->
<!-- Catalog entity: Instacart · Industry: E-commerce · Pattern: Booking calendar -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/instacart/delivery-slot-checkout?reset=true and verify the text "Use case 7.3" and "Delivery slot checkout" are visible at the top of the page.

## Objective
Choose a priority slot and complete checkout with test card.

## Key assertion
Verify: Confirmation shows chosen window and fees.
