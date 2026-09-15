---
test: ../checkout-extension_test.md
status: passed
started: 2026-09-15T09:25:01.674Z
duration_s: 226
session_id: 97cf2ed1-e295-46f7-988b-48f0c5fce967
---

# Shoplify 2.3: Checkout extension render — Result

## Reach the checkout ✓ passed (59s)
md5: 173b996f9f8087d0b318ca20bb41017b
Click "Add to cart" on "Enamel Camp Mug", click "View cart", click "Checkout", and verify the checkout page is shown with a "Payment" section.

## Confirm the extension block rendered ✓ passed (27.9s)
md5: 335829725ac5d7ebfbaea868d2bddf28
Verify an "Order details" card is shown containing the badge "Checkout extension · Alder Add-ons v1.4" and a custom field labelled "Delivery instructions".

## Use the custom field ✓ passed (29.1s)
md5: 00de7f28433f1621ff3b424a62ef8f6f
Type "Leave at the side door" into "Delivery instructions" and verify the field contains "Leave at the side door".

## Take the upsell ✓ passed (40s)
md5: a0fed085d77632045c793ed23d182f56
Click the "Add gift wrapping — $4.50" checkbox and verify the order summary now lists "Gift wrapping × 1" at "$4.50".

## Confirm payment still works after the extension ✓ passed (67.1s)
md5: 234fbb0af5ca9529bcfad80b28c72331
Type "4242 4242 4242 4242" into "Card number", "12 / 34" into Expiration, "123" into CVC, click the Pay button, and verify the page shows "Thank you for your order!" with a "Delivery instructions" card reading "Leave at the side door".
