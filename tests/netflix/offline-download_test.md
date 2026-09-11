---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/offline-download?reset=true
max_steps: 30
tags: [netflix, streaming, media]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Netflixy 47.4: Download for offline

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Netflix · Industry: Streaming · Pattern: Media player -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/netflix/offline-download?reset=true and verify the text "Use case 47.4" and "Download for offline" are visible at the top of the page.

## Objective
Download an episode on mobile viewport.

## Key assertion
Verify: Download completes and playable state.
