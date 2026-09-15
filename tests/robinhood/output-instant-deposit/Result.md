---
test: ../instant-deposit_test.md
status: passed
started: 2026-09-14T10:18:50.759Z
duration_s: 185
session_id: 175bb0c8-8dc5-4d76-972b-2408dd560e7f
---

# Robinhoot 16.4: Instant deposit flow — Result

## Open deposit ✓ passed (38.6s)
md5: 5e5b500226d3e90e2345ca3776925272
Go to https://my-testing-repo-main.vercel.app/robinhood/instant-deposit?reset=true and verify "Buying power" in the top bar reads "$250.00" and the "Deposit funds" step shows From "Chaise Checking •••• 4821".

## Enter the amount ✓ passed (52.3s)
md5: 08a7e6c4518225002ce3f911bfad0b64
Type "500" into Amount, click "Continue", and verify the review step lists "500".

## Deposit ✓ passed (37.1s)
md5: 428dc6dce0781ec734fd337dc759119b
Click "Deposit" and verify "$500.00 available instantly" with the badge "Deposit initiated".

## Verify buying power ✓ passed (54.1s)
md5: a07e3424a09776f10c65533c377c55ea
Verify "Buying power before" reads "$250.00", "Buying power now" reads "$750.00", and the top bar "Buying power" reads "$750.00".
