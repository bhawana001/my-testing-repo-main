---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox/file-request?reset=true
max_steps: 30
tags: [dropbox, docs-productivity, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Dropboxy 44.3: File request flow

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Dropbox · Industry: Docs productivity · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/dropbox/file-request?reset=true and verify the text "Use case 44.3" and "File request flow" are visible at the top of the page.

## Objective
Create a file request and upload as guest.

## Key assertion
Verify: File lands in target folder.
