---
test: ../card-transaction-feed_test.md
status: passed
started: 2026-09-12T14:07:13.272Z
duration_s: 170
session_id: cf6a7bb9-fad9-40f7-9d1c-3d791d351dd2
---

# Venmoo 22.4: Card transaction feed — Result

## Open the card feed ✓ passed (24.7s)
md5: ee2b23de3e34043fd75a2f86f4a8732f
Go to https://my-testing-repo-main.vercel.app/venmo/card-transaction-feed?reset=true and verify "Cashback earned this month" reads "$1.45" and one transaction "You paid Trailhead Outfitters" tagged "3% cashback".

## Simulate a purchase ✓ passed (17.7s)
md5: c1adf211f3ee81811e17aa519e43d81c
Click "Simulate a $22.00 card purchase at Bean There Coffee".

## Verify the new transaction ✓ passed (31.1s)
md5: f26eb73d2e53c75b6f82ccd04ce9a0fe
Verify the top transaction reads "You paid Bean There Coffee" for "−$22.00" with the tag "3% cashback" and the note "Venmoo Debit Card", and cashback now reads "$2.11".
