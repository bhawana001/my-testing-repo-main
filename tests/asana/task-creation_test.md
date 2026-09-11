---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana/task-creation?reset=true
max_steps: 30
tags: [asana, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Asanah 40.1: Task creation with assignee

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Asana · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/asana/task-creation?reset=true and verify the text "Use case 40.1" and "Task creation with assignee" are visible at the top of the page.

## Objective
Create a task with assignee and due date.

## Key assertion
Verify: Task in list and assignee notified.
