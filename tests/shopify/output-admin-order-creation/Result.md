---
test: ../admin-order-creation_test.md
status: passed
started: 2026-09-13T10:07:04.572Z
duration_s: 188
session_id: 6656b15d-4918-49ba-a498-2c78cc2d4d67
---

# Shopifly 2.4: Admin order creation — Result

## Open the orders list ✓ passed (0.84s)
md5: 038abba8b011dae2e82f618e591641da
Go to https://my-testing-repo-main.vercel.app/shopify/admin-order-creation?reset=true and verify the Orders list shows order #1004.

## Open create order ✓ passed (0.78s)
md5: e69bd4977383f7c58c0d4a080df86161
Click "Create order" and verify the Products and Customer panels.

## Add products ✓ passed (103.1s)
md5: 5f08ab0a6ecce8abf53e652797188d6f
Click "Add" to add "Botanical Art Print A3", then select "Custom Name Ceramic Mug · $22.00", set Quantity to 2, click "Add", and verify "Total" reads "$84.00".

## Try without a customer ✓ passed (29s)
md5: c4057ef8b58dc504152bf59a6bba7a4a
Click "Collect payment · Mark as paid" and verify "Select a customer."

## Choose customer and mark paid ✓ passed (29.3s)
md5: 257ad47ab9fb503fdc70bc3df68d52f6
Select "Maria Chen <maria@globex.test>" as Customer, click "Collect payment · Mark as paid", and verify "Order #1005 created and marked as paid."

## Verify the orders list ✓ passed (23.1s)
md5: c0767e6f42cc3a14da227ee052407557
Verify the first row reads "#1005", customer "Maria Chen <maria@globex.test>", total "$84.00", Payment status "Paid" and Fulfillment "Unfulfilled".
