---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion/comment-mention?reset=true
max_steps: 30
tags: [notion, work-collab, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Notionly 38.5: Comment and mention

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Notion · Industry: Work collab · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/notion/comment-mention?reset=true and verify the text "Use case 38.5" and "Comment and mention" are visible at the top of the page.

## Objective
Comment on a block mentioning a teammate.

## Key assertion
Verify: Comment saved with notification sent.
