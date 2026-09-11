---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe/3ds-challenge?reset=true
max_steps: 30
tags: [stripe, payments-infra, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Stripely 9.2: 3DS challenge

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 4). -->
<!-- Catalog entity: Stripe · Industry: Payments infra · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/stripe/3ds-challenge?reset=true and verify the text "Use case 9.2" and "3DS challenge" are visible at the top of the page.

## Objective
Pay with a 3DS test card and approve the challenge iframe.

## Key assertion
Verify: Challenge completes and payment succeeds.
