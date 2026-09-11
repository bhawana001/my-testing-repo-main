---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-bank/card-statement?reset=true
max_steps: 40
tags: [hdfc-bank, banking, crud]
---

# HDFB Bank 24.4: Credit card statement view

Catalog objective: open the card statement and verify the due date and minimum due.
Key assertion: figures render and match the summary.

## Open the statement
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/card-statement?reset=true and verify the page "Credit card statement" for "Regalia Credit Card •••• 5520" shows a Transactions table with six rows including "INDIGO AIRWAYS" for "₹12,450.00" and a credit "PAYMENT RECEIVED - THANK YOU" of "₹15,000.00".

## Verify the totals match
Verify the table footer "Total amount due" reads "₹8,212.25" and the Summary card's "Total amount due" also reads "₹8,212.25".

## Verify due date and minimum due
Verify the Summary shows "Payment due date" as "21 Sep 2026" and "Minimum amount due (5%)" as "₹410.61".
