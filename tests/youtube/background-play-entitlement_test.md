---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube/background-play-entitlement?reset=true
max_steps: 30
tags: [youtube, streaming, auth]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# YouTubely 49.3: Premium background play

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: YouTube · Industry: Streaming · Pattern: Auth engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/youtube/background-play-entitlement?reset=true and verify the text "Use case 49.3" and "Premium background play" are visible at the top of the page.

## Objective
Verify background playback entitlement flag on premium test account.

## Key assertion
Verify: Feature active for premium only.
