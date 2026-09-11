---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy/personalized-item?reset=true
max_steps: 40
tags: [etsy, e-commerce, checkout]
---

# Etsily 5.1: Personalized item purchase

Catalog objective: buy an item requiring personalization text, enter custom text, check out.
Key assertion: the personalization text is visible in the order details.

## Open the listing
Go to https://my-testing-repo-main.vercel.app/etsy/personalized-item?reset=true and verify the listing "Custom Name Ceramic Mug" from "ClayWorks Studio" is shown with a required "Add your personalization" field.

## Try adding without text
Click "Add to cart" and verify the message "Personalization is required for this item." is shown.

## Add with personalization
Type "Grandma Jo" into the personalization field, click "Add to cart", and verify the cart shows "Custom Name Ceramic Mug" with "Personalization: “Grandma Jo”".

## Check out
Click "Proceed to checkout", click "Continue to payment", type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify "Order placed" is shown.

## Verify order details
Verify the confirmation shows "Personalization" as "Grandma Jo" and the item line also reads "Personalization: “Grandma Jo”".
