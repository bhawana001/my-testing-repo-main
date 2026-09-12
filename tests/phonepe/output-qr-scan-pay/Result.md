---
test: ../qr-scan-pay_test.md
status: passed
started: 2026-09-12T07:23:16.485Z
duration_s: 162
session_id: 54267e21-871e-4f79-ab4d-07096e975ddf
---

# PhonePay 21.1: UPI QR scan pay — Result

## Scan ✓ passed (38.9s)
md5: dd8cd7b581c15b44b1dca7dd60ca8341
Go to https://my-testing-repo-main.vercel.app/phonepe/qr-scan-pay?reset=true, click "Simulate scan of merchant QR", and verify the merchant "Fresh Mart Groceries" (freshmart@ybl · Verified merchant) is shown with an amount field.

## Enter amount ✓ passed (38.3s)
md5: 8e65a4d86a4552e06c07b8846495bd62
Type "240" into "Enter amount (₹)", click "Pay", and verify a "UPI PIN" field appears with "Paying Fresh Mart Groceries".

## Wrong PIN ✓ passed (35.5s)
md5: 6ae21afaa04089cf3beb6253ccc632c7
Type "0000" into UPI PIN, click "Confirm", and verify the error "Incorrect UPI PIN." is shown.

## Correct PIN ✓ passed (46.2s)
md5: 6f068816c0d945f0f379bbd16b0aad9c
Clear the PIN, type "1234", click "Confirm", and verify "Payment successful" is shown with "Paid to" "Fresh Mart Groceries" and "Amount" "₹240.00".
