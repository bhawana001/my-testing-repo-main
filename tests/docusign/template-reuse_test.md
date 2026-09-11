---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign/template-reuse?reset=true
max_steps: 30
tags: [docusign, docs-productivity, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# DocuSigned 43.3: Template reuse

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 12). -->
<!-- Catalog entity: DocuSign · Industry: Docs productivity · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/docusign/template-reuse?reset=true and verify the text "Use case 43.3" and "Template reuse" are visible at the top of the page.

## Objective
Send a new envelope from template.

## Key assertion
Verify: Fields prefilled from template.
