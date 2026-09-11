---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/return-initiation?reset=true
max_steps: 30
tags: [amazon, e-commerce, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Amazonia 1.5: Return initiation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Amazon · Industry: E-commerce · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/amazon/return-initiation?reset=true and verify the text "Use case 1.5" and "Return initiation" are visible at the top of the page.

## Objective
Start a return on a delivered item, pick a reason, get the drop-off label step.

## Key assertion
Verify: Return confirmation and refund estimate shown.
