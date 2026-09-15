---
test: ../theme-update-smoke_test.md
status: passed
started: 2026-09-15T09:34:06.257Z
duration_s: 187
session_id: c76fff7d-0bd4-4ced-8bcb-eec76cb39ed7
---

# Shoplify 2.5: Theme update smoke — Result

## Confirm the live theme ✓ passed (30.4s)
md5: c30a8daf82a957fadea7eda802c1d543
Click "Themes" and verify the themes list shows "Dawn" marked "Live".

## Publish a different theme ✓ passed (64.4s)
md5: 363c89c4f271de015ef8ffa2c781ec0a
Click "Publish" on "Refresh", then click "Publish theme" in the confirmation dialog, and verify a notice appears reading "Refresh is now the live theme."

## Confirm the storefront picked up the theme ✓ passed (36.9s)
md5: 866a9cc9a70a713fb0ea5f2ab70231bd
Click "View storefront" and verify the storefront shows "Storefront is running the Refresh theme" and the product grid lists "Heavyweight Cotton Tee".

## Walk through to checkout on the new theme ✓ passed (52.9s)
md5: f68754786245759951c7e8b95f6f283c
Click "Add to cart" on "Heavyweight Cotton Tee", click "View cart", click "Checkout", and verify the checkout page renders with a "Payment" section and a "Pay" button.
