---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay-clone-app?reset=true
max_steps: 45
tags: [razorpay, payments, checkout]
---

# Razorpie 11.1: Checkout modal

Catalog objective: trigger the Razorpie checkout and pay with the UPI success flow.
Key assertion: the payment succeeds and a receipt is shown.

## Open the checkout
Click "Pay now" on "Cotton kurta set" and verify a dialog titled "Razorpie · ₹1,899.00" opens listing the "UPI" and "Card" methods.

## Enter a UPI ID
With "UPI" selected, type "priya@okhdfb" into "UPI ID" and click "Verify UPI ID", then verify a badge reads "UPI ID verified — request will be sent to priya@okhdfb".

## Pay
Click "Pay ₹1,899.00" and verify a green banner titled "Payment successful" appears.

## Verify the receipt
Verify the banner shows payment "pay_R701kLm8Xq" captured for "₹1,899.00" via UPI (priya@okhdfb), and the Payments card lists that payment at "₹1,899.00".
