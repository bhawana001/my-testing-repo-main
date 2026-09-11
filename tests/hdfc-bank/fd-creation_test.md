---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-bank/fd-creation?reset=true
max_steps: 40
tags: [hdfc-bank, banking, wizard]
---

# HDFB Bank 24.3: FD creation

Catalog objective: open a fixed deposit choosing tenure and amount.
Key assertion: the FD receipt shows the maturity amount.

## Open the FD wizard
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/fd-creation?reset=true and verify the step "Open a fixed deposit" with a "Deposit amount (INR)" field.

## Enter an amount below the minimum
Type "1000" into Deposit amount (INR), click "Continue", and verify the validation message "Minimum ₹5,000, up to your available balance." is shown.

## Enter a valid amount and tenure
Clear the amount, type "100000", click "Continue", choose "12 months" (6.6% p.a.) and "Credit principal and interest to savings", click "Continue", and verify the review step lists "100000" and "12 months".

## Open the deposit
Click "Open deposit" and verify the "Fixed deposit receipt" with the badge "Deposit opened".

## Verify the receipt
Verify "Principal" reads "₹1,00,000.00", "Tenure" reads "12 months at 6.6% p.a.", "Maturity date" reads "14 Sep 2027" and "Maturity amount" reads "₹1,06,765.15".
