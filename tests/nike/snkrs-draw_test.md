---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike/snkrs-draw?reset=true
max_steps: 30
tags: [nike, e-commerce, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Nyke 8.3: SNKRS draw entry

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Nike · Industry: E-commerce · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/nike/snkrs-draw?reset=true and verify the text "Use case 8.3" and "SNKRS draw entry" are visible at the top of the page.

## Objective
Enter a draw on a launch product.

## Key assertion
Verify: Entry confirmed state shown.
