---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/order-tracking?reset=true
max_steps: 30
tags: [amazon, e-commerce, tracker]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Amazonia 1.4: Order tracking

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 2). -->
<!-- Catalog entity: Amazon · Industry: E-commerce · Pattern: Tracker timeline -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/amazon/order-tracking?reset=true and verify the text "Use case 1.4" and "Order tracking" are visible at the top of the page.

## Objective
Open recent orders and check delivery status of the latest order.

## Key assertion
Verify: Status timeline renders with a valid date.
