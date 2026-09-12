---
test: ../personalized-item_test.md
status: passed
started: 2026-09-11T16:22:55.025Z
duration_s: 321
session_id: 8e236764-eb27-4150-a387-7043c20325b9
---

# Etsily 5.1: Personalized item purchase — Result

## Open the listing ✓ passed (39s)
md5: 2b25ffb0aa99a0b5f87306f4abbec990
Go to https://my-testing-repo-main.vercel.app/etsy/personalized-item?reset=true and verify the listing "Custom Name Ceramic Mug" from "ClayWorks Studio" is shown with a required "Add your personalization" field.

## Try adding without text ✓ passed (35s)
md5: c028b65dfbbadab63dd71389143b48b2
Click "Add to cart" and verify the message "Personalization is required for this item." is shown.

## Add with personalization ✓ passed (52.6s)
md5: 72cac805b0ccbf54580173f79d74de01
Type "Grandma Jo" into the personalization field, click "Add to cart", and verify the cart shows "Custom Name Ceramic Mug" with "Personalization: “Grandma Jo”".

## Check out ✓ passed (61.9s)
md5: 3b091b588817532c86c08c57949a8d6c
Click "Proceed to checkout", click "Continue to payment", type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify "Order placed" is shown.

## Verify order details ✓ passed (129.5s)
md5: 2f88d9275467ffa443039aec7d270657
Verify the confirmation shows "Personalization" as "Grandma Jo" and the item line also reads "Personalization: “Grandma Jo”".
