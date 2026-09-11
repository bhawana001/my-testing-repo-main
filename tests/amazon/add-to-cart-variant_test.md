---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/add-to-cart-variant?reset=true
max_steps: 30
tags: [amazon, e-commerce, checkout]
---

# Amazonia 1.2: Add to cart with variant

Catalog objective: pick a size and color variant, add to cart, open the cart.
Key assertion: cart shows the exact variant and the correct price (XL costs $20.00, other sizes $18.00).

## Open the product page
Go to https://my-testing-repo-main.vercel.app/amazon/add-to-cart-variant?reset=true and verify the product title "Everyday Cotton Tee" is visible and the cart count in the top right shows 0.

## Pick the variant
Click the size chip "XL", then click the color chip "Olive". Verify the text "Size: XL" and "Color: Olive" are visible and the price shown near the title reads "$20.00".

## Add to cart
Click the "Add to Cart" button and verify a green banner says "Added to cart: Size XL, Color Olive".

## Open the cart
Click the "Cart" button in the top bar and verify the heading "Shopping Cart (1 item)" is visible.

## Verify the cart line
Verify the cart line reads "Everyday Cotton Tee" with the variant text "Size: XL · Color: Olive", the line price "$20.00", and the "Cart total" row reads "$20.00".
