---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/file-upload-preview?reset=true
max_steps: 30
tags: [slack, work-collab, feed]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Slacky 35.2: File upload and preview

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: Slack · Industry: Work collab · Pattern: Feed / messaging -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/slack/file-upload-preview?reset=true and verify the text "Use case 35.2" and "File upload and preview" are visible at the top of the page.

## Objective
Upload an image and verify inline preview.

## Key assertion
Verify: Preview renders and file downloadable.
