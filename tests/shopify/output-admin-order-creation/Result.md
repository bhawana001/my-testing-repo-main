---
test: ../admin-order-creation_test.md
status: passed
started: 2026-09-15T09:29:05.519Z
duration_s: 282
session_id: 2ea1605c-0d43-4eaf-a765-3d6254358e74
---

# Shoplify 2.4: Admin order creation — Result

## Confirm the starting orders list ✓ passed (24.7s)
md5: c43aacb9be59680c1d7b598d24292982
Verify the Orders tab shows "Orders (2)" listing order "#1001" and order "#1002".

## Open the draft order builder ✓ passed (26.4s)
md5: 2fc6d4ae7955cadd253a4a39ca631837
Click "Draft orders" and verify a "Create draft order" card is shown with a "Customer name" field.

## Build the draft ✓ passed (141.8s)
md5: 6e3842256d1b0f35a29c38af78d3d325
Type "Marco Oduya" into "Customer name", "marco@example.com" into "Customer email", select "Canvas Market Tote" as the Product, type "2" into Quantity, click "Add line item", and verify a draft total of "$52.00" is shown.

## Save the draft ✓ passed (35.3s)
md5: a1324382351d7fa70e8395eafae9f81c
Click "Save draft order" and verify the draft orders list shows draft "D1" for "Marco Oduya" with status "open".

## Mark the draft paid ✓ passed (51.5s)
md5: 3cf14160157131cede3968d7bb7782b2
Click "Mark as paid" on draft "D1" and verify the Orders tab shows order "#1003" for "Marco Oduya" with channel "Draft order" and status "paid".
