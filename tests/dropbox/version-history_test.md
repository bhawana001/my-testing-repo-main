---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox/version-history?reset=true
max_steps: 30
tags: [dropbox, docs-productivity, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Dropboxy 44.4: Version history restore

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Dropbox · Industry: Docs productivity · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/dropbox/version-history?reset=true and verify the text "Use case 44.4" and "Version history restore" are visible at the top of the page.

## Objective
Restore an older version of a file.

## Key assertion
Verify: File content reverts to selected version.
