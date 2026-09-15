---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify-clone-app?reset=true
max_steps: 45
tags: [shopify, e-commerce, extension]
---

# Shoplify 2.3: Checkout extension render

Catalog objective: proceed through checkout and confirm custom fields and the upsell block appear.
Key assertion: the extension renders without breaking the payment step.

## Reach the checkout
Click "Add to cart" on "Enamel Camp Mug", click "View cart", click "Checkout", and verify the checkout page is shown with a "Payment" section.

## Confirm the extension block rendered
Verify an "Order details" card is shown containing the badge "Checkout extension · Alder Add-ons v1.4" and a custom field labelled "Delivery instructions".

## Use the custom field
Type "Leave at the side door" into "Delivery instructions" and verify the field contains "Leave at the side door".

## Take the upsell
Click the "Add gift wrapping — $4.50" checkbox and verify the order summary now lists "Gift wrapping × 1" at "$4.50".

## Confirm payment still works after the extension
Type "4242 4242 4242 4242" into "Card number", "12 / 34" into Expiration, "123" into CVC, click the Pay button, and verify the page shows "Thank you for your order!" with a "Delivery instructions" card reading "Leave at the side door".
