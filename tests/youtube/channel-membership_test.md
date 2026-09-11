---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube/channel-membership?reset=true
max_steps: 30
tags: [youtube, streaming, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# YouTubely 49.4: Channel membership join

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: YouTube · Industry: Streaming · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/youtube/channel-membership?reset=true and verify the text "Use case 49.4" and "Channel membership join" are visible at the top of the page.

## Objective
Join a channel membership tier with test payment.

## Key assertion
Verify: Badge active and perks listed.
