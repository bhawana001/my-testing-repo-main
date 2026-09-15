---
test: ../sequence-enrollment_test.md
status: passed
started: 2026-09-13T13:12:24.051Z
duration_s: 100
session_id: 2a72ef35-bcb2-42a2-8617-c225d37a1a88
---

# HubSpotty 29.3: Email sequence enrollment — Result

## Open the contact ✓ passed (24.4s)
md5: 8a66f156030041f9adbe9cc4127691f9
Go to https://my-testing-repo-main.vercel.app/hubspot/sequence-enrollment?reset=true and verify the contact "Maria Chen" shows "Not enrolled in any sequence." and a timeline starting with "Contact created".

## Enroll ✓ passed (30.3s)
md5: 8a01f15823136be95340529325d9d7ee
Click "Enroll in sequence", keep "Inbound demo follow-up · 4 steps" selected, click "Enroll", and verify the badge "Sequence active" appears.

## Verify the timeline ✓ passed (44s)
md5: 510bfb0f0ec20b0d0d6a5e6ae1c9a763
Verify the sequence panel shows "Inbound demo follow-up", step "1 of 4" and next email "Sep 15, 2026 · 9:00 AM", and the top timeline entry reads "Enrolled in sequence: Inbound demo follow-up".
