---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk/widget-ticket?reset=true
max_steps: 30
tags: [zendesk, support-saas, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zendeskly 30.1: Ticket submission via widget

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Zendesk · Industry: Support SaaS · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zendesk/widget-ticket?reset=true and verify the text "Use case 30.1" and "Ticket submission via widget" are visible at the top of the page.

## Objective
Submit a ticket through the web widget.

## Key assertion
Verify: Ticket created with correct fields.
