---
mode: testing
url: https://my-testing-repo-main.vercel.app/google-drive/offline-sync?reset=true
max_steps: 30
tags: [google-drive, docs-productivity, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Drively 45.4: Offline mode edit sync

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Google Drive · Industry: Docs productivity · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/google-drive/offline-sync?reset=true and verify the text "Use case 45.4" and "Offline mode edit sync" are visible at the top of the page.

## Objective
Edit offline and verify sync on reconnect.

## Key assertion
Verify: Offline edit appears after reconnection.
