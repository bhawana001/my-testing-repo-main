---
test: ../offers-enrollment_test.md
status: passed
started: 2026-09-13T12:38:38.461Z
duration_s: 127
session_id: ddd833ab-3cc5-4d1e-bafa-c4d9f548df91
---

# Amerix 25.4: Offers enrollment — Result

## Open offers ✓ passed (38.2s)
md5: 5c611c34eba1231e38902795df90a156
Go to https://my-testing-repo-main.vercel.app/american-express/offers-enrollment?reset=true and verify four offers are listed including "Trailhead Outfitters" ("Get 10% back on purchases, up to $30") with an "Add to Card" button, and the text "0 offers added to Card".

## Add an offer ✓ passed (43s)
md5: f3a72d0009e9b32cbd1479499f2c155d
Click "Add to Card" on the "Trailhead Outfitters" offer and verify that offer now shows "✓ Added to Card" and the text reads "1 offer added to Card".

## Verify it persists ✓ passed (44.3s)
md5: fe096d1355c1874fd3411c6adde8e30d
Reload the page without the reset parameter and verify "Trailhead Outfitters" still shows "✓ Added to Card".
