---
test: ../tip-adjustment_test.md
status: passed
started: 2026-09-15T10:35:14.175Z
duration_s: 222
session_id: ff7d4b1e-ca95-40bf-bcd2-3fbbeca96def
---

# Instacrate 7.4: Tip adjustment — Result

## Place an order first ✓ passed (76.7s)
md5: 79290b97ddb7ed7464f51faaf22e1479
Click "Add" on "Oat Milk, 64 oz", click "Go to checkout", click "Within 2 hours · 3:00pm – 5:00pm", type "4242 4242 4242 4242" into the card number field, click "$5.00" for the tip, then click "Place order" and verify the confirmation shows "Order placed".

## Open the order ✓ passed (53.2s)
md5: aab8a2140ba2eda0a5441ff154ffc698
Click "View order & adjust tip" and verify the orders page shows a tip of "$5.00".

## Open the tip editor ✓ passed (22.4s)
md5: 2647c21cfbefa8ce4b34152c36745cd5
Click "Adjust tip" and verify a custom tip field appears.

## Raise the tip ✓ passed (35s)
md5: df9ddf6f3ade7db783966a77a8335539
Click "$8.00" and verify a notice appears reading "Tip updated to $8.00".

## Confirm the total moved with the tip ✓ passed (30.8s)
md5: fdf4c9f71afba76318e434a9d13d7327
Verify the order now shows a tip of "$8.00" and a badge reading "Tip adjusted after delivery".
