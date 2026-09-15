---
test: ../form-view-submission_test.md
status: passed
started: 2026-09-15T06:52:27.963Z
duration_s: 133
session_id: f7a07569-9f47-4911-841e-1ea1dbd7e09e
---

# Airtably 39.2: Form view submission — Result

## Invalid email ✓ passed (46s)
md5: d8446b975c8b921632610a1ec8a1f75a
Go to https://my-testing-repo-main.vercel.app/airtable/form-view-submission?reset=true, type "Sam Lee" into Name and "sam@acme" into Email, choose rating 5, click "Submit", and verify "Please enter a valid email."

## Submit ✓ passed (43.5s)
md5: fd5f5a196b84cd67f3f194345bda0e2f
Change Email to "sam@acme.test", type "Great onboarding." into Feedback, click "Submit", and verify "Thanks for submitting the form!"

## Verify the new record ✓ passed (40s)
md5: 07db61b45a577022f481913814324e25
Click "Grid view" and verify "2 records" with a new row "rec-2", "Sam Lee", "sam@acme.test", "5 ★", "Great onboarding." and source "Form".
