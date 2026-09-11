---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk/email-to-ticket?reset=true
max_steps: 30
tags: [freshdesk, support-saas, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Freshdeskly 33.1: Email to ticket conversion

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Freshdesk · Industry: Support SaaS · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/freshdesk/email-to-ticket?reset=true and verify the text "Use case 33.1" and "Email to ticket conversion" are visible at the top of the page.

## Objective
Send email to support address and verify ticket created.

## Key assertion
Verify: Ticket with correct subject and requester.
