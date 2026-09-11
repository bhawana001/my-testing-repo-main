---
mode: testing
url: https://my-testing-repo-main.vercel.app/microsoft-teams/mention-notification?reset=true
max_steps: 30
tags: [microsoft-teams, work-collab, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Teamz 36.2: Channel post with mention

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: Microsoft Teams · Industry: Work collab · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/mention-notification?reset=true and verify the text "Use case 36.2" and "Channel post with mention" are visible at the top of the page.

## Objective
Post with an @ mention and verify notification.

## Key assertion
Verify: Mentioned user activity shows the post.
