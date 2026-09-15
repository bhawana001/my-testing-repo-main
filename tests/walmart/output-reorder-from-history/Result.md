---
test: ../reorder-from-history_test.md
status: passed
started: 2026-09-15T10:02:45.161Z
duration_s: 120
session_id: 098b23f0-d159-4a41-9515-af2a757d3163
---

# Wallmark 4.4: Reorder from history — Result

## Confirm the purchase history ✓ passed (33.5s)
md5: 4895a60a27c738330268341fca61bfdd
Verify the history shows order "W-2208145" with status "Picked up" and a total of "$24.07".

## Reorder the past purchase ✓ passed (43.2s)
md5: 8be384e792655eade47ddcdca9993682
Click "Reorder (3 items)" on order "W-2208145" and verify the storefront cart shows "Whole Milk, 1 gal", "Honey Wheat Bread" and "Large Eggs, 12 ct".

## Confirm the quantities came across ✓ passed (39.4s)
md5: 5386fc3f239586cefb46e4eccb805fa0
Verify the cart shows a quantity of "2" for "Whole Milk, 1 gal" and "3" for "Large Eggs, 12 ct", with a subtotal of "$19.12".
