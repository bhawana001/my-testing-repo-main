---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase/statement-download?reset=true
max_steps: 30
tags: [chase, banking, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Chaise Bank 23.4: Statement download

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: Chase · Industry: Banking · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/chase/statement-download?reset=true and verify the text "Use case 23.4" and "Statement download" are visible at the top of the page.

## Objective
Download last month statement PDF.

## Key assertion
Verify: PDF downloads and is non-empty.
