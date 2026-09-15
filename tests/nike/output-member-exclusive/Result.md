---
test: ../member-exclusive_test.md
status: failed
started: 2026-09-15T10:42:41.135Z
duration_s: 122
session_id: bc92a41e-5e7a-413c-932e-5fcf2fcdcf41
---

# Nyke 8.2: Member exclusive access — Result

## Confirm the product is gated when signed out ✓ passed (34.6s)
md5: b04fc81c8762e035ad07a3906fcd4870
Click "Nyke Flyknit Elite — Member Exclusive" and verify the page shows "Members only" and a "Sign in to unlock" button instead of sizes.

## Sign in as a member ✓ passed (40s)
md5: 3ec81baf6b9a873407a1a66dd60594c5
Click "Sign in to unlock", type "priya.nair@example.com" into Email, type "member2026" into Password, click "Sign in", and verify a welcome confirmation appears.

## Confirm the product unlocked ✗ failed (43.2s)
md5: d5402035508eca37177c312610d6a3a0
Reason: Final verification failed: "the product page now shows a size grid and a "📏 Size guide" button rather than the members-only notice" — bug verdict: Final assertion misclassifies available member product [automation_bug/config_issue, confidence 0.93]
Verify the product page now shows a size grid and a "📏 Size guide" button rather than the members-only notice.

## Confirm it is buyable ✓ passed (—)
md5: a7a8c18ac7e4280a0fd133a854a7724a
Click size "US 10" and verify the "Add to Bag" button is enabled and a badge reads "Selected: US 10".
