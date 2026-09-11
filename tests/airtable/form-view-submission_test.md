---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable/form-view-submission?reset=true
max_steps: 30
tags: [airtable, work-collab, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Airtably 39.2: Form view submission

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Airtable · Industry: Work collab · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/airtable/form-view-submission?reset=true and verify the text "Use case 39.2" and "Form view submission" are visible at the top of the page.

## Objective
Submit the shared form and verify row created.

## Key assertion
Verify: New record with form values.
