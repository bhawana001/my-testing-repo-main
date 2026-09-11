---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay/emi-options?reset=true
max_steps: 40
tags: [razorpay, payments-infra, checkout]
---

# Razorpaid 11.3: EMI option display

Catalog objective: open payment options on a high-value order and verify the EMI plans list.
Key assertion: EMI tenures with interest are shown correctly.

## Open the payment options
Go to https://my-testing-repo-main.vercel.app/razorpay/emi-options?reset=true and verify "Pay Nova Store" with amount "₹60,000.00" and the "EMI" tab selected showing a plans table.

## Verify the tenures and interest math
Verify the EMI table lists four tenures: "3 months" with "No cost" interest at "₹20,000.00" per month, "6 months" at "12% p.a." with "₹10,352.90" per month and total interest "₹2,117.40", "9 months" at "13% p.a." with "₹7,032.96" per month, and "12 months" at "14% p.a." with "₹5,387.23" per month and total "₹64,646.76".

## Choose the 6-month plan
Click the "6 × ₹10,352.90" option and verify the pay button reads "Pay ₹10,352.90/month for 6 months".

## Pay
Click the pay button and verify "Payment successful" appears with "Monthly instalment" reading "₹10,352.90" and "Total payable" reading "₹62,117.40".
