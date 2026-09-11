---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar/lead-callback?reset=true
max_steps: 30
tags: [policybazaar, insurance, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PolicyMart 27.2: Lead form to callback

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: Policybazaar · Industry: Insurance · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/policybazaar/lead-callback?reset=true and verify the text "Use case 27.2" and "Lead form to callback" are visible at the top of the page.

## Objective
Submit interest and verify callback scheduled state.

## Key assertion
Verify: Confirmation with advisor callback promise.
