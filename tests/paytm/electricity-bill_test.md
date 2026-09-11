---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm/electricity-bill?reset=true
max_steps: 40
tags: [paytm, consumer-fintech, checkout]
---

# Paytum 20.3: Bill payment electricity

Catalog objective: fetch an electricity bill by consumer number and pay it (mobile web equivalent).
Key assertion: the fetched amount matches the paid amount.

## Try an unknown consumer number
Go to https://my-testing-repo-main.vercel.app/paytm/electricity-bill?reset=true, type "1111111111" into "Consumer number", click "Fetch bill", and verify the message "No pending bill found for this consumer number." is shown.

## Fetch the demo bill
Clear the Consumer number field, type "1002003004", click "Fetch bill", and verify the "Bill fetched" card shows "Demo User · 1002003004", due date "20 Sep 2026" and "Bill amount" "₹1,842.00".

## Pay
Click "Pay ₹1,842.00" and verify "Bill paid" is shown.

## Verify amounts match
Verify "Fetched amount" reads "₹1,842.00" and "Amount paid" reads "₹1,842.00".
