---
test: ../transfer-tracking_test.md
status: passed
started: 2026-09-13T11:34:29.560Z
duration_s: 139
session_id: 9ad0d876-cb28-4a9c-b79e-7877ebe0c328
---

# Wyse 15.3: Transfer status tracking — Result

## Open activity ✓ passed (28.2s)
md5: eb8efbc7e421943f7af0c832392ad749
Go to https://my-testing-repo-main.vercel.app/wise/transfer-tracking?reset=true and verify the Activity list shows a transfer "To Asha Rao" with status "In progress" and amount "−$1,000.00".

## Open the transfer ✓ passed (40s)
md5: e98fb95105fafd7f2465748e3f627557
Click the "To Asha Rao" row and verify the detail shows "$1,000.00 to Asha Rao", the status badge "In progress" and a timeline with the steps "Transfer set up", "We received your USD", "Your money's being processed", "Sent to Asha's bank" and "Asha received the money".

## Verify the current step ✓ passed (29.5s)
md5: 48bfc01f27f508cc41d0a030b40948a0
Verify the first two steps are marked complete, the text "Current step: Your money's being processed" is shown, and that step displays "Converted at 1 USD = 83.20 INR".

## Advance and re-verify ✓ passed (39.7s)
md5: de3baee0ab6cb032fefc130c1c824294
Click "Simulate next update" and verify the text now reads "Current step: Sent to Asha's bank" and the status badge reads "Sent".
