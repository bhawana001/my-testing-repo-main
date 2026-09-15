---
test: ../template-reuse_test.md
status: passed
started: 2026-09-13T18:40:01.093Z
duration_s: 124
session_id: 2489aaf5-55be-47a4-bc29-3289b1a6a240
---

# DocuSigned 43.3: Template reuse — Result

## Use the template ✓ passed (37.9s)
md5: 0c8fa1f9a424cfc344b4777ff6717406
Go to https://my-testing-repo-main.vercel.app/docusign/template-reuse?reset=true, click "Use" on "Offer letter", and verify the prefilled panel shows Document "Offer-Letter.pdf", Email subject "Your offer from Acme Inc", Recipient role "Candidate", Title "Senior Engineer", Base salary "$165,000" and Start date "2026-10-05".

## Send ✓ passed (39.6s)
md5: 9b4d23c1f009dd6a33356399828d130b
Type "Sam Lee" into Name and "sam@acme.test" into Email, click "Send", and verify "Envelope sent from template “Offer letter”".

## Verify the sent values ✓ passed (44.2s)
md5: 339bec85fbb3093fa297d89ec406f89d
Verify the sent envelope shows Base salary "$165,000", Start date "2026-10-05" and Manager "Priya Nair" from the template.
