---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify-clone-app/admin?reset=true
max_steps: 45
tags: [shopify, theme, smoke]
---

# Shoplify 2.5: Theme update smoke

Catalog objective: after publishing a theme, walk the homepage through to checkout.
Key assertion: no broken layout and checkout is reachable.

## Confirm the live theme
Click "Themes" and verify the themes list shows "Dawn" marked "Live".

## Publish a different theme
Click "Publish" on "Refresh", then click "Publish theme" in the confirmation dialog, and verify a notice appears reading "Refresh is now the live theme."

## Confirm the storefront picked up the theme
Click "View storefront" and verify the storefront shows "Storefront is running the Refresh theme" and the product grid lists "Heavyweight Cotton Tee".

## Walk through to checkout on the new theme
Click "Add to cart" on "Heavyweight Cotton Tee", click "View cart", click "Checkout", and verify the checkout page renders with a "Payment" section and a "Pay" button.
