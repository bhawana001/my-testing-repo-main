---
test: ../multi-store-cart_test.md
status: passed
started: 2026-09-15T10:27:01.603Z
duration_s: 185
session_id: 076d6b55-a2ab-4506-bb54-3403a893e9ea
---

# Instacrate 7.1: Multi-store cart — Result

## Add an item from the first store ✓ passed (32.4s)
md5: 450d503e242545989a75fd9902b8a431
Click "Add" on "Organic Strawberries, 1 lb" and verify the carts panel shows "GreenLeaf Market".

## Add an item from a second store ✓ passed (34.6s)
md5: 86101415600e9682d8e8e27fcd4f985e
Click "Add" on "Coffee Beans, 2 lb" and verify the carts panel shows "Your carts (2 stores)" with both "GreenLeaf Market" and "BulkBarn Wholesale".

## Open checkout ✓ passed (34.3s)
md5: 05fa0ba2ac5f998b9cf8fce0515b16c3
Click "Go to checkout" and verify the checkout page shows "2 stores · each delivers separately".

## Confirm each store has its own fees ✓ passed (24.9s)
md5: 83da1d4293dacf2d1d419240883b75a2
Verify the GreenLeaf Market card shows a service fee of "$3.99" and the BulkBarn Wholesale card shows a service fee of "$5.49".

## Confirm each store picks its own window ✓ passed (41.4s)
md5: f0a043d3f22d0a0d71be2c43d1b0166f
Click "Within 2 hours · 3:00pm – 5:00pm" in the GreenLeaf Market card, click "This evening · 6:00pm – 8:00pm" in the BulkBarn Wholesale card, and verify both options are selected in their own store cards.
