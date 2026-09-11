---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk/macro-application?reset=true
max_steps: 30
tags: [zendesk, support-saas, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zendeskly 30.3: Macro application

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Zendesk · Industry: Support SaaS · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zendesk/macro-application?reset=true and verify the text "Use case 30.3" and "Macro application" are visible at the top of the page.

## Objective
Apply a macro to a ticket.

## Key assertion
Verify: Macro fields and reply text applied.
