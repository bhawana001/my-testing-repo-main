---
test: ../meeting-registration_test.md
status: passed
started: 2026-09-14T11:03:24.640Z
duration_s: 273
session_id: fb9a49ed-17e4-4ea2-b10c-110fe9ed9687
---

# Zoomly 37.1: Meeting schedule with registration — Result

## Schedule ✓ passed (65.3s)
md5: 4adce63bdc04fd6af73c4aae8a41015a
Go to https://my-testing-repo-main.vercel.app/zoom/meeting-registration?reset=true, type "Product launch webinar" into Topic, keep "Registration required" checked, click "Save", and verify Registration "Required" and a registration link "https://zoomly.test/meeting/register/8512204".

## Open the registration link ✓ passed (38.3s)
md5: be5b0dda5f95b88d61f74fb8e074a347
Click "Open registration link" and verify a registration form for "Product launch webinar".

## Incomplete registration ✓ passed (41s)
md5: 1d1840a2bd9e02a19dca3c95583f7c43
Type "Sam" into First name, click "Register", and verify "First name, last name and a valid email are required."

## Complete registration ✓ passed (92.9s)
md5: 8acc0aab34cb1f1e64d71c91e497f968
Type "Lee" into Last name and "sam@acme.test" into Email, click "Register", and verify "Registration approved" with "You're registered, Sam!" and a join link.

## Verify on the host side ✓ passed (33.6s)
md5: 708785f97c344391534c17dd3c2f0d91
Click "Back to meeting (host)" and verify "Registrants" reads 1.
