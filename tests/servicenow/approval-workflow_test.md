---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow/approval-workflow?reset=true
max_steps: 30
tags: [servicenow, itsm, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# ServiceNowly 34.2: Approval workflow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: ServiceNow · Industry: ITSM · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/servicenow/approval-workflow?reset=true and verify the text "Use case 34.2" and "Approval workflow" are visible at the top of the page.

## Objective
Submit a change request and approve as approver.

## Key assertion
Verify: State moves to approved.
