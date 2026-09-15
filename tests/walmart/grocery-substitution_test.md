---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart-clone-app?reset=true
max_steps: 45
tags: [walmart, e-commerce, grocery]
---

# Wallmark 4.2: Grocery substitution

Catalog objective: add groceries, set a substitution preference on one item, and place the order.
Key assertion: the substitution preference is saved on that item.

## Add two grocery items
Click "Add to cart" on "Whole Milk, 1 gal", click "Add to cart" on "Honey Wheat Bread", and verify the cart shows both items.

## Set a substitution preference
Select "Same brand only" in the "If this item is out of stock" dropdown for "Whole Milk, 1 gal" and verify a badge appears reading "Preference saved: Same brand only".

## Go to checkout and choose a slot
Click "Continue to checkout", click "Today, 6pm – 7pm", and verify the order summary shows the pickup slot "Today, 6pm – 7pm".

## Place the order
Click "Place order" and verify the confirmation shows "Order placed" with an order number starting with "W-".

## Confirm the preference survived the order
Verify the "Substitution preferences" card shows "Whole Milk, 1 gal" with "Same brand only" and "Honey Wheat Bread" with "Pick the best available match".
