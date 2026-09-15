---
test: ../theme-update-smoke_test.md
status: passed
started: 2026-09-14T09:59:27.628Z
duration_s: 59
session_id: 0febbf51-1978-48a1-b467-0597d5748654
---

# Shopifly 2.5: Theme update smoke — Result

## Publish the theme ✓ passed (7.8s)
md5: 6161c1f64db2f7a8b5fd96f814736852
Go to https://my-testing-repo-main.vercel.app/shopify/theme-update-smoke?reset=true, click "Publish Dawn-ish 2.0", and verify "Dawn-ish 2.0 is now your live theme." and "Mobile layout check: no horizontal overflow ✓".

## Homepage to product ✓ passed (6.84s)
md5: 9afe50a0e9805d505c4fe07c1e3d7d24
In the 390px mobile preview, click "Shop now" and verify the product "Botanical Art Print A3" at "$35.00".

## Add to cart ✓ passed (0.74s)
md5: eabec583e652ef6724a0c718d7a252ef
Click "Add to cart" and verify "Your cart" with "Botanical Art Print A3 × 1".

## Reach checkout ✓ passed (40.5s)
md5: cd73510975cd80d475e15e1109a2d6fc
Click "Check out" and verify the badge "Checkout reachable" with "Contact · Shipping · Payment" and "Total $40.00", and that the layout check still reads "no horizontal overflow ✓".
