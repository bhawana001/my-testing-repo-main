---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay/upi-intent?reset=true
max_steps: 40
tags: [razorpay, payments-infra, checkout]
---

# Razorpaid 11.2: UPI intent flow

Catalog objective: choose UPI and verify the intent screen with VPA entry works.
Key assertion: VPA validation and success state render.

## Open the payment page
Go to https://my-testing-repo-main.vercel.app/razorpay/upi-intent?reset=true and verify "Pay QuickBite" with amount "₹349.00" and the "UPI" method selected with an "Enter UPI ID" option.

## Enter an invalid VPA
Type "bad" into the UPI ID field, click "Verify UPI ID", and verify the error "Invalid UPI ID. Format: name@bank" is shown.

## Enter a valid VPA
Clear the UPI ID field, type "demo@okbank", click "Verify UPI ID", and verify a "Verified" badge with "demo@okbank · DEMO USER" appears.

## Pay
Click the "Pay ₹349.00" button and verify the heading "Payment successful" appears with "Status" reading "captured" and "Payment method" reading "UPI · demo@okbank".
