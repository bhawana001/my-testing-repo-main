---
mode: testing
url: https://my-testing-repo-main.vercel.app/square/invoice-pay?reset=true
max_steps: 30
tags: [square, payments-infra, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Squarely 12.2: Invoice pay flow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 4). -->
<!-- Catalog entity: Square · Industry: Payments infra · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/square/invoice-pay?reset=true and verify the text "Use case 12.2" and "Invoice pay flow" are visible at the top of the page.

## Objective
Open an emailed invoice and pay it online.

## Key assertion
Verify: Invoice status flips to paid.
