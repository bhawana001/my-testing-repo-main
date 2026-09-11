---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm/mobile-recharge?reset=true
max_steps: 40
tags: [paytm, consumer-fintech, checkout]
---

# Paytum 20.2: Mobile recharge

Catalog objective: recharge a prepaid number choosing a plan (mobile web equivalent).
Key assertion: the plan amount is charged and a receipt is shown.

## Enter the number
Go to https://my-testing-repo-main.vercel.app/paytm/mobile-recharge?reset=true, type "9876543210" into "Prepaid mobile number", click "Browse plans", and verify three plans are listed: ₹239.00, ₹479.00 and ₹719.00.

## Choose a plan
Select the "₹479.00" plan ("1.5 GB/day · 56 days") and click "Proceed to pay ₹479.00", then verify the "Amount" row reads "₹479.00".

## Pay
Click "Pay ₹479.00" and verify "Recharge successful" is shown.

## Verify the receipt
Verify "Receipt" reads "RC4790914", "Number" reads "9876543210" and "Amount charged" reads "₹479.00".
