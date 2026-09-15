---
test: ../lead-callback_test.md
status: passed
started: 2026-09-13T12:50:46.112Z
duration_s: 140
session_id: 6cb21f41-ef56-4207-9e4d-9dfe94a84e89
---

# PolicyMart 27.2: Lead form to callback — Result

## Invalid mobile ✓ passed (47.2s)
md5: 67e2334ef5061b729174a86b749e0bea
Go to https://my-testing-repo-main.vercel.app/policybazaar/lead-callback?reset=true, choose "Term life insurance", type "Demo User" into Full name and "12345" into Mobile number, click "Continue", and verify "Enter a valid 10-digit Indian mobile number."

## Fix and consent ✓ passed (39.1s)
md5: 503792a0bb0757769c160108a9834f66
Change the mobile to "9876543210", check "I agree to receive a call from an advisor", click "Continue", and verify the step "When should we call?"

## Pick a slot ✓ passed (22.3s)
md5: a485b5252aed6e0085f28844d6d485ba
Choose "Tomorrow, 10:00–11:00 AM" and click "Request callback".

## Verify the callback promise ✓ passed (29.7s)
md5: 8befdd1f60bcdbaa54046dac5a2ffcec
Verify the badge "Callback scheduled", "Thanks Demo User! An advisor will call you.", "When" reading "Tomorrow, 10:00–11:00 AM", reference "LD-3210-0914", and the text "Our certified advisor will call you within your chosen slot."
