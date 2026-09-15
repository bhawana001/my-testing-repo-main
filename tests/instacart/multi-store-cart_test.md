---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart-clone-app?reset=true
max_steps: 45
tags: [instacart, grocery, multi-store]
---

# Instacrate 7.1: Multi-store cart

Catalog objective: add items from two stores and verify separate delivery slots.
Key assertion: each store cart has its own slot and fee.

## Add an item from the first store
Click "Add" on "Organic Strawberries, 1 lb" and verify the carts panel shows "GreenLeaf Market".

## Add an item from a second store
Click "Add" on "Coffee Beans, 2 lb" and verify the carts panel shows "Your carts (2 stores)" with both "GreenLeaf Market" and "BulkBarn Wholesale".

## Open checkout
Click "Go to checkout" and verify the checkout page shows "2 stores · each delivers separately".

## Confirm each store has its own fees
Verify the GreenLeaf Market card shows a service fee of "$3.99" and the BulkBarn Wholesale card shows a service fee of "$5.49".

## Confirm each store picks its own window
Click "Within 2 hours · 3:00pm – 5:00pm" in the GreenLeaf Market card, click "This evening · 6:00pm – 8:00pm" in the BulkBarn Wholesale card, and verify both options are selected in their own store cards.
