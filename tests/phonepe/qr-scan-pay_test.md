---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe/qr-scan-pay?reset=true
max_steps: 40
tags: [phonepe, consumer-fintech, wizard]
---

# PhonePay 21.1: UPI QR scan pay

Catalog objective: simulate a scan-to-pay flow with amount entry (mobile web equivalent).
Key assertion: payment success with the merchant name shown.

## Scan
Go to https://my-testing-repo-main.vercel.app/phonepe/qr-scan-pay?reset=true, click "Simulate scan of merchant QR", and verify the merchant "Fresh Mart Groceries" (freshmart@ybl · Verified merchant) is shown with an amount field.

## Enter amount
Type "240" into "Enter amount (₹)", click "Pay", and verify a "UPI PIN" field appears with "Paying Fresh Mart Groceries".

## Wrong PIN
Type "0000" into UPI PIN, click "Confirm", and verify the error "Incorrect UPI PIN." is shown.

## Correct PIN
Clear the PIN, type "1234", click "Confirm", and verify "Payment successful" is shown with "Paid to" "Fresh Mart Groceries" and "Amount" "₹240.00".
