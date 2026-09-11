---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion/database-filter-sort?reset=true
max_steps: 30
tags: [notion, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Notionly 38.2: Database filter and sort

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Notion · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/notion/database-filter-sort?reset=true and verify the text "Use case 38.2" and "Database filter and sort" are visible at the top of the page.

## Objective
Filter a database by status and sort by date.

## Key assertion
Verify: View shows only matching sorted rows.
