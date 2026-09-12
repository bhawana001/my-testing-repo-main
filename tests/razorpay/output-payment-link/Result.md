---
test: ../payment-link_test.md
status: passed
started: 2026-09-11T18:17:20.865Z
duration_s: 22183
session_id: 47e438e8-c584-41df-9910-8d5c0f778f16
---

# Razorpaid 11.4: Payment link flow — Result

## Open the payment link ✓ passed (54.5s)
md5: 74d29fc1aff437d08ba67ad400b43292
Go to https://my-testing-repo-main.vercel.app/razorpay/payment-link?reset=true and verify the link page for "Pixel Studio" shows "Invoice #INV-0231 · Website design deposit", amount "₹2,500.00" and the badge "Payment pending".

## Pay via the modal ✓ passed (313.5s)
md5: b0d7468a361dedf4a80aa377021a93c4
Click "Pay ₹2,500.00", type "success@razorpaid" into the UPI ID / VPA field in the modal, click the modal's "Pay ₹2,500.00" button, and verify the page shows "This link has been paid".

## Verify the link cannot be reused ✓ passed (160.9s)
md5: c92bc2e262d8ffc671e05b33a0505627
Verify the status badge reads "Paid", the message "This payment link was already used and cannot be paid again" is shown, and the "Pay ₹2,500.00" button is disabled.

## Reload and re-check ✓ passed (42.6s)
md5: 329f214d2091f5092f49919033b00222
Reload the page without the reset parameter and verify the status badge still reads "Paid" and the pay button is still disabled.
