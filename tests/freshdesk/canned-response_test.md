---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk/canned-response?reset=true
max_steps: 30
tags: [freshdesk, support-saas, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Freshdeskly 33.2: Canned response insert

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Freshdesk · Industry: Support SaaS · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/freshdesk/canned-response?reset=true and verify the text "Use case 33.2" and "Canned response insert" are visible at the top of the page.

## Objective
Insert a canned response in reply.

## Key assertion
Verify: Response text inserted with placeholders resolved.
