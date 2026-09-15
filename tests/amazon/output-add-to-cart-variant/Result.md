---
test: ../add-to-cart-variant_test.md
status: failed
started: 2026-09-15T09:09:19.786Z
duration_s: 44
session_id: ff449fb0-293e-4735-be61-4647043ec5fb
---

# ShopKart 1.2: Add to cart with variant — Result

## Confirm the default variant ✗ failed (42.2s)
md5: 9bb78fad8bf7c18bf58ac7c087af929d
Reason: AP produced no action for 3 consecutive steps — bug verdict: Agent failed to complete product-page verification [automation_bug/agent_misstep, confidence 0.98]
Verify the product page shows "Wireless Gaming Headset 7.1", the price "$79.99" and "Selected: Midnight Black · Wireless".

## Switch colour to Arctic White ✓ passed (—)
md5: 94f2f9a0e5eff24ed4e9a546e41299a4
Click "Arctic White" and verify the price changes to "$84.99" and the selection reads "Selected: Arctic White · Wireless".

## Switch connection to Wired ✓ passed (—)
md5: d94c24a7404d9d65c78f37577b9b87ba
Click "Wired" and verify the price changes to "$69.99" and the selection reads "Selected: Arctic White · Wired".

## Add the chosen variant to the cart ✓ passed (—)
md5: a82269f65d26e0d03c965be7826bd30b
Click "Add to Cart" and verify a confirmation appears reading "Added to Cart: 1 × Wireless Gaming Headset 7.1 (Arctic White · Wired) at $69.99".
