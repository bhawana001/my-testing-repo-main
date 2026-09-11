---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce/opportunity-kanban?reset=true
max_steps: 30
tags: [salesforce, crm, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Salesforze 28.2: Opportunity stage move

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: Salesforce · Industry: CRM · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/salesforce/opportunity-kanban?reset=true and verify the text "Use case 28.2" and "Opportunity stage move" are visible at the top of the page.

## Objective
Drag an opportunity to next stage in kanban.

## Key assertion
Verify: Stage updated and probability changed.
