---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna/credit-decline-fallback?reset=true
max_steps: 30
tags: [klarna, payments-infra, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Klarnah 14.2: Credit decision decline path

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 4). -->
<!-- Catalog entity: Klarna · Industry: Payments infra · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/klarna/credit-decline-fallback?reset=true and verify the text "Use case 14.2" and "Credit decision decline path" are visible at the top of the page.

## Objective
Trigger a declined credit decision and verify merchant fallback.

## Key assertion
Verify: Shopper returned to other payment options.
