---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase/crypto-buy?reset=true
max_steps: 30
tags: [coinbase, consumer-fintech, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Coinbayse 18.1: Crypto buy with card

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Coinbase · Industry: Consumer fintech · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/coinbase/crypto-buy?reset=true and verify the text "Use case 18.1" and "Crypto buy with card" are visible at the top of the page.

## Objective
Buy a small BTC amount in sandbox with test card.

## Key assertion
Verify: Purchase confirmation and balance credited.
