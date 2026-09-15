---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm-clone-app/bills?reset=true
max_steps: 40
tags: [paytm, fintech, bills]
---

# Paytem 20.3: Electricity bill

Catalog objective: fetch an electricity bill by consumer number and pay it.
Key assertion: the fetched amount matches the amount paid.

## Fetch the bill
Select "Tata Power" in "Electricity board", type "100200300" into "Consumer number", and click "Fetch bill".

## Verify the fetched bill
Verify the bill details show "Consumer name" of "Priya Nair", "Billing period" of "Aug 2026", "Units consumed" of "284", "Due date" of "2026-09-22" and "Amount due" of "₹1,842.50".

## Pay it
Click "Pay ₹1,842.50" and verify a green banner titled "Bill paid" appears.

## Verify the amount paid matches the amount fetched
Verify the banner says "₹1,842.50" was paid to Tata Power for consumer "100200300", with transaction "PTM9095900".
