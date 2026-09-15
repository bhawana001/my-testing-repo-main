---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm-clone-app/upi?reset=true
max_steps: 45
tags: [paytm, fintech, upi]
---

# Paytem 20.1: UPI transfer

Catalog objective: send money to a UPI id with a note.
Key assertion: the success screen appears and the transaction is in the history.

## Resolve the UPI ID
Type "tom@okhdfb" into "UPI ID", click "Verify", and verify a badge reads "Paying Tom Alvarez".

## Enter the amount and note
Type "500" into "Amount" and "Dinner share" into "Note", and verify "Wallet balance" reads "₹4,820.00".

## Send
Click "Send" and verify a green banner titled "Payment successful" says "₹500.00" was sent to "Tom Alvarez".

## Verify the receipt and the history
Verify the receipt shows "Transaction ID" of "PTM9095900", "To" of "Tom Alvarez · tom@okhdfb", "Amount" of "₹500.00" and "Note" of "Dinner share", then go to https://my-testing-repo-main.vercel.app/paytm-clone-app and verify the wallet reads "₹4,320.00" with a transaction listed.
