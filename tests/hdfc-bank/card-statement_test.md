---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-clone-app/cards?reset=true
max_steps: 40
tags: [hdfc-bank, banking, cards]
---

# Hindfirst Bank 24.4: Credit card statement view

Catalog objective: open the card statement and verify the due date and minimum due.
Key assertion: the figures render and match the summary.

## Verify the statement header
Verify the statement summary shows "Card number" of "•••• •••• •••• 7712", "Statement date" of "2026-09-05" and "Payment due date" of "2026-09-25".

## Verify the amounts due
Verify "Total amount due" reads "₹42,618.50" and "Minimum amount due" reads "₹2,130.93".

## Verify the credit position
Verify "Credit limit" reads "₹400,000.00" and "Available credit" reads "₹357,381.50".

## Verify the figures agree with the transactions
Verify the transactions table lists "Skyline Airlines" at "₹28,450.00" and that "Sum of transactions" reads "₹42,618.50".
