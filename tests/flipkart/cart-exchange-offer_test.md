---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart-clone-app?reset=true
max_steps: 45
tags: [flipkart, e-commerce, exchange]
---

# Flipkort 3.2: Cart with exchange offer

Catalog objective: add a phone with an exchange offer and verify the exchange discount in the cart.
Key assertion: cart maths include the exchange deduction correctly.

## Find a phone with an exchange offer
Type "phone" into the search box, click "Search", and verify the results list "Nexa 12 Pro 5G (256 GB)".

## Open the phone and add it to the cart
Click "Nexa 12 Pro 5G (256 GB)", click "Add to cart", and verify the cart shows "Nexa 12 Pro 5G (256 GB)" with a price of "₹48,999.00".

## Open the exchange offer
Click "Check exchange offer" and verify a dialog appears titled "Exchange your old phone" with a device dropdown.

## Apply the exchange valuation
Select "Nexa 10 (128 GB)" as the device, click the "Good — no cracks, all functions work" option, click the Apply button, and verify the cart shows an exchange value of "−₹9,500.00".

## Confirm the cart arithmetic
Verify the price details show "₹48,999.00" for the item, an exchange discount of "−₹9,500.00", Delivery "Free", and a total payable of "₹39,499.00".
