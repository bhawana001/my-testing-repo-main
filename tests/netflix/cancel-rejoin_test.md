---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/cancel-rejoin?reset=true
max_steps: 30
tags: [netflix, streaming, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Netflixy 47.5: Cancel and rejoin

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Netflix · Industry: Streaming · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/netflix/cancel-rejoin?reset=true and verify the text "Use case 47.5" and "Cancel and rejoin" are visible at the top of the page.

## Objective
Cancel membership and verify end date, then restart.

## Key assertion
Verify: Access until date shown and restart works.
