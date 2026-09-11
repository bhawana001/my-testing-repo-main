---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana/my-tasks-sort?reset=true
max_steps: 30
tags: [asana, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Asanah 40.4: My Tasks sort

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Asana · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/asana/my-tasks-sort?reset=true and verify the text "Use case 40.4" and "My Tasks sort" are visible at the top of the page.

## Objective
Verify My Tasks groups by due date.

## Key assertion
Verify: Tasks appear in correct sections.
