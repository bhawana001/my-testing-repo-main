---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase/zelle-transfer?reset=true
max_steps: 30
tags: [chase, banking, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Chaise Bank 23.2: Zelle transfer

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: Chase · Industry: Banking · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/chase/zelle-transfer?reset=true and verify the text "Use case 23.2" and "Zelle transfer" are visible at the top of the page.

## Objective
Send a Zelly payment to saved contact.

## Key assertion
Verify: Confirmation with reference number.
