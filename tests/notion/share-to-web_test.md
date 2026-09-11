---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion/share-to-web?reset=true
max_steps: 30
tags: [notion, work-collab, custom]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Notionly 38.3: Share to web publish

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 11). -->
<!-- Catalog entity: Notion · Industry: Work collab · Pattern: Custom -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/notion/share-to-web?reset=true and verify the text "Use case 38.3" and "Share to web publish" are visible at the top of the page.

## Objective
Publish a page to web and open the public link.

## Key assertion
Verify: Public page renders without auth.
