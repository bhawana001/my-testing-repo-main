---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen/ideal-redirect?reset=true
max_steps: 30
tags: [adyen, payments-infra, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Adyenly 13.2: Local method iDEAL

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 4). -->
<!-- Catalog entity: Adyen · Industry: Payments infra · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/adyen/ideal-redirect?reset=true and verify the text "Use case 13.2" and "Local method iDEAL" are visible at the top of the page.

## Objective
Select iDEAL in test, complete issuer simulation.

## Key assertion
Verify: Redirect returns with authorised state.
