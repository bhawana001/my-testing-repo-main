---
test: ../reschedule_test.md
status: passed
started: 2026-09-13T19:05:02.848Z
duration_s: 112
session_id: 48b9c6f7-d9df-4c22-8751-c798a0b08d7c
---

# Calendlee 46.3: Reschedule flow — Result

## Open the confirmation email ✓ passed (17.7s)
md5: f9893fe91a66012538489aca87ff4ac0
Go to https://my-testing-repo-main.vercel.app/calendly/reschedule?reset=true and verify the email "Confirmed: 30 Minute Meeting with Priya Nair" shows "9:00am · Tuesday, September 15, 2026 (Eastern)".

## Reschedule ✓ passed (35.5s)
md5: 31a368d5809c87c9563f12627331f357
Click "Reschedule", click September 16, click the "2:00pm" slot, and verify a "Confirm new time" button appears.

## Confirm ✓ passed (30.4s)
md5: 24d737beea34cd236561d1756f84c575
Click "Confirm new time" and verify "Rescheduled" with New time "2:00pm · Wednesday, September 16, 2026" and Previous time "9:00am · Tuesday, September 15, 2026".

## Verify the old slot was freed ✓ passed (26.2s)
md5: 20dc37c3b07f7de251151838cce037eb
Click "Check availability on the old day" and verify September 15 now offers the "9:00am" slot again.
