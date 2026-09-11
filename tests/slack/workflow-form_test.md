---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/workflow-form?reset=true
max_steps: 30
tags: [slack, work-collab, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Slacky 35.5: Workflow form submission

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: Slack · Industry: Work collab · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/slack/workflow-form?reset=true and verify the text "Use case 35.5" and "Workflow form submission" are visible at the top of the page.

## Objective
Trigger a workflow form and submit.

## Key assertion
Verify: Confirmation message posted.
