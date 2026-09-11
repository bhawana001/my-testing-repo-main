---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise/add-recipient?reset=true
max_steps: 30
tags: [wise, payments-infra, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Wyse 15.2: Recipient add and verify

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: Wise · Industry: Payments infra · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/wise/add-recipient?reset=true and verify the text "Use case 15.2" and "Recipient add and verify" are visible at the top of the page.

## Objective
Add a bank recipient with account details.

## Key assertion
Verify: Recipient saved and selectable in transfer.
