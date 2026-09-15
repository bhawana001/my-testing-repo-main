---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy-clone-app?reset=true
max_steps: 45
tags: [etsy, marketplace, shipping]
---

# Etsi 5.3: Cart with multiple sellers

Catalog objective: add items from two shops and verify shipping is calculated per shop.
Key assertion: two shipping lines with separate totals.

## Add an item from the first shop
Click "Hand-thrown Speckled Mug", click "Add to cart", and verify the cart badge shows one item.

## Add an item from a second shop
Click "Back to search", click "Letterpress Card Set of 6", click "Add to cart", and verify the cart now holds two items.

## Open the cart
Click the "Cart" link in the header and verify the cart shows "2 shops in this order" with groups for "KilnAndClay" and "PaperPressCo".

## Confirm per-shop shipping
Verify the cart shows "Shipping from KilnAndClay" at "$5.50" and "Shipping from PaperPressCo" at "$3.25".

## Confirm the combined totals
Verify the order total panel shows Items "$52.00", Total shipping "$8.75" and a Total of "$60.75".
