---
test: ../checkout-saved-card_test.md
status: passed
started: 2026-09-11T16:53:58.043Z
duration_s: 181
session_id: 1814b1d3-2ffb-4a3d-a0ef-38474d21d0e5
---

# Nyke 8.4: Checkout with saved card — Result

## Open the cart ✓ passed (23.3s)
md5: cd81acbf5f1f72d6dfbf3cdb3d3344ac
Go to https://my-testing-repo-main.vercel.app/nike/checkout-saved-card?reset=true and verify the cart contains "Velocity Racer" with "Size: US 10 · Color: Blue" at "$139.00".

## Proceed to delivery ✓ passed (31.8s)
md5: d32e00f01a28d91793584a73c6c03fe4
Click "Proceed to checkout" and verify the "Standard" shipping option is selected at "Free".

## Continue to payment ✓ passed (35.3s)
md5: 5100b1b48e192eb68f00d8f7b4fc397f
Click "Continue to payment" and verify saved cards "Visa •••• 4242" (Default) and "Mastercard •••• 4444" are listed with Visa selected.

## Pay with the saved card ✓ passed (33.7s)
md5: f5fc0f1003fdf929950461d4ed24dab6
Click the "Pay $149.08" button ($139.00 + $10.08 tax) and verify "Order placed" is shown.

## Verify size and price ✓ passed (54.6s)
md5: 7e1f2c01439e95034403fde1cecbe889
Verify the confirmation shows the item "Velocity Racer" with "Size: US 10 · Color: Blue" at "$139.00", "Payment" as "Visa •••• 4242" and "Order total" as "$149.08".
