---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce/screen-flow?reset=true
max_steps: 30
tags: [salesforce, crm, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Salesforze 28.5: Flow screen completion

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: Salesforce · Industry: CRM · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/salesforce/screen-flow?reset=true and verify the text "Use case 28.5" and "Flow screen completion" are visible at the top of the page.

## Objective
Complete an intake screen flow with branching.

## Key assertion
Verify: Flow finishes with success screen and record created.
