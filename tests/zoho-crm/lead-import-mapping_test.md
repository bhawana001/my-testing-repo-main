---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-crm/lead-import-mapping?reset=true
max_steps: 30
tags: [zoho-crm, crm, wizard]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Zohoo CRM 32.1: Lead import mapping

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 9). -->
<!-- Catalog entity: Zoho CRM · Industry: CRM · Pattern: Form wizard -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/zoho-crm/lead-import-mapping?reset=true and verify the text "Use case 32.1" and "Lead import mapping" are visible at the top of the page.

## Objective
Import a small CSV of leads with field mapping.

## Key assertion
Verify: Leads created with mapped fields.
