---
test: ../history-filter_test.md
status: passed
started: 2026-09-12T07:28:49.590Z
duration_s: 145
session_id: 50a68a1c-8b62-4dae-b20f-17886322451f
---

# PhonePay 21.3: Transaction history filter — Result

## Open history ✓ passed (32.1s)
md5: 35914ae12a41b4b6ab04b092f71ff05f
Go to https://my-testing-repo-main.vercel.app/phonepe/history-filter?reset=true and verify the text "7 transactions" with Month "All months" and Category "All categories".

## Filter by month ✓ passed (35s)
md5: 54c57f381ea773a95600782628c055b1
Select "August 2026" in Month and verify "3 transactions matching filters" with every row dated in August.

## Filter by category ✓ passed (28.8s)
md5: 139ff027784e516569c54fef448bb824
Select "Food" in Category and verify "1 transaction matching filters".

## Verify the result ✓ passed (46.1s)
md5: 4c8ba0f6c3b385858357f7c2e7ff7bc1
Verify the only row is "Swiggly" dated "11 Aug" in category "Food" for "−₹299.00".
