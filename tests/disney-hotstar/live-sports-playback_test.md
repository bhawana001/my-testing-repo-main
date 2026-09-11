---
mode: testing
url: https://my-testing-repo-main.vercel.app/disney-hotstar/live-sports-playback?reset=true
max_steps: 30
tags: [disney-hotstar, streaming, media]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Hotstarry 50.1: Live sports playback

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Disney+ Hotstar · Industry: Streaming · Pattern: Media player -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/disney-hotstar/live-sports-playback?reset=true and verify the text "Use case 50.1" and "Live sports playback" are visible at the top of the page.

## Objective
Open a live match stream and verify player loads with score overlay.

## Key assertion
Verify: Stream plays with live indicator.
