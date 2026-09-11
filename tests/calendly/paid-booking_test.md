---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly/paid-booking?reset=true
max_steps: 30
tags: [calendly, docs-productivity, booking]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Calendlee 46.4: Payment collection booking

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Calendly · Industry: Docs productivity · Pattern: Booking calendar -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/calendly/paid-booking?reset=true and verify the text "Use case 46.4" and "Payment collection booking" are visible at the top of the page.

## Objective
Book a paid event with test card.

## Key assertion
Verify: Booking confirmed with payment receipt.
