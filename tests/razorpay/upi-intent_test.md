---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay-clone-app?reset=true
max_steps: 45
tags: [razorpay, payments, upi]
---

# Razorpie 11.2: UPI intent

Catalog objective: choose UPI and verify the intent screen with VPA entry works.
Key assertion: VPA validation and the success state both render.

## Open the UPI intent screen
Click "Pay now" on "Cotton kurta set", make sure "UPI" is selected, and verify a "UPI ID" field with a "Verify UPI ID" button is shown.

## Verify a malformed VPA is rejected
Type "priya" into "UPI ID", click "Verify UPI ID", and verify an inline error reads "Enter a valid UPI ID, for example name@bank."

## Verify an unknown VPA is rejected
Replace the UPI ID with "nobody@okhdfb", click "Verify UPI ID", and verify an inline error reads "No account found for that UPI ID."

## Verify a good VPA succeeds
Replace the UPI ID with "priya@ybl", click "Verify UPI ID", verify a badge reads "UPI ID verified — request will be sent to priya@ybl", then click "Pay ₹1,899.00" and verify a green banner titled "Payment successful" appears.
