---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-bank/fd-creation?reset=true
max_steps: 30
tags: [hdfc-bank, banking, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# HDFB Bank 24.3: FD creation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 5). -->
<!-- Catalog entity: HDFC Bank · Industry: Banking · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/fd-creation?reset=true and verify the text "Use case 24.3" and "FD creation" are visible at the top of the page.

## Objective
Open a fixed deposit choosing tenure and amount.

## Key assertion
Verify: FD receipt with maturity amount shown.
