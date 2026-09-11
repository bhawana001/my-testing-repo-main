---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm/upi-transfer?reset=true
max_steps: 30
tags: [paytm, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Paytum 20.1: UPI money transfer

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Paytm · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/paytm/upi-transfer?reset=true and verify the text "Use case 20.1" and "UPI money transfer" are visible at the top of the page.

## Objective
Send money to a UPI id with note in test env.

## Key assertion
Verify: Success screen and transaction in history.
