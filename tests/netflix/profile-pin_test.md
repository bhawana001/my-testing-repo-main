---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/profile-pin?reset=true
max_steps: 30
tags: [netflix, streaming, auth]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Netflixy 47.3: Profile switch with PIN

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Netflix · Industry: Streaming · Pattern: Auth engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/netflix/profile-pin?reset=true and verify the text "Use case 47.3" and "Profile switch with PIN" are visible at the top of the page.

## Objective
Switch to a PIN protected profile.

## Key assertion
Verify: PIN gate enforced and profile content loads.
