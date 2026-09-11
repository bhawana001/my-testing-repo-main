---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk/portal-ticket-view?reset=true
max_steps: 30
tags: [freshdesk, support-saas, auth]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Freshdeskly 33.4: Customer portal ticket view

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Freshdesk · Industry: Support SaaS · Pattern: Auth engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/freshdesk/portal-ticket-view?reset=true and verify the text "Use case 33.4" and "Customer portal ticket view" are visible at the top of the page.

## Objective
Log in to portal and view ticket status.

## Key assertion
Verify: Status and replies visible to customer.
