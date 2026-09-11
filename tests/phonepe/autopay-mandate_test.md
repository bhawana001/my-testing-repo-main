---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe/autopay-mandate?reset=true
max_steps: 30
tags: [phonepe, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PhonePay 21.2: Autopay mandate setup

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: PhonePe · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/phonepe/autopay-mandate?reset=true and verify the text "Use case 21.2" and "Autopay mandate setup" are visible at the top of the page.

## Objective
Create a UPI autopay mandate for a service.

## Key assertion
Verify: Mandate active with cap amount.
