---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube/comment-pin?reset=true
max_steps: 30
tags: [youtube, streaming, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# YouTubely 49.2: Comment and moderation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: YouTube · Industry: Streaming · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/youtube/comment-pin?reset=true and verify the text "Use case 49.2" and "Comment and moderation" are visible at the top of the page.

## Objective
Comment on a video and pin as creator.

## Key assertion
Verify: Comment pinned at top.
