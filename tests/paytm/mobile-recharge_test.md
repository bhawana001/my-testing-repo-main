---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm/mobile-recharge?reset=true
max_steps: 30
tags: [paytm, consumer-fintech, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Paytum 20.2: Mobile recharge

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Paytm · Industry: Consumer fintech · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/paytm/mobile-recharge?reset=true and verify the text "Use case 20.2" and "Mobile recharge" are visible at the top of the page.

## Objective
Recharge a prepaid number choosing a plan.

## Key assertion
Verify: Plan amount charged and receipt shown.
