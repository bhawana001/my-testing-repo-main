---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe/history-filter?reset=true
max_steps: 30
tags: [phonepe, consumer-fintech, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# PhonePay 21.3: Transaction history filter

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 6). -->
<!-- Catalog entity: PhonePe · Industry: Consumer fintech · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/phonepe/history-filter?reset=true and verify the text "Use case 21.3" and "Transaction history filter" are visible at the top of the page.

## Objective
Filter history by month and category.

## Key assertion
Verify: Filtered list matches criteria.
