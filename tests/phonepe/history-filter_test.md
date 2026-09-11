---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe/history-filter?reset=true
max_steps: 40
tags: [phonepe, consumer-fintech, crud]
---

# PhonePay 21.3: Transaction history filter

Catalog objective: filter history by month and category (mobile web equivalent).
Key assertion: the filtered list matches the criteria.

## Open history
Go to https://my-testing-repo-main.vercel.app/phonepe/history-filter?reset=true and verify the text "7 transactions" with Month "All months" and Category "All categories".

## Filter by month
Select "August 2026" in Month and verify "3 transactions matching filters" with every row dated in August.

## Filter by category
Select "Food" in Category and verify "1 transaction matching filters".

## Verify the result
Verify the only row is "Swiggly" dated "11 Aug" in category "Food" for "−₹299.00".
