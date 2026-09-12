---
test: ../upi-intent_test.md
status: failed
started: 2026-09-11T17:19:08.355Z
duration_s: 457
session_id: 20f25c94-1517-4293-afd8-874aeb0154fc
---

# Razorpaid 11.2: UPI intent flow — Result

## Open the payment page ✓ passed (55.1s)
md5: f99bf2e81cfbdaebcb2e323268402686
Go to https://my-testing-repo-main.vercel.app/razorpay/upi-intent?reset=true and verify "Pay QuickBite" with amount "₹349.00" and the "UPI" method selected with an "Enter UPI ID" option.

## Enter an invalid VPA ✓ passed (32.6s)
md5: 035ab3c9eeed0428bf9d5d52ec5e102e
Type "bad" into the UPI ID field, click "Verify UPI ID", and verify the error "Invalid UPI ID. Format: name@bank" is shown.

## Enter a valid VPA ✗ failed (23.2s)
md5: b3c6f32e89fd563a534819915e963a42
Reason: Screenshot failed: TargetClosedError: screenshot: Target page, context or browser has been closed — bug verdict: Browser closed before screenshot capture [environment_issue/platform_failure, confidence 0.86]
Clear the UPI ID field, type "demo@okbank", click "Verify UPI ID", and verify a "Verified" badge with "demo@okbank · DEMO USER" appears.

## Pay ⏭ skipped
