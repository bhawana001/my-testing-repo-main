---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom/meeting-registration?reset=true
max_steps: 30
tags: [zoom, work-collab, booking]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zoomly 37.1: Meeting schedule with registration

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: Zoom · Industry: Work collab · Pattern: Booking calendar -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zoom/meeting-registration?reset=true and verify the text "Use case 37.1" and "Meeting schedule with registration" are visible at the top of the page.

## Objective
Schedule a meeting requiring registration.

## Key assertion
Verify: Registration link generated and form works.
