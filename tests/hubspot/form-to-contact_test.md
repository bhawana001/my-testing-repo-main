---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot/form-to-contact?reset=true
max_steps: 30
tags: [hubspot, crm, crud]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# HubSpotty 29.1: Form to contact creation

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 8). -->
<!-- Catalog entity: HubSpot · Industry: CRM · Pattern: CRUD table / board -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/hubspot/form-to-contact?reset=true and verify the text "Use case 29.1" and "Form to contact creation" are visible at the top of the page.

## Objective
Submit a landing page form and verify contact created.

## Key assertion
Verify: Contact exists with form field values.
