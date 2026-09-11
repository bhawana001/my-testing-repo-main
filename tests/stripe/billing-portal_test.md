---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe/billing-portal?reset=true
max_steps: 30
tags: [stripe, payments-infra, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Stripely 9.4: Billing portal update

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 14). -->
<!-- Catalog entity: Stripe · Industry: Payments infra · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/stripe/billing-portal?reset=true and verify the text "Use case 9.4" and "Billing portal update" are visible at the top of the page.

## Objective
Open customer portal, update card, verify new default.

## Key assertion
Verify: New payment method shown as default.
