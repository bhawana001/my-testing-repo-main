---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify/theme-update-smoke?reset=true
max_steps: 45
tags: [shopify, e-commerce, checkout]
---

# Shopifly 2.5: Theme update smoke

Catalog objective: after a theme publish, run homepage to checkout on a mobile viewport (mobile web equivalent: 390px preview).
Key assertion: no broken layout and checkout is reachable.

## Publish the theme
Go to https://my-testing-repo-main.vercel.app/shopify/theme-update-smoke?reset=true, click "Publish Dawn-ish 2.0", and verify "Dawn-ish 2.0 is now your live theme." and "Mobile layout check: no horizontal overflow ✓".

## Homepage to product
In the 390px mobile preview, click "Shop now" and verify the product "Botanical Art Print A3" at "$35.00".

## Add to cart
Click "Add to cart" and verify "Your cart" with "Botanical Art Print A3 × 1".

## Reach checkout
Click "Check out" and verify the badge "Checkout reachable" with "Contact · Shipping · Payment" and "Total $40.00", and that the layout check still reads "no horizontal overflow ✓".
