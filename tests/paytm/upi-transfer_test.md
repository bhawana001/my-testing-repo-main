---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm/upi-transfer?reset=true
max_steps: 40
tags: [paytm, consumer-fintech, wizard]
---

# Paytum 20.1: UPI money transfer

Catalog objective: send money to a UPI ID with a note in the test environment (mobile web equivalent).
Key assertion: success screen and the transaction appears in history.

## Open send money
Go to https://my-testing-repo-main.vercel.app/paytm/upi-transfer?reset=true and verify the "Send money · UPI" screen with UPI ID, Amount and note fields, and History showing one entry "Paid to ravi@okaxis".

## Enter an invalid UPI ID
Type "asha" into "Enter UPI ID", "500" into Amount, click "Proceed to pay", and verify the error "Enter a valid UPI ID like name@bank." is shown.

## Enter valid details
Clear the UPI ID field, type "asha@okhdfc", type "Lunch" into "Add a note", click "Proceed to pay", and verify a "UPI PIN" field appears.

## Pay with the PIN
Type "1234" into "Enter UPI PIN", click "Pay ₹500.00", and verify "Payment successful" with "Paid to" reading "asha@okhdfc", "Amount" "₹500.00" and "Note" "Lunch".

## Verify history
Verify the History list now shows at the top "Paid to asha@okhdfc · Lunch" with "−₹500.00".
