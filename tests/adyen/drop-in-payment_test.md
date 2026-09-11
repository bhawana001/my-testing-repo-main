---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen/drop-in-payment?reset=true
max_steps: 30
tags: [adyen, payments-infra, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Adyenly 13.1: Drop-in payment

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 4). -->
<!-- Catalog entity: Adyen · Industry: Payments infra · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/adyen/drop-in-payment?reset=true and verify the text "Use case 13.1" and "Drop-in payment" are visible at the top of the page.

## Objective
Pay via Adyenly drop-in with test card and 3DS2.

## Key assertion
Verify: Authorised result surfaced to shopper.
