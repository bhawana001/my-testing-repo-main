---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart-clone-app?reset=true
max_steps: 45
tags: [walmart, e-commerce, pickup]
---

# Wallmark 4.1: Store pickup selection

Catalog objective: add an item, choose free pickup at a nearby store, and reach checkout.
Key assertion: pickup store and time slot are shown in the order summary.

## Add a grocery item
Click "Add to cart" on "Whole Milk, 1 gal" and verify the cart shows "Whole Milk, 1 gal" with a subtotal of "$3.64".

## Open checkout
Click "Continue to checkout" and verify the checkout page shows "Free pickup at store" selected and a "Pickup store" section.

## Choose a nearby store
Select "Wallmark Neighborhood Market — Ben White · 3.8 mi" as the pickup store and verify the store address shows "710 E Ben White Blvd, Austin TX".

## Choose a free pickup slot
Click "Today, 4pm – 5pm" and verify the order summary shows a pickup fee of "Free".

## Confirm the summary carries store and slot
Verify the order summary shows the pickup store "Wallmark Neighborhood Market — Ben White" and the pickup slot "Today, 4pm – 5pm".
