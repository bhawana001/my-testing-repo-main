---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar/premium-calculator?reset=true
max_steps: 30
tags: [policybazaar, insurance, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PolicyMart 27.4: Premium calculator

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: Policybazaar · Industry: Insurance · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/policybazaar/premium-calculator?reset=true and verify the text "Use case 27.4" and "Premium calculator" are visible at the top of the page.

## Objective
Adjust age and cover in calculator and verify premium updates.

## Key assertion
Verify: Premium recalculates on each change.
