---
test: ../snkrs-draw_test.md
status: passed
started: 2026-09-15T10:44:50.503Z
duration_s: 194
session_id: 2b92806a-b9b7-4236-aa50-668a0ace9d6a
---

# Nyke 8.3: SNKRS draw entry — Result

## Confirm the launch product ✓ passed (31.6s)
md5: 10421be4cb72f40db7c91263cafb5416
Verify the launch page shows "Nyke Air Meridian 'First Light'" at "$210.00" with a badge reading "Draw closes September 20, 2026 at 9:00 AM".

## Confirm entry requires membership ✓ passed (24.6s)
md5: 4756331275e95168251127ce1c9a120a
Click "Enter draw" and verify an error appears reading "Sign in to your Nyke account to enter."

## Sign in ✓ passed (56.9s)
md5: e6f544252b45d7d087959558a149ac46
Click "Sign in", type "priya.nair@example.com" into Email, type "member2026" into Password, and click "Sign in", then verify a "Member" badge is shown.

## Confirm a size is required ✓ passed (27s)
md5: 2f03e608822041bb73baf51804315b7c
Click "Enter draw" and verify an error appears reading "Choose the size you want."

## Enter the draw ✓ passed (51.1s)
md5: f92f33fe82e2a3cedb9b7fa58208b656
Click "US 10", click "Enter draw", and verify the page shows "You're in the draw" with an entry id starting with "DRAW-", status "Entered — awaiting draw" and size "US 10".
