---
mode: testing
url: https://my-testing-repo-main.vercel.app/google-drive/drive-search?reset=true
max_steps: 30
tags: [google-drive, docs-productivity, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Drively 45.3: Search across drive

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Google Drive · Industry: Docs productivity · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/google-drive/drive-search?reset=true and verify the text "Use case 45.3" and "Search across drive" are visible at the top of the page.

## Objective
Search by keyword and file type filter.

## Key assertion
Verify: Results match type and content.
