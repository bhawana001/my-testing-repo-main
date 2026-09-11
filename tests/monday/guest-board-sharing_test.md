---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday/guest-board-sharing?reset=true
max_steps: 30
tags: [monday, work-collab, auth]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Mondayly 42.4: Guest board sharing

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: Monday.com · Industry: Work collab · Pattern: Auth engine -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/monday/guest-board-sharing?reset=true and verify the text "Use case 42.4" and "Guest board sharing" are visible at the top of the page.

## Objective
Invite a guest to one board only.

## Key assertion
Verify: Guest sees shared board only.
