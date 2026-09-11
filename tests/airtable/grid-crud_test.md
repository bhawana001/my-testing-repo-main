---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable/grid-crud?reset=true
max_steps: 30
tags: [airtable, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Airtably 39.1: Grid record CRUD

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 2). -->
<!-- Catalog entity: Airtable · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/airtable/grid-crud?reset=true and verify the text "Use case 39.1" and "Grid record CRUD" are visible at the top of the page.

## Objective
Create, edit, and delete a record in grid view.

## Key assertion
Verify: Changes persist across reload.
