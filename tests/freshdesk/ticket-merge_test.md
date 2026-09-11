---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk/ticket-merge?reset=true
max_steps: 30
tags: [freshdesk, support-saas, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Freshdeskly 33.3: Ticket merge

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Freshdesk · Industry: Support SaaS · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/freshdesk/ticket-merge?reset=true and verify the text "Use case 33.3" and "Ticket merge" are visible at the top of the page.

## Objective
Merge two tickets from same requester.

## Key assertion
Verify: Merged ticket contains both threads.
