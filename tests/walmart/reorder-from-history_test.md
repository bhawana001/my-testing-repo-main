---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart/reorder-from-history?reset=true
max_steps: 40
tags: [walmart, e-commerce, crud]
---

# Walmartly 4.4: Reorder from history

Catalog objective: reorder a past purchase in two clicks from order history.
Key assertion: the cart is prefilled with the previous items.

## Open purchase history
Go to https://my-testing-repo-main.vercel.app/walmart/reorder-from-history?reset=true and verify the heading "Purchase history" is visible with order "WM-104466" listing "2× Organic Whole Milk 1L, 1× Bananas (bunch), 2× Sourdough Loaf" and the cart count in the top bar shows 0.

## Reorder
Click the "Reorder" button on order WM-104466 and verify the banner "Cart prefilled from order WM-104466. Review and check out." is shown.

## Verify the prefilled cart
Verify the cart lists "Organic Whole Milk 1L" with quantity 2, "Bananas (bunch)" with quantity 1, and "Sourdough Loaf" with quantity 2, and the cart count in the top bar shows 5.
