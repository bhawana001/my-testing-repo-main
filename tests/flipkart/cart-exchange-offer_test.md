---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart/cart-exchange-offer?reset=true
max_steps: 40
tags: [flipkart, e-commerce, checkout]
---

# Flipmart 3.2: Cart with exchange offer

Catalog objective: add a phone with an exchange offer and verify the exchange discount in the cart.
Key assertion: the cart math includes the exchange deduction correctly.

## Open the cart
Go to https://my-testing-repo-main.vercel.app/flipkart/cart-exchange-offer?reset=true and verify the cart contains "Nova X2 Smartphone 128GB" at "₹24,999.00", an "Exchange offer" badge, and the "Total amount" row reads "₹25,039.00" (price + ₹40.00 delivery).

## Choose the exchange phone
Select "Nova X1 (128GB) · good condition · ₹6,500.00 off" in the "Old phone for exchange" dropdown and verify the text "Exchange value: ₹6,500.00" appears under the item.

## Verify the cart math
Verify an "Exchange deduction" row reads "−₹6,500.00" and the "Total amount" row reads "₹18,539.00" (₹24,999.00 − ₹6,500.00 + ₹40.00 delivery).
