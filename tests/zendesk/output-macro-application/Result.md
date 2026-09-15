---
test: ../macro-application_test.md
status: passed
started: 2026-09-13T13:18:45.598Z
duration_s: 103
session_id: 17418b13-481d-4a14-956f-2ca31cc316a3
---

# Zendeskly 30.3: Macro application — Result

## Open the ticket ✓ passed (34.4s)
md5: d9cdb790b6cf2d8b4b92b59dbb54ef06
Go to https://my-testing-repo-main.vercel.app/zendesk/macro-application?reset=true and verify ticket "#1043 · Charged twice for September" with fields Type "-", Priority "Normal", Status "Open", Tags "web" and an empty reply box.

## Apply the macro ✓ passed (36.4s)
md5: c82c7d036cee5e3dc17326f99d3d53f6
Select "Billing: Refund processed" in the "Apply macro…" dropdown, click "Apply", and verify the message "Macro applied: Billing: Refund processed".

## Verify fields and reply ✓ passed (30.8s)
md5: 2b5f8f7ed0f27d2d2f90035d545bc690
Verify Type reads "Question", Priority "Low", Status "Solved", Tags "web, billing, refund", and the reply box begins with "Hi Maria," and mentions "a refund of $49.00".
