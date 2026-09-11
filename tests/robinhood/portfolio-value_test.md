---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/portfolio-value?reset=true
max_steps: 30
tags: [robinhood, consumer-fintech, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Robinhoot 16.3: Portfolio value render

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Robinhood · Industry: Consumer fintech · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/robinhood/portfolio-value?reset=true and verify the text "Use case 16.3" and "Portfolio value render" are visible at the top of the page.

## Objective
Open portfolio and verify total equals sum of positions.

## Key assertion
Verify: Total matches computed position sum.
