---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot/sequence-enrollment?reset=true
max_steps: 30
tags: [hubspot, crm, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# HubSpotty 29.3: Email sequence enrollment

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: HubSpot · Industry: CRM · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/hubspot/sequence-enrollment?reset=true and verify the text "Use case 29.3" and "Email sequence enrollment" are visible at the top of the page.

## Objective
Enroll a contact in a sequence.

## Key assertion
Verify: Sequence active on contact timeline.
