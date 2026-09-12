---
test: ../multi-seller-cart_test.md
status: passed
started: 2026-09-11T16:28:38.436Z
duration_s: 117
session_id: 9fcc1126-d52c-4bb9-b6f0-442d74bc2efb
---

# Etsily 5.3: Cart with multiple sellers — Result

## Open the cart ✓ passed (48.2s)
md5: 8fc8582dc99224c75217166231e1e8e3
Go to https://my-testing-repo-main.vercel.app/etsy/multi-seller-cart?reset=true and verify the cart lists "Custom Name Ceramic Mug" sold by "ClayWorks Studio" and "Botanical Art Print A3" sold by "Fernhouse Prints".

## Verify per-shop shipping ✓ passed (35.1s)
md5: 3eefa0fa6443703a9c4bca495c68767c
Verify the order summary shows two separate shipping rows: "Shipping · ClayWorks Studio" at "$4.50" and "Shipping · Fernhouse Prints" at "$6.25".

## Verify the total ✓ passed (29.4s)
md5: 7597db20c82cc780ccce95036d4f3f16
Verify the "Subtotal" row reads "$57.00" and the "Order total" row reads "$67.75" ($57.00 + $4.50 + $6.25).
