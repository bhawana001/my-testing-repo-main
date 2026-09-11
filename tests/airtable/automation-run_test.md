---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable/automation-run?reset=true
max_steps: 30
tags: [airtable, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Airtably 39.4: Automation run

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Airtable · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/airtable/automation-run?reset=true and verify the text "Use case 39.4" and "Automation run" are visible at the top of the page.

## Objective
Trigger an automation with a record change.

## Key assertion
Verify: Automation action executed and logged.
