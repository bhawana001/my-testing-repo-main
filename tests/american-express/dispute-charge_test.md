---
mode: testing
url: https://my-testing-repo-main.vercel.app/american-express/dispute-charge?reset=true
max_steps: 30
tags: [american-express, banking, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Amerix 25.3: Dispute a charge

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: American Express · Industry: Banking · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/american-express/dispute-charge?reset=true and verify the text "Use case 25.3" and "Dispute a charge" are visible at the top of the page.

## Objective
Start a dispute on a recent charge.

## Key assertion
Verify: Case opened with confirmation.
