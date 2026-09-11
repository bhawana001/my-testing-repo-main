---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-crm/dashboard-kpi?reset=true
max_steps: 30
tags: [zoho-crm, crm, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zohoo CRM 32.4: Dashboard KPI render

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Zoho CRM · Industry: CRM · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zoho-crm/dashboard-kpi?reset=true and verify the text "Use case 32.4" and "Dashboard KPI render" are visible at the top of the page.

## Objective
Open a dashboard and verify KPI cards match report values.

## Key assertion
Verify: Numbers consistent across widgets.
