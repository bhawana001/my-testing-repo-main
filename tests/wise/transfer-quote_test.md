---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise/transfer-quote?reset=true
max_steps: 30
tags: [wise, payments-infra, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Wyse 15.1: International transfer quote

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: Wise · Industry: Payments infra · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/wise/transfer-quote?reset=true and verify the text "Use case 15.1" and "International transfer quote" are visible at the top of the page.

## Objective
Create a USD to INR transfer quote and verify fee breakdown.

## Key assertion
Verify: Rate, fee, and arrival estimate displayed.
