---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal/send-money?reset=true
max_steps: 30
tags: [paypal, payments-infra, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PayPally 10.3: Send money P2P

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 14). -->
<!-- Catalog entity: PayPal · Industry: Payments infra · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/paypal/send-money?reset=true and verify the text "Use case 10.3" and "Send money P2P" are visible at the top of the page.

## Objective
Send money to a sandbox contact with a note.

## Key assertion
Verify: Recipient and amount confirmed in activity.
