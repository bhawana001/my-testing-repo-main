---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe-clone-app/scan?reset=true
max_steps: 45
tags: [phonepe, fintech, upi]
---

# PhonePey 21.1: QR scan to pay

Catalog objective: simulate the scan-to-pay flow with amount entry.
Key assertion: the payment succeeds with the merchant name shown.

## Scan a QR code
Click "Scan" on "Sunrise Chai Corner" and verify an "Enter amount" step appears.

## Enter the amount
Type "120" into "Amount", type "Two cutting chai" into "Note", verify "Available balance" reads "₹12,480.00", then click "Continue".

## Enter the UPI PIN
Verify the PIN step shows "Paying" of "Sunrise Chai Corner · ₹120.00", type "4321" into "UPI PIN", and click "Pay ₹120.00".

## Verify the success screen names the merchant
Verify a green banner titled "Payment successful" says "₹120.00" was paid to "Sunrise Chai Corner", and the receipt shows "Transaction ID" of "T-9501", "Paid to" of "Sunrise Chai Corner · sunrisechai@ybl" and "Amount" of "₹120.00".
