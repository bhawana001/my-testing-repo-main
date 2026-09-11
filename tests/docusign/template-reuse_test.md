---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign/template-reuse?reset=true
max_steps: 45
tags: [docusign, docs-productivity, wizard]
---

# DocuSigned 43.3: Template reuse

Catalog objective: send a new envelope from a template.
Key assertion: fields are prefilled from the template.

## Use the template
Go to https://my-testing-repo-main.vercel.app/docusign/template-reuse?reset=true, click "Use" on "Offer letter", and verify the prefilled panel shows Document "Offer-Letter.pdf", Email subject "Your offer from Acme Inc", Recipient role "Candidate", Title "Senior Engineer", Base salary "$165,000" and Start date "2026-10-05".

## Send
Type "Sam Lee" into Name and "sam@acme.test" into Email, click "Send", and verify "Envelope sent from template “Offer letter”".

## Verify the sent values
Verify the sent envelope shows Base salary "$165,000", Start date "2026-10-05" and Manager "Priya Nair" from the template.
