---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/playback-resume?reset=true
max_steps: 30
tags: [netflix, streaming, media]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Netflixy 47.2: Playback start and resume

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 2). -->
<!-- Catalog entity: Netflix · Industry: Streaming · Pattern: Media player -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/netflix/playback-resume?reset=true and verify the text "Use case 47.2" and "Playback start and resume" are visible at the top of the page.

## Objective
Play a title, stop, and resume from another session.

## Key assertion
Verify: Resume point within seconds of stop.
