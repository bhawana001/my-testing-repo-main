---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo/request-and-remind?reset=true
max_steps: 30
tags: [venmo, consumer-fintech, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Venmoo 22.2: Request and remind

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Venmo · Industry: Consumer fintech · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/venmo/request-and-remind?reset=true and verify the text "Use case 22.2" and "Request and remind" are visible at the top of the page.

## Objective
Request money and send a reminder.

## Key assertion
Verify: Request pending with reminder sent state.
