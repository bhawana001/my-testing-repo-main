---
test: ../card-freeze_test.md
status: passed
started: 2026-09-14T10:23:13.307Z
duration_s: 140
session_id: c3666e06-ed48-4f2f-83f8-2f176ffb07a9
---

# Revolute 19.1: Card freeze unfreeze — Result

## Open the card ✓ passed (6.6s)
md5: 25fe58657db01383a3409677dfe42fd8
Go to https://my-testing-repo-main.vercel.app/revolut/card-freeze?reset=true and verify the virtual card ending "8841" shows the status badge "Active" and a "Freeze card" switch that is off.

## Freeze ✓ passed (14.89s)
md5: 8ab3eb3613c41335d3adefde154dfbf4
Click the "Freeze card" switch and verify the status badge changes to "Frozen" and the help text says purchases will be declined.

## Attempt a purchase while frozen ✓ passed (39.8s)
md5: a87f43318421f5257b10b6523a5cc582
Click "Simulate a $23.50 purchase at Metro Grocer" and verify a new transaction "You paid Metro Grocer" appears at the top of Recent transactions tagged "Declined" with the note "Declined · card frozen".

## Unfreeze ✓ passed (44.5s)
md5: 91cbdd634a098196bbdd9dd549a1eeb9
Click the "Freeze card" switch again and verify the status badge reads "Active".

## Verify the card works again ✓ passed (31.7s)
md5: b48fd94841fd3d0b3add404328be97b5
Click "Simulate a $23.50 purchase at Metro Grocer" and verify the newest transaction is tagged "Approved" with the note "Card purchase".
