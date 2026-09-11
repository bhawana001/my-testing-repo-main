---
mode: testing
url: https://my-testing-repo-main.vercel.app/american-express/payment-scheduling?reset=true
max_steps: 30
tags: [american-express, banking, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Amerix 25.2: Card payment scheduling

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: American Express · Industry: Banking · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/american-express/payment-scheduling?reset=true and verify the text "Use case 25.2" and "Card payment scheduling" are visible at the top of the page.

## Objective
Schedule a payment for statement balance.

## Key assertion
Verify: Scheduled payment with correct amount.
