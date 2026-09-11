---
test: ../one-click-checkout_test.md
status: passed
started: 2026-09-11T15:45:42.819Z
duration_s: 308
session_id: ab80d0e5-a69e-4252-b881-068e4d5c917e
---

# Amazonia 1.3: One-click checkout — Result

## Open the 1-Click page ✓ passed (41s)
md5: 3751e94f83485524688c797529e5fe1c
Go to https://my-testing-repo-main.vercel.app/amazon/one-click-checkout?reset=true and verify the item "AuraBuds Pro Wireless Earbuds" is listed and the note reads "Product page price: $129.00".

## Check the saved address and payment ✓ passed (30.3s)
md5: f8933375ca9f709004eef28132dde194
Verify the summary shows "Ship to: Demo User, 1200 Market St, San Francisco", "Pay with: Visa •••• 4242" and the "Order total" row reads "$129.00".

## Place the order ✓ passed (31.7s)
md5: 1ff34c7274c2c8fd6bf9cea9b8f49708
Click the "Place your order (1-Click)" button and verify the text "Order placed" is shown.

## Verify the confirmation ✓ passed (200.8s)
md5: 40c40d37cba2fd530142d0f52dc63d90
Verify an "Order number" starting with "112-" is displayed and the "Order total" on the confirmation reads "$129.00", matching the product page price.
