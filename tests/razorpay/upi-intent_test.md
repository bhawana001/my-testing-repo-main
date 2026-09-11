---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay/upi-intent?reset=true
max_steps: 30
tags: [razorpay, payments-infra, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Razorpaid 11.2: UPI intent flow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 4). -->
<!-- Catalog entity: Razorpay · Industry: Payments infra · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/razorpay/upi-intent?reset=true and verify the text "Use case 11.2" and "UPI intent flow" are visible at the top of the page.

## Objective
Choose UPI, verify intent screen with VPA entry works.

## Key assertion
Verify: VPA validation and success state render.
