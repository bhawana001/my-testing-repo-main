---
mode: testing
url: https://my-testing-repo-main.vercel.app/shop-clone-app/dp/sku_headset?reset=true
max_steps: 40
tags: [amazon, e-commerce, variant]
---

# ShopKart 1.2: Add to cart with variant

Catalog objective: pick a size and colour variant and add to cart.
Key assertion: cart shows the exact variant chosen.

## Switch colour to Arctic White
Click "Arctic White" and verify the price reads "$84.99" and the selection reads "Selected: Arctic White · Wireless".

## Switch connection to Wired
Click "Wired" and verify the price reads "$69.99" and the selection reads "Selected: Arctic White · Wired".

## Add the chosen variant to the cart
Click "Add to Cart" and verify a confirmation appears reading "Added to Cart: 1 × Wireless Gaming Headset 7.1 (Arctic White · Wired) at $69.99".
