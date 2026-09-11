---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay/payment-link?reset=true
max_steps: 40
tags: [razorpay, payments-infra, checkout]
---

# Razorpaid 11.4: Payment link flow

Catalog objective: open a payment link, complete a test payment, verify the paid state.
Key assertion: the link shows paid and cannot be reused.

## Open the payment link
Go to https://my-testing-repo-main.vercel.app/razorpay/payment-link?reset=true and verify the link page for "Pixel Studio" shows "Invoice #INV-0231 · Website design deposit", amount "₹2,500.00" and the badge "Payment pending".

## Pay via the modal
Click "Pay ₹2,500.00", type "success@razorpaid" into the UPI ID / VPA field in the modal, click the modal's "Pay ₹2,500.00" button, and verify the page shows "This link has been paid".

## Verify the link cannot be reused
Verify the status badge reads "Paid", the message "This payment link was already used and cannot be paid again" is shown, and the "Pay ₹2,500.00" button is disabled.

## Reload and re-check
Reload the page without the reset parameter and verify the status badge still reads "Paid" and the pay button is still disabled.
