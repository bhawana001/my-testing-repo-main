---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe-clone-app/history?reset=true
max_steps: 40
tags: [phonepe, fintech, history]
---

# PhonePey 21.3: History filter

Catalog objective: filter the history by month and category.
Key assertion: the filtered list matches both criteria.

## Verify the unfiltered history
With "All" selected for both filters, verify "Transactions shown" reads 6.

## Filter by month
Select "2026-08" in "Month" and verify "Transactions shown" reads 2 with a "Total" of "₹2,160.00", listing "Uber India" and "Adani Electricity".

## Add a category filter
Select "2026-09" in "Month" and "Groceries" in "Category", then verify "Transactions shown" reads 1 with a "Total" of "₹2,140.00".

## Verify the single row matches both criteria
Verify the only row is "BigBazaar" at "₹2,140.00", which is both in 2026-09 and in Groceries.
