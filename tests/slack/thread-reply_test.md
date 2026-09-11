---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/thread-reply?reset=true
max_steps: 30
tags: [slack, work-collab, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Slacky 35.1: Message send with thread

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 2). -->
<!-- Catalog entity: Slack · Industry: Work collab · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/slack/thread-reply?reset=true and verify the text "Use case 35.1" and "Message send with thread" are visible at the top of the page.

## Objective
Send a channel message and reply in thread.

## Key assertion
Verify: Thread count increments and reply nested.
