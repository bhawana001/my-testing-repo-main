---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut/split-bill?reset=true
max_steps: 30
tags: [revolut, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Revolute 19.3: Payment split bill

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Revolut · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/revolut/split-bill?reset=true and verify the text "Use case 19.3" and "Payment split bill" are visible at the top of the page.

## Objective
Split a transaction with a contact.

## Key assertion
Verify: Request created for half the amount.
