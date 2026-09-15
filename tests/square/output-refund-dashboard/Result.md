---
test: ../refund-dashboard_test.md
status: passed
started: 2026-09-13T11:10:25.793Z
duration_s: 166
session_id: 869b4e80-8548-4790-8675-3ca4b5efccb5
---

# Squarely 12.4: Refund from dashboard — Result

## Open transactions ✓ passed (56.2s)
md5: 7a16d94551efc8aa6a3b6ac1b4363a2f
Go to https://my-testing-repo-main.vercel.app/square/refund-dashboard?reset=true and verify Balance "$1,250.00" and the latest transaction "Bean There · Register 1" for "$64.50" marked "Completed".

## Over-refund ✓ passed (43.1s)
md5: ee76924ec38bc3d65c9151c5e0446611
Click "Issue refund" on the $64.50 transaction, type "100", click "Refund", and verify "Refund can't exceed $64.50."

## Partial refund ✓ passed (42s)
md5: b85a97bf42f656c2f428d6592e1a15f3
Change the amount to "20", click "Refund", and verify "Refund of $20.00 issued for sq_T301."

## Verify record and balance ✓ passed (23.3s)
md5: e7841c68da4728e067df18afb970a43c
Verify the transaction status reads "Partially refunded $20.00" and Balance reads "$1,230.00".
