---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify-clone-app/admin?reset=true
max_steps: 45
tags: [shopify, admin, orders]
---

# Shoplify 2.4: Admin order creation

Catalog objective: create a draft order for a customer in admin and mark it paid.
Key assertion: the order appears in the orders list as paid.

## Confirm the starting orders list
Verify the Orders tab shows "Orders (2)" listing order "#1001" and order "#1002".

## Open the draft order builder
Click "Draft orders" and verify a "Create draft order" card is shown with a "Customer name" field.

## Build the draft
Type "Marco Oduya" into "Customer name", "marco@example.com" into "Customer email", select "Canvas Market Tote" as the Product, type "2" into Quantity, click "Add line item", and verify a draft total of "$52.00" is shown.

## Save the draft
Click "Save draft order" and verify the draft orders list shows draft "D1" for "Marco Oduya" with status "open".

## Mark the draft paid
Click "Mark as paid" on draft "D1" and verify the Orders tab shows order "#1003" for "Marco Oduya" with channel "Draft order" and status "paid".
