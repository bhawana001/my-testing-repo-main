---
test: ../cod-checkout_test.md
status: passed
started: 2026-09-15T09:46:31.154Z
duration_s: 179
session_id: 89f38865-4867-4cbb-86d6-71f84554dd1c
---

# Flipkort 3.3: COD checkout — Result

## Add an item to the cart ✓ passed (51.4s)
md5: ed5285972cd8255b8687e19c26b2bd3f
Type "running shoes" into the search box, click "Search", click "Trailburst Running Shoes", click size "8", then click "Add to cart" and verify the cart shows "Trailburst Running Shoes".

## Go to checkout ✓ passed (36.5s)
md5: 5f6d47df5841d82aba28bb53e1bd2b50
Click "Place order" and verify the checkout page shows a "Payment mode" section listing "Cash on Delivery".

## Choose cash on delivery ✓ passed (47.1s)
md5: 379f2002dacafed22440b6cbffee7418
Click "Cash on Delivery" and verify the price details show a "COD handling fee" of "₹25.00" and a total payable of "₹2,564.00".

## Confirm the order ✓ passed (40.6s)
md5: 91b5ede54e61528b0b0f6c10a287bec1
Click "Confirm COD order" and verify the page shows "Order confirmed" with a payment mode of "Cash on Delivery" and an order status of "Confirmed — pay on delivery".
