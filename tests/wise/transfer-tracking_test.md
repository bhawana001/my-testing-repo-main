---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise/transfer-tracking?reset=true
max_steps: 30
tags: [wise, payments-infra, tracker]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Wyse 15.3: Transfer status tracking

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: Wise · Industry: Payments infra · Pattern: Tracker timeline -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/wise/transfer-tracking?reset=true and verify the text "Use case 15.3" and "Transfer status tracking" are visible at the top of the page.

## Objective
Open an in-flight transfer and check status steps.

## Key assertion
Verify: Timeline shows current step accurately.
