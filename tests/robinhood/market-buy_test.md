---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/market-buy?reset=true
max_steps: 30
tags: [robinhood, consumer-fintech, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Robinhoot 16.1: Market buy order

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Robinhood · Industry: Consumer fintech · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/robinhood/market-buy?reset=true and verify the text "Use case 16.1" and "Market buy order" are visible at the top of the page.

## Objective
Search a ticker, place a one share market buy in paper env.

## Key assertion
Verify: Order filled state with share count updated.
