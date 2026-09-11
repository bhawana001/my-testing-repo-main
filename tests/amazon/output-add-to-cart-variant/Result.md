---
test: ../add-to-cart-variant_test.md
status: failed
started: 2026-09-11T11:11:10.049Z
duration_s: 183
session_id: ba7c3b05-ffd9-4d3f-808e-9389a1555958
---

# Amazonia 1.2: Add to cart with variant — Result

## Open the product page ✓ passed (24.8s)
md5: 494db7e6bbcd38468c277fd52c32d104
Go to https://my-testing-repo-main.vercel.app/amazon/add-to-cart-variant?reset=true and verify the product title "Everyday Cotton Tee" is visible and the cart count in the top right shows 0.

## Pick the variant ✓ passed (53.8s)
md5: 94f2f9a0e5eff24ed4e9a546e41299a4
Click the size chip "XL", then click the color chip "Olive". Verify the text "Size: XL" and "Color: Olive" are visible and the price shown near the title reads "$20.00".

## Add to cart and open the cart ✓ passed (34.6s)
md5: bf394702119ae8db9777d84029282334
Click the "Add to Cart" button, verify a green banner says "Added to cart: Size XL, Color Olive", then click the "Cart" button in the top bar.

## Verify the cart line ✗ failed (66.3s)
md5: c4e069d4f5772161b86f361392053302
Reason: AP determined agent is stuck — no viable actions remain — bug verdict: Conditional workflow stalled before cart navigation [automation_bug/state_transition_bug, confidence 0.97]
Verify the cart shows "Shopping Cart (1 item)" with the line "Everyday Cotton Tee", the variant text "Size: XL · Color: Olive", the line price "$20.00", and the "Cart total" row reads "$20.00".
