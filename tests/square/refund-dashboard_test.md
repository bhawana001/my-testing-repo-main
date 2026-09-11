---
mode: testing
url: https://my-testing-repo-main.vercel.app/square/refund-dashboard?reset=true
max_steps: 45
tags: [square, payments-infra, crud]
---

# Squarely 12.4: Refund from dashboard

Catalog objective: refund the latest payment partially from the dashboard.
Key assertion: the refund is recorded and the balance updated.

## Open transactions
Go to https://my-testing-repo-main.vercel.app/square/refund-dashboard?reset=true and verify Balance "$1,250.00" and the latest transaction "Bean There · Register 1" for "$64.50" marked "Completed".

## Over-refund
Click "Issue refund" on the $64.50 transaction, type "100", click "Refund", and verify "Refund can't exceed $64.50."

## Partial refund
Change the amount to "20", click "Refund", and verify "Refund of $20.00 issued for sq_T301."

## Verify record and balance
Verify the transaction status reads "Partially refunded $20.00" and Balance reads "$1,230.00".
