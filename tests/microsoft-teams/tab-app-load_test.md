---
mode: testing
url: https://my-testing-repo-main.vercel.app/microsoft-teams/tab-app-load?reset=true
max_steps: 30
tags: [microsoft-teams, work-collab, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Teamz 36.4: Tab app load

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: Microsoft Teams · Industry: Work collab · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/tab-app-load?reset=true and verify the text "Use case 36.4" and "Tab app load" are visible at the top of the page.

## Objective
Open a custom tab app in a channel.

## Key assertion
Verify: App loads inside tab without error.
