---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow/knowledge-search?reset=true
max_steps: 30
tags: [servicenow, itsm, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# ServiceNowly 34.4: Knowledge article search

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 10). -->
<!-- Catalog entity: ServiceNow · Industry: ITSM · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/servicenow/knowledge-search?reset=true and verify the text "Use case 34.4" and "Knowledge article search" are visible at the top of the page.

## Objective
Search knowledge base and open article.

## Key assertion
Verify: Article renders with helpful vote widget.
