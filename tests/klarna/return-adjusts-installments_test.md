---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna/return-adjusts-installments?reset=true
max_steps: 30
tags: [klarna, payments-infra, tracker]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Klarnah 14.4: Return adjusts installments

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Klarna · Industry: Payments infra · Pattern: Tracker timeline -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/klarna/return-adjusts-installments?reset=true and verify the text "Use case 14.4" and "Return adjusts installments" are visible at the top of the page.

## Objective
Register a return and verify remaining installments recalculated.

## Key assertion
Verify: Schedule updates to reduced amount.
