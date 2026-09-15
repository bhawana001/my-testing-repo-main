---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-clone-app/deposits?reset=true
max_steps: 45
tags: [hdfc-bank, banking, deposits]
---

# Hindfirst Bank 24.3: FD creation

Catalog objective: open a fixed deposit, choosing a tenure and an amount.
Key assertion: the receipt shows the maturity amount.

## Set the deposit up
Leave "Fund from" on the Savings Account, leave "Amount" as "100000", select "12 months — 7.10%" in "Tenure", and verify "Rate applied" reads "7.10% per annum".

## Check the projected maturity
Verify "Maturity amount" in the preview reads "₹107,291.28".

## Open the deposit
Click "Open the deposit" and verify a green card titled "Fixed deposit opened" appears.

## Verify the receipt
Verify the receipt shows "Deposit number" of "FD770118", "Principal" of "₹100,000.00", "Tenure" of "12 months", "Rate" of "7.10% per annum", "Interest earned" of "₹7,291.28" and "Maturity amount" of "₹107,291.28".
