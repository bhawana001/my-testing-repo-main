---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom/messenger-conversation?reset=true
max_steps: 30
tags: [intercom, support-saas, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Intercomm 31.1: Messenger conversation start

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Intercom · Industry: Support SaaS · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/intercom/messenger-conversation?reset=true and verify the text "Use case 31.1" and "Messenger conversation start" are visible at the top of the page.

## Objective
Open messenger and start a conversation with an attachment.

## Key assertion
Verify: Message sent and visible in inbox.
