---
test: ../cart-exchange-offer_test.md
status: passed
started: 2026-09-11T16:03:50.608Z
duration_s: 119
session_id: ba9f07ea-8cdb-4bcd-b04c-08b1c0c162e9
---

# Flipmart 3.2: Cart with exchange offer — Result

## Open the cart ✓ passed (41.3s)
md5: dd1484226510e6806861fa7c57d62046
Go to https://my-testing-repo-main.vercel.app/flipkart/cart-exchange-offer?reset=true and verify the cart contains "Nova X2 Smartphone 128GB" at "₹24,999.00", an "Exchange offer" badge, and the "Total amount" row reads "₹25,039.00" (price + ₹40.00 delivery).

## Choose the exchange phone ✓ passed (44.5s)
md5: ed3a9dca996e801f5ea09c9ed9826682
Select "Nova X1 (128GB) · good condition · ₹6,500.00 off" in the "Old phone for exchange" dropdown and verify the text "Exchange value: ₹6,500.00" appears under the item.

## Verify the cart math ✓ passed (29.5s)
md5: 72702890fb8bdf58c086af188f3b1ba1
Verify an "Exchange deduction" row reads "−₹6,500.00" and the "Total amount" row reads "₹18,539.00" (₹24,999.00 − ₹6,500.00 + ₹40.00 delivery).
