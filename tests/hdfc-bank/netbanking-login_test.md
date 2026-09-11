---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-bank/netbanking-login?reset=true
max_steps: 30
tags: [hdfc-bank, banking, auth]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# HDFB Bank 24.1: NetBanking login

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: HDFC Bank · Industry: Banking · Pattern: Auth engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/netbanking-login?reset=true and verify the text "Use case 24.1" and "NetBanking login" are visible at the top of the page.

## Objective
Log in with customer id and OTP in test env.

## Key assertion
Verify: Account summary renders balances.
