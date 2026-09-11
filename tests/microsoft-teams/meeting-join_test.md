---
mode: testing
url: https://my-testing-repo-main.vercel.app/microsoft-teams/meeting-join?reset=true
max_steps: 30
tags: [microsoft-teams, work-collab, media]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Teamz 36.1: Meeting join from calendar

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: Microsoft Teams · Industry: Work collab · Pattern: Media player -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/meeting-join?reset=true and verify the text "Use case 36.1" and "Meeting join from calendar" are visible at the top of the page.

## Objective
Join a scheduled meeting from calendar entry.

## Key assertion
Verify: In-meeting screen with mic controls.
