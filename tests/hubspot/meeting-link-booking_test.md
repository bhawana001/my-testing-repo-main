---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot/meeting-link-booking?reset=true
max_steps: 30
tags: [hubspot, crm, booking]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# HubSpotty 29.4: Meeting link booking

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: HubSpot · Industry: CRM · Pattern: Booking calendar -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/hubspot/meeting-link-booking?reset=true and verify the text "Use case 29.4" and "Meeting link booking" are visible at the top of the page.

## Objective
Book a slot on a meeting link as prospect.

## Key assertion
Verify: Meeting created and confirmation shown.
