---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe/qr-scan-pay?reset=true
max_steps: 30
tags: [phonepe, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PhonePay 21.1: UPI QR scan pay

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: PhonePe · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/phonepe/qr-scan-pay?reset=true and verify the text "Use case 21.1" and "UPI QR scan pay" are visible at the top of the page.

## Objective
Simulate scan to pay flow with amount entry.

## Key assertion
Verify: Payment success with merchant name shown.
