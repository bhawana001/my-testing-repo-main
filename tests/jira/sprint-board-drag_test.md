---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira/sprint-board-drag?reset=true
max_steps: 30
tags: [jira, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Jirah 41.2: Sprint board drag

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Jira · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/jira/sprint-board-drag?reset=true and verify the text "Use case 41.2" and "Sprint board drag" are visible at the top of the page.

## Objective
Move an issue to In Progress on sprint board.

## Key assertion
Verify: Status transition applied with history.
