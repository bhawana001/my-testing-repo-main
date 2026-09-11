---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana/board-move?reset=true
max_steps: 30
tags: [asana, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Asanah 40.2: Project board move

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Asana · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/asana/board-move?reset=true and verify the text "Use case 40.2" and "Project board move" are visible at the top of the page.

## Objective
Move a task across board columns.

## Key assertion
Verify: Section updated and history logged.
