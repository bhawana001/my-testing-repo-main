---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday/dashboard-widget?reset=true
max_steps: 30
tags: [monday, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Mondayly 42.3: Dashboard widget

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Monday.com · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/monday/dashboard-widget?reset=true and verify the text "Use case 42.3" and "Dashboard widget" are visible at the top of the page.

## Objective
Add a chart widget on board data.

## Key assertion
Verify: Chart reflects board numbers.
