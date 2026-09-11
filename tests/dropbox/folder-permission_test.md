---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox/folder-permission?reset=true
max_steps: 30
tags: [dropbox, docs-productivity, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Dropboxy 44.2: Folder permission change

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Dropbox · Industry: Docs productivity · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/dropbox/folder-permission?reset=true and verify the text "Use case 44.2" and "Folder permission change" are visible at the top of the page.

## Objective
Change folder to team edit access.

## Key assertion
Verify: Member can edit after change.
