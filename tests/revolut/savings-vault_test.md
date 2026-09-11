---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut/savings-vault?reset=true
max_steps: 30
tags: [revolut, consumer-fintech, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Revolute 19.4: Savings vault roundup

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: Revolut · Industry: Consumer fintech · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/revolut/savings-vault?reset=true and verify the text "Use case 19.4" and "Savings vault roundup" are visible at the top of the page.

## Objective
Enable roundup vault and verify rule active.

## Key assertion
Verify: Vault shows roundup toggle on.
