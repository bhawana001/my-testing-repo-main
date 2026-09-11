---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal/currency-conversion?reset=true
max_steps: 30
tags: [paypal, payments-infra, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PayPally 10.5: Currency conversion display

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 14). -->
<!-- Catalog entity: PayPal · Industry: Payments infra · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/paypal/currency-conversion?reset=true and verify the text "Use case 10.5" and "Currency conversion display" are visible at the top of the page.

## Objective
Send an international payment and verify conversion rate shown.

## Key assertion
Verify: Rate and converted amount displayed before confirm.
