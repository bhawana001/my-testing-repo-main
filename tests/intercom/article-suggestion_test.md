---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom/article-suggestion?reset=true
max_steps: 30
tags: [intercom, support-saas, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Intercomm 31.3: Article suggestion in chat

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Intercom · Industry: Support SaaS · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/intercom/article-suggestion?reset=true and verify the text "Use case 31.3" and "Article suggestion in chat" are visible at the top of the page.

## Objective
Type a question and verify article suggestions appear.

## Key assertion
Verify: Suggested article relevant and opens in messenger.
