---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike/member-exclusive?reset=true
max_steps: 30
tags: [nike, e-commerce, auth]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Nyke 8.2: Member exclusive access

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 7). -->
<!-- Catalog entity: Nike · Industry: E-commerce · Pattern: Auth engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/nike/member-exclusive?reset=true and verify the text "Use case 8.2" and "Member exclusive access" are visible at the top of the page.

## Objective
Log in as member and open a member-only product.

## Key assertion
Verify: Product accessible and buy button enabled.
