---
test: ../cart-exchange-offer_test.md
status: passed
started: 2026-09-15T09:42:15.328Z
duration_s: 233
session_id: 837d68e8-4441-4a32-b0bc-06722bc264c1
---

# Flipkort 3.2: Cart with exchange offer — Result

## Find a phone with an exchange offer ✓ passed (43.2s)
md5: bb81f5b6f1c8f91df6d192c9e842a031
Type "phone" into the search box, click "Search", and verify the results list "Nexa 12 Pro 5G (256 GB)".

## Open the phone and add it to the cart ✓ passed (72.2s)
md5: 8089250181ae6ba5a273d504d35dc34d
Click "Nexa 12 Pro 5G (256 GB)", click "Add to cart", and verify the cart shows "Nexa 12 Pro 5G (256 GB)" with a price of "₹48,999.00".

## Open the exchange offer ✓ passed (30.2s)
md5: 3ffa60077ac259762f98543eda46886b
Click "Check exchange offer" and verify a dialog appears titled "Exchange your old phone" with a device dropdown.

## Apply the exchange valuation ✓ passed (55.6s)
md5: daf24c7b5031361f811046474c62e349
Select "Nexa 10 (128 GB)" as the device, click the "Good — no cracks, all functions work" option, click the Apply button, and verify the cart shows an exchange value of "−₹9,500.00".

## Confirm the cart arithmetic ✓ passed (28.7s)
md5: 4d1ad0cbf19f5fb4fec9e5c80a773bd0
Verify the price details show "₹48,999.00" for the item, an exchange discount of "−₹9,500.00", Delivery "Free", and a total payable of "₹39,499.00".
