---
mode: testing
url: https://my-testing-repo-main.vercel.app/google-drive/realtime-coedit?reset=true
max_steps: 30
tags: [google-drive, docs-productivity, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Drively 45.2: Real-time coedit

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Google Drive · Industry: Docs productivity · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/google-drive/realtime-coedit?reset=true and verify the text "Use case 45.2" and "Real-time coedit" are visible at the top of the page.

## Objective
Two sessions edit a doc and verify no conflict.

## Key assertion
Verify: Both edits present with cursors shown.
