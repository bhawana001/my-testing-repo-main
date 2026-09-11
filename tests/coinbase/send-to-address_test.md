---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase/send-to-address?reset=true
max_steps: 30
tags: [coinbase, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Coinbayse 18.3: Send to address flow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Coinbase · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/coinbase/send-to-address?reset=true and verify the text "Use case 18.3" and "Send to address flow" are visible at the top of the page.

## Objective
Initiate a send, verify address validation and warning states.

## Key assertion
Verify: Invalid address blocked before confirm.
