---
test: ../personalized-item_test.md
status: failed
started: 2026-09-15T10:05:02.023Z
duration_s: 157
session_id: 18806767-f8d2-4be7-a8da-10ee69aae11e
---

# Etsi 5.1: Personalized item purchase — Result

## Open a personalizable listing ✓ passed (62.7s)
md5: 739c1d27004f4b87137b6850430cb5bd
Click "Custom Name Letterpress Print" and verify the listing page shows the price "$42.00" and a field labelled "Name to print (max 20 characters)".

## Confirm personalization is required ✓ passed (31.3s)
md5: 5c539eefc36eec95892dfd24cbabbbdd
Click "Add to cart" without entering text and verify an error appears reading "This item requires personalization before it can be added."

## Enter the personalization ✗ failed (59.1s)
md5: 03749e62a9c17b9c4b742be6c87caa25
Reason: Final verification failed: "the cart shows a badge reading "Personalization: “Priya & Marco”"" — bug verdict: Cart badge checked without opening the cart [automation_bug/agent_misstep, confidence 0.98]
Type "Priya & Marco" into the personalization field, click "Add to cart", and verify the cart shows a badge reading "Personalization: “Priya & Marco”".

## Check out ✓ passed (—)
md5: 3b091b588817532c86c08c57949a8d6c
Click "Proceed to checkout" and verify the confirmation shows "Order placed" with an order number starting with "ET-".

## Confirm the text carried into the order ✓ passed (—)
md5: 2f88d9275467ffa443039aec7d270657
Verify the confirmation lists "Custom Name Letterpress Print" with "Personalization: “Priya & Marco”".
