---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna/payment-schedule?reset=true
max_steps: 30
tags: [klarna, payments-infra, tracker]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Klarnah 14.3: Order in Klarna app

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Klarna · Industry: Payments infra · Pattern: Tracker timeline -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/klarna/payment-schedule?reset=true and verify the text "Use case 14.3" and "Order in Klarna app" are visible at the top of the page.

## Objective
Verify placed order appears with payment schedule.

## Key assertion
Verify: First installment date and amount correct.
