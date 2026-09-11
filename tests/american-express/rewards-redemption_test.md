---
mode: testing
url: https://my-testing-repo-main.vercel.app/american-express/rewards-redemption?reset=true
max_steps: 30
tags: [american-express, banking, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Amerix 25.1: Membership rewards redemption

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: American Express · Industry: Banking · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/american-express/rewards-redemption?reset=true and verify the text "Use case 25.1" and "Membership rewards redemption" are visible at the top of the page.

## Objective
Redeem points for a statement credit.

## Key assertion
Verify: Points deducted and credit pending shown.
