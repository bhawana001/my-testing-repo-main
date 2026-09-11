---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday/board-item?reset=true
max_steps: 30
tags: [monday, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Mondayly 42.1: Board item creation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Monday.com · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/monday/board-item?reset=true and verify the text "Use case 42.1" and "Board item creation" are visible at the top of the page.

## Objective
Add an item with status and person columns.

## Key assertion
Verify: Item row saved with values.
