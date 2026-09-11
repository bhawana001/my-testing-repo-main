---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/search-channels?reset=true
max_steps: 30
tags: [slack, work-collab, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Slacky 35.3: Search across channels

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: Slack · Industry: Work collab · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/slack/search-channels?reset=true and verify the text "Use case 35.3" and "Search across channels" are visible at the top of the page.

## Objective
Search a keyword and filter to a channel.

## Key assertion
Verify: Results scoped to channel with highlights.
