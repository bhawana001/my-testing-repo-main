---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign/decline-void?reset=true
max_steps: 30
tags: [docusign, docs-productivity, tracker]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# DocuSigned 43.4: Decline and void handling

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: DocuSign · Industry: Docs productivity · Pattern: Tracker timeline -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/docusign/decline-void?reset=true and verify the text "Use case 43.4" and "Decline and void handling" are visible at the top of the page.

## Objective
Decline as signer and verify sender notification.

## Key assertion
Verify: Envelope status shows declined with reason.
