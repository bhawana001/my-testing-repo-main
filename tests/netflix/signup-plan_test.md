---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/signup-plan?reset=true
max_steps: 30
tags: [netflix, streaming, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Netflixy 47.1: Signup with plan selection

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Netflix · Industry: Streaming · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/netflix/signup-plan?reset=true and verify the text "Use case 47.1" and "Signup with plan selection" are visible at the top of the page.

## Objective
Sign up choosing standard plan with test card.

## Key assertion
Verify: Account active with correct plan.
