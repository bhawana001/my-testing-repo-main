---
test: ../checkout-modal_test.md
status: passed
started: 2026-09-11T17:15:22.463Z
duration_s: 207
session_id: e74ef655-6dad-4e07-8374-b7a9c488935c
---

# Razorpaid 11.1: Standard checkout modal — Result

## Open the merchant page ✓ passed (33.9s)
md5: c76f02e0ce436d9df7695e7dc09e01da
Go to https://my-testing-repo-main.vercel.app/razorpay/checkout-modal?reset=true and verify the page shows "Pay Chai Point" with amount "₹1,499.00" and a "Pay ₹1,499.00" button.

## Open the checkout modal ✓ passed (47.1s)
md5: 710c3f7ca41948152832007af2b5f58e
Click "Pay ₹1,499.00" and verify a Razorpaid checkout modal opens showing "Chai Point", "₹1,499.00" and a "UPI ID / VPA" field.

## Pay with the success VPA ✓ passed (66.9s)
md5: 4e983e25c7d7d548538d51b16ef0d2f1
Type "success@razorpaid" into the UPI ID / VPA field, click the "Pay ₹1,499.00" button inside the modal, and verify the modal closes and the heading "Payment successful" appears.

## Verify callback and receipt ✓ passed (55.9s)
md5: a89b4ab11c82aed6b390424c6722d325
Verify "Callback" reads "handler(response) received", "Receipt" reads "rcpt_CP_1499" and "Payment method" reads "UPI · success@razorpaid".
