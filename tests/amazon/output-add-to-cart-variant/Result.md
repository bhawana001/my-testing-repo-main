---
test: ../add-to-cart-variant_test.md
status: passed
started: 2026-09-11T14:03:21.907Z
duration_s: 149
session_id: 296e6fab-ec7a-4813-9baf-fd9bc0e311f2
---

# Amazonia 1.2: Add to cart with variant — Result

## Open the product page ✓ passed (2.17s)
md5: 494db7e6bbcd38468c277fd52c32d104
Go to https://my-testing-repo-main.vercel.app/amazon/add-to-cart-variant?reset=true and verify the product title "Everyday Cotton Tee" is visible and the cart count in the top right shows 0.

## Pick the variant ✓ passed (9.12s)
md5: 94f2f9a0e5eff24ed4e9a546e41299a4
Click the size chip "XL", then click the color chip "Olive". Verify the text "Size: XL" and "Color: Olive" are visible and the price shown near the title reads "$20.00".

## Add to cart ✓ passed (33.3s)
md5: d94c24a7404d9d65c78f37577b9b87ba
Click the "Add to Cart" button and verify a green banner says "Added to cart: Size XL, Color Olive".

## Open the cart ✓ passed (47s)
md5: a82269f65d26e0d03c965be7826bd30b
Click the "Cart" button in the top bar and verify the heading "Shopping Cart (1 item)" is visible.

## Verify the cart line ✓ passed (54s)
md5: ee78fd83c5f786a6c6df531954ac194b
Verify the cart line reads "Everyday Cotton Tee" with the variant text "Size: XL · Color: Olive", the line price "$20.00", and the "Cart total" row reads "$20.00".
