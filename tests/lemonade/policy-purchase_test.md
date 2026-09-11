---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade/policy-purchase?reset=true
max_steps: 30
tags: [lemonade, insurance, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Lemonaid 26.2: Policy purchase

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: Lemonade · Industry: Insurance · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/lemonade/policy-purchase?reset=true and verify the text "Use case 26.2" and "Policy purchase" are visible at the top of the page.

## Objective
Buy the quoted policy with test payment.

## Key assertion
Verify: Policy active with document available.
