---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk/sla-breach-indicator?reset=true
max_steps: 30
tags: [zendesk, support-saas, tracker]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zendeskly 30.5: SLA breach indicator

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Zendesk · Industry: Support SaaS · Pattern: Tracker timeline -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zendesk/sla-breach-indicator?reset=true and verify the text "Use case 30.5" and "SLA breach indicator" are visible at the top of the page.

## Objective
Verify SLA timer displays on a priority ticket.

## Key assertion
Verify: Timer visible with correct target.
