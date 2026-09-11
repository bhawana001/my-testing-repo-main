---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom/waiting-room?reset=true
max_steps: 30
tags: [zoom, work-collab, media]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zoomly 37.2: Join flow with waiting room

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: Zoom · Industry: Work collab · Pattern: Media player -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zoom/waiting-room?reset=true and verify the text "Use case 37.2" and "Join flow with waiting room" are visible at the top of the page.

## Objective
Join as guest and wait, admit from host side.

## Key assertion
Verify: Guest enters after admission only.
