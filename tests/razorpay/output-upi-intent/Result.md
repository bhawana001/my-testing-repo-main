---
test: ../upi-intent_test.md
status: passed
started: 2026-09-13T10:59:45.619Z
duration_s: 89
session_id: 767b69fe-3ca0-406c-8430-dbf2552fba1b
---

# Razorpaid 11.2: UPI intent flow — Result

## Open the payment page ✓ passed (1.2s)
md5: f99bf2e81cfbdaebcb2e323268402686
Go to https://my-testing-repo-main.vercel.app/razorpay/upi-intent?reset=true and verify "Pay QuickBite" with amount "₹349.00" and the "UPI" method selected with an "Enter UPI ID" option.

## Enter an invalid VPA ✓ passed (0.87s)
md5: 035ab3c9eeed0428bf9d5d52ec5e102e
Type "bad" into the UPI ID field, click "Verify UPI ID", and verify the error "Invalid UPI ID. Format: name@bank" is shown.

## Enter a valid VPA ✓ passed (40.2s)
md5: b3c6f32e89fd563a534819915e963a42
Clear the UPI ID field, type "demo@okbank", click "Verify UPI ID", and verify a "Verified" badge with "demo@okbank · DEMO USER" appears.

## Pay ✓ passed (45.3s)
md5: d40338e31b1cb4ee3dd92716ec42b124
Click the "Pay ₹349.00" button and verify the heading "Payment successful" appears with "Status" reading "captured" and "Payment method" reading "UPI · demo@okbank".
