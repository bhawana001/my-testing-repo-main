---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom/outbound-message?reset=true
max_steps: 30
tags: [intercom, support-saas, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Intercomm 31.4: Outbound message display

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Intercom · Industry: Support SaaS · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/intercom/outbound-message?reset=true and verify the text "Use case 31.4" and "Outbound message display" are visible at the top of the page.

## Objective
Verify a targeted outbound message shows on matching page.

## Key assertion
Verify: Message displays with working CTA.
