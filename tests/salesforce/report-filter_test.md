---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce/report-filter?reset=true
max_steps: 30
tags: [salesforce, crm, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Salesforze 28.3: Report run and filter

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: Salesforce · Industry: CRM · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/salesforce/report-filter?reset=true and verify the text "Use case 28.3" and "Report run and filter" are visible at the top of the page.

## Objective
Run a pipeline report filtered to this quarter.

## Key assertion
Verify: Report renders rows matching filter.
