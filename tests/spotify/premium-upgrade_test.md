---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify/premium-upgrade?reset=true
max_steps: 30
tags: [spotify, streaming, checkout]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Spotifly 48.1: Premium upgrade flow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Spotify · Industry: Streaming · Pattern: Checkout engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/spotify/premium-upgrade?reset=true and verify the text "Use case 48.1" and "Premium upgrade flow" are visible at the top of the page.

## Objective
Upgrade to premium with test payment.

## Key assertion
Verify: Ads removed and premium badge active.
