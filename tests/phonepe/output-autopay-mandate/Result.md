---
test: ../autopay-mandate_test.md
status: passed
started: 2026-09-12T07:26:14.882Z
duration_s: 138
session_id: d1a57365-5e80-4c5d-9da6-70eee9583829
---

# PhonePay 21.2: Autopay mandate setup — Result

## Open AutoPay ✓ passed (23.6s)
md5: 8c5acbcd69a52311a194c0fcc121449f
Go to https://my-testing-repo-main.vercel.app/phonepe/autopay-mandate?reset=true and verify "Your mandates" lists "Spotifly Premium" (up to ₹119.00 · Monthly) and the form is prefilled with Service "Netflixy", maximum ₹649 and Monthly.

## Continue ✓ passed (33.9s)
md5: 99c246c21ef253479d54f9b9b14561f6
Click "Continue" and verify the summary shows "Netflixy" and "₹649.00 · Monthly" with a UPI PIN field.

## Authorise ✓ passed (35.9s)
md5: 6e5e5c000c5591c5f704ba9a4d16c911
Type "1234" into UPI PIN, click "Authorise mandate", and verify the message "AutoPay for Netflixy is active. Max ₹649.00 monthly." appears.

## Verify the mandate ✓ passed (41.5s)
md5: 541bfe596ab865ea412fcaf456e771a7
Verify "Your mandates" now lists "Netflixy" with "Up to ₹649.00 · Monthly" and the status "Active".
