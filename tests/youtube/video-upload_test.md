---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube/video-upload?reset=true
max_steps: 30
tags: [youtube, streaming, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# YouTubely 49.1: Video upload and process

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: YouTube · Industry: Streaming · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/youtube/video-upload?reset=true and verify the text "Use case 49.1" and "Video upload and process" are visible at the top of the page.

## Objective
Upload a short video with title and visibility.

## Key assertion
Verify: Video processes and plays at set visibility.
