---
mode: testing
url: https://my-testing-repo-main.vercel.app/shop-clone-app/dp/sku_headset?reset=true
max_steps: 40
tags: [amazon, e-commerce, checkout]
---

# ShopKart 1.3: One-click checkout

Catalog objective: buy an item with saved payment details in one click.
Key assertion: order number is shown without entering card details.

## Confirm the 1-Click settings are shown
Verify the buy box shows "📍 Home — 418 Maple Street, Austin" and "💳 Visa ending in 4242".

## Buy with one click
Click "Buy Now" and verify the page shows "Order placed, thank you!" with a heading containing "Order placed".

## Confirm the order number and charge
Verify the confirmation shows an order number starting with "112-" and text reading "Charged" with "Visa ending in 4242".
