---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay/checkout-modal?reset=true
max_steps: 40
tags: [razorpay, payments-infra, checkout]
---

# Razorpaid 11.1: Standard checkout modal

Catalog objective: trigger Razorpaid checkout and pay with the test UPI success flow.
Key assertion: the payment success callback fires and a receipt is shown.

## Open the merchant page
Go to https://my-testing-repo-main.vercel.app/razorpay/checkout-modal?reset=true and verify the page shows "Pay Chai Point" with amount "₹1,499.00" and a "Pay ₹1,499.00" button.

## Open the checkout modal
Click "Pay ₹1,499.00" and verify a Razorpaid checkout modal opens showing "Chai Point", "₹1,499.00" and a "UPI ID / VPA" field.

## Pay with the success VPA
Type "success@razorpaid" into the UPI ID / VPA field, click the "Pay ₹1,499.00" button inside the modal, and verify the modal closes and the heading "Payment successful" appears.

## Verify callback and receipt
Verify "Callback" reads "handler(response) received", "Receipt" reads "rcpt_CP_1499" and "Payment method" reads "UPI · success@razorpaid".
