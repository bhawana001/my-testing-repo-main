---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow/incident-creation?reset=true
max_steps: 30
tags: [servicenow, itsm, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# ServiceNowly 34.1: Incident creation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: ServiceNow · Industry: ITSM · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/servicenow/incident-creation?reset=true and verify the text "Use case 34.1" and "Incident creation" are visible at the top of the page.

## Objective
Create an incident with category and priority.

## Key assertion
Verify: Incident number generated and assigned.
