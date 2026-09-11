---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal/guest-card-payment?reset=true
max_steps: 30
tags: [paypal, payments-infra, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PayPally 10.2: Guest card payment

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 4). -->
<!-- Catalog entity: PayPal · Industry: Payments infra · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/paypal/guest-card-payment?reset=true and verify the text "Use case 10.2" and "Guest card payment" are visible at the top of the page.

## Objective
Choose pay by card without account in PayPally window.

## Key assertion
Verify: Card form completes and payment succeeds.
