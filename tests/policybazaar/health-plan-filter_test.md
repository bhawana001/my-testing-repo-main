---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar/health-plan-filter?reset=true
max_steps: 30
tags: [policybazaar, insurance, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PolicyMart 27.3: Health plan filter

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: Policybazaar · Industry: Insurance · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/policybazaar/health-plan-filter?reset=true and verify the text "Use case 27.3" and "Health plan filter" are visible at the top of the page.

## Objective
Filter health plans by room rent limit and premium.

## Key assertion
Verify: Results respect both filters.
