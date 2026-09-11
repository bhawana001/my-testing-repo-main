---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm/wallet-to-bank?reset=true
max_steps: 30
tags: [paytm, consumer-fintech, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Paytum 20.4: Wallet to bank transfer

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Paytm · Industry: Consumer fintech · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/paytm/wallet-to-bank?reset=true and verify the text "Use case 20.4" and "Wallet to bank transfer" are visible at the top of the page.

## Objective
Transfer wallet balance to linked bank.

## Key assertion
Verify: Wallet debited and transfer initiated state.
