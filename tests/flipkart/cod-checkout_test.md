---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart-clone-app?reset=true
max_steps: 45
tags: [flipkart, e-commerce, cod]
---

# Flipkort 3.3: COD checkout

Catalog objective: complete a checkout choosing cash on delivery.
Key assertion: confirmation shows COD as the payment mode.

## Add an item to the cart
Type "running shoes" into the search box, click "Search", click "Trailburst Running Shoes", click size "8", then click "Add to cart" and verify the cart shows "Trailburst Running Shoes".

## Go to checkout
Click "Place order" and verify the checkout page shows a "Payment mode" section listing "Cash on Delivery".

## Choose cash on delivery
Click "Cash on Delivery" and verify the price details show a "COD handling fee" of "₹25.00" and a total payable of "₹2,564.00".

## Confirm the order
Click "Confirm COD order" and verify the page shows "Order confirmed" with a payment mode of "Cash on Delivery" and an order status of "Confirmed — pay on delivery".
