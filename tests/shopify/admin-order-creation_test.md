---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify/admin-order-creation?reset=true
max_steps: 45
tags: [shopify, e-commerce, crud]
---

# Shopifly 2.4: Admin order creation

Catalog objective: in admin, create a draft order for a customer and mark it paid.
Key assertion: the order appears in the orders list as paid.

## Open the orders list
Go to https://my-testing-repo-main.vercel.app/shopify/admin-order-creation?reset=true and verify the Orders list shows order #1004.

## Open create order
Click "Create order" and verify the Products and Customer panels.

## Add products
Click "Add" to add "Botanical Art Print A3", then select "Custom Name Ceramic Mug · $22.00", set Quantity to 2, click "Add", and verify "Total" reads "$84.00".

## Try without a customer
Click "Collect payment · Mark as paid" and verify "Select a customer."

## Choose customer and mark paid
Select "Maria Chen <maria@globex.test>" as Customer, click "Collect payment · Mark as paid", and verify "Order #1005 created and marked as paid."

## Verify the orders list
Verify the first row reads "#1005", customer "Maria Chen <maria@globex.test>", total "$84.00", Payment status "Paid" and Fulfillment "Unfulfilled".
