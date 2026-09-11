---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay/checkout-modal?reset=true
max_steps: 30
tags: [razorpay, payments-infra, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Razorpaid 11.1: Standard checkout modal

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 4). -->
<!-- Catalog entity: Razorpay · Industry: Payments infra · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/razorpay/checkout-modal?reset=true and verify the text "Use case 11.1" and "Standard checkout modal" are visible at the top of the page.

## Objective
Trigger Razorpaid checkout, pay with test UPI success flow.

## Key assertion
Verify: Payment success callback and receipt shown.
