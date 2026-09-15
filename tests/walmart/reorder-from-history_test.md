---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart-clone-app/orders?reset=true
max_steps: 40
tags: [walmart, reorder]
---

# Wallmark 4.4: Reorder from history

Catalog objective: reorder a past purchase in two clicks from order history.
Key assertion: the cart is prefilled with the previous items.

## Confirm the purchase history
Verify the history shows order "W-2208145" with status "Picked up" and a total of "$24.07".

## Reorder the past purchase
Click "Reorder (3 items)" on order "W-2208145" and verify the storefront cart shows "Whole Milk, 1 gal", "Honey Wheat Bread" and "Large Eggs, 12 ct".

## Confirm the quantities came across
Verify the cart shows a quantity of "2" for "Whole Milk, 1 gal" and "3" for "Large Eggs, 12 ct", with a subtotal of "$19.12".
