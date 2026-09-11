---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo/cash-out?reset=true
max_steps: 30
tags: [venmo, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Venmoo 22.3: Cash out to bank

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Venmo · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/venmo/cash-out?reset=true and verify the text "Use case 22.3" and "Cash out to bank" are visible at the top of the page.

## Objective
Transfer balance with instant option and verify fee display.

## Key assertion
Verify: Fee shown and arrival estimate stated.
