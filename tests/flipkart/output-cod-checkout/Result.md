---
test: ../cod-checkout_test.md
status: passed
started: 2026-09-13T10:14:07.674Z
duration_s: 146
session_id: c20de6ed-8119-4c2e-905f-30ff0d4e9396
---

# Flipmart 3.3: COD checkout — Result

## Open the cart ✓ passed (24.2s)
md5: d8beb5cade749c52f39cbecfcd0681fe
Go to https://my-testing-repo-main.vercel.app/flipkart/cod-checkout?reset=true and verify the cart shows "Stride Runner 3" at "₹2,499.00".

## Proceed to checkout ✓ passed (29.3s)
md5: 0fb4559d80a573b704f9e42d6d098eb1
Click "Proceed to checkout" and verify the Delivery step shows a "Shipping address" card.

## Continue to payment ✓ passed (31s)
md5: 8b5a251f2224de7ef9fbcc99bf7f392f
Click "Continue to payment" and verify the payment options "UPI", "Credit / debit card" and "Cash on delivery" are listed.

## Choose cash on delivery ✓ passed (25.9s)
md5: f7beb3a8dcbe719c27297212c1c66433
Click the "Cash on delivery" option, click the "Place order" button, and verify "Order placed" is shown.

## Verify the payment mode ✓ passed (33.7s)
md5: d647728329587d087197754f1a3b72b9
Verify the confirmation shows an Order number starting with "OD-", "Payment" as "Cash on delivery" and "Order total" as "₹2,499.00".
