---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade/claim-filing?reset=true
max_steps: 30
tags: [lemonade, insurance, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Lemonaid 26.3: Claim filing video flow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: Lemonade · Industry: Insurance · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/lemonade/claim-filing?reset=true and verify the text "Use case 26.3" and "Claim filing video flow" are visible at the top of the page.

## Objective
File a claim describing an incident.

## Key assertion
Verify: Claim submitted with claim id.
