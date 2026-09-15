---
test: ../grocery-substitution_test.md
status: passed
started: 2026-09-15T09:56:27.554Z
duration_s: 184
session_id: 04cca968-be2a-42ba-9d1b-1f60e6300731
---

# Wallmark 4.2: Grocery substitution — Result

## Add two grocery items ✓ passed (41.7s)
md5: a4125fee8c60e3b1a45d4896d3737b07
Click "Add to cart" on "Whole Milk, 1 gal", click "Add to cart" on "Honey Wheat Bread", and verify the cart shows both items.

## Set a substitution preference ✓ passed (40.6s)
md5: 61f8ae05f6be363e4a59908869c5ba82
Select "Same brand only" in the "If this item is out of stock" dropdown for "Whole Milk, 1 gal" and verify a badge appears reading "Preference saved: Same brand only".

## Go to checkout and choose a slot ✓ passed (40.3s)
md5: 4e34dca9fc7a5f4f2502a9318a47da1b
Click "Continue to checkout", click "Today, 6pm – 7pm", and verify the order summary shows the pickup slot "Today, 6pm – 7pm".

## Place the order ✓ passed (33s)
md5: ee8c386251a38b14f9fe4d7be5aa0f1d
Click "Place order" and verify the confirmation shows "Order placed" with an order number starting with "W-".

## Confirm the preference survived the order ✓ passed (25s)
md5: 46054da63cdfde2b6531d9378c967b9e
Verify the "Substitution preferences" card shows "Whole Milk, 1 gal" with "Same brand only" and "Honey Wheat Bread" with "Pick the best available match".
