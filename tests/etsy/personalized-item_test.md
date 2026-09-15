---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy-clone-app?reset=true
max_steps: 45
tags: [etsy, marketplace, personalization]
---

# Etsi 5.1: Personalized item purchase

Catalog objective: buy an item requiring personalization text, enter the custom text, and check out.
Key assertion: the personalization text is visible in the order details.

## Open a personalizable listing
Click "Custom Name Letterpress Print" and verify the listing page shows the price "$42.00" and a field labelled "Name to print (max 20 characters)".

## Confirm personalization is required
Click "Add to cart" without entering text and verify an error appears reading "This item requires personalization before it can be added."

## Enter the personalization
Type "Priya & Marco" into the personalization field, click "Add to cart", and verify the cart shows a badge reading "Personalization: “Priya & Marco”".

## Check out
Click "Proceed to checkout" and verify the confirmation shows "Order placed" with an order number starting with "ET-".

## Confirm the text carried into the order
Verify the confirmation lists "Custom Name Letterpress Print" with "Personalization: “Priya & Marco”".
