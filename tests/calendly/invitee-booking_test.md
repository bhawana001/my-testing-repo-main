---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly/invitee-booking?reset=true
max_steps: 30
tags: [calendly, docs-productivity, booking]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Calendlee 46.1: Event booking as invitee

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 2). -->
<!-- Catalog entity: Calendly · Industry: Docs productivity · Pattern: Booking calendar -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/calendly/invitee-booking?reset=true and verify the text "Use case 46.1" and "Event booking as invitee" are visible at the top of the page.

## Objective
Book a 30 minute slot with timezone shift.

## Key assertion
Verify: Correct local time confirmed both sides.
