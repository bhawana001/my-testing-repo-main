---
test: ../emi-options_test.md
status: passed
started: 2026-09-11T17:27:05.356Z
duration_s: 2995
session_id: 65319574-9fa4-480f-bcd6-9fdac29c7074
---

# Razorpaid 11.3: EMI option display — Result

## Open the payment options ✓ passed (38.2s)
md5: 8c7f6389093fa6f6e6eefd61e31dbe4f
Go to https://my-testing-repo-main.vercel.app/razorpay/emi-options?reset=true and verify "Pay Nova Store" with amount "₹60,000.00" and the "EMI" tab selected showing a plans table.

## Verify the tenures and interest math ✓ passed (30.6s)
md5: 889b0d4c9815ff0305408643045350f8
Verify the EMI table lists four tenures: "3 months" with "No cost" interest at "₹20,000.00" per month, "6 months" at "12% p.a." with "₹10,352.90" per month and total interest "₹2,117.40", "9 months" at "13% p.a." with "₹7,032.96" per month, and "12 months" at "14% p.a." with "₹5,387.23" per month and total "₹64,646.76".

## Choose the 6-month plan ✓ passed (31.5s)
md5: 06c554a043a536f4dfb9a120ee5a03c6
Click the "6 × ₹10,352.90" option and verify the pay button reads "Pay ₹10,352.90/month for 6 months".

## Pay ✓ passed (36.7s)
md5: 824c13fae997febff2641be935940e1e
Click the pay button and verify "Payment successful" appears with "Monthly instalment" reading "₹10,352.90" and "Total payable" reading "₹62,117.40".
