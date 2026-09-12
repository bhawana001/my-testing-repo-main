---
test: ../mobile-recharge_test.md
status: passed
started: 2026-09-12T07:10:17.411Z
duration_s: 189
session_id: 2921fbf7-d455-40ab-ade2-af8a1cabc506
---

# Paytum 20.2: Mobile recharge — Result

## Enter the number ✓ passed (53.9s)
md5: 5b98fd8a03eafdd385d6c7a0ebb1bba8
Go to https://my-testing-repo-main.vercel.app/paytm/mobile-recharge?reset=true, type "9876543210" into "Prepaid mobile number", click "Browse plans", and verify three plans are listed: ₹239.00, ₹479.00 and ₹719.00.

## Choose a plan ✓ passed (54.5s)
md5: b887130557e0e6930088740988f199f0
Select the "₹479.00" plan ("1.5 GB/day · 56 days") and click "Proceed to pay ₹479.00", then verify the "Amount" row reads "₹479.00".

## Pay ✓ passed (31.5s)
md5: 1b7e605e3c3539cdf2ebf539e861c93d
Click "Pay ₹479.00" and verify "Recharge successful" is shown.

## Verify the receipt ✓ passed (46.4s)
md5: f0309db3923407480e1b597b8cb0683c
Verify "Receipt" reads "RC4790914", "Number" reads "9876543210" and "Amount charged" reads "₹479.00".
