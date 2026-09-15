---
test: ../transfer-quote_test.md
status: passed
started: 2026-09-14T10:13:34.216Z
duration_s: 87
session_id: eb9379b5-63bb-4539-b9bb-4bb27a721f53
---

# Wyse 15.1: International transfer quote — Result

## Open the send page ✓ passed (1.21s)
md5: 19e11bb8ee72efceecc8e6cfe7fd66e0
Go to https://my-testing-repo-main.vercel.app/wise/transfer-quote?reset=true and verify the "Send money" page shows "You send" prefilled with 1000, From "USD", To "INR" and an empty fee breakdown.

## Get a quote ✓ passed (29.7s)
md5: 2eb2e13b20b86a2effefc9eb0ecf5f0e
Click "Get quote" and verify the "Fee breakdown" card shows "You send" as "$1,000.00".

## Verify rate, fee and arrival ✓ passed (52.9s)
md5: 608a9659543d739292784eedb22596cd
Verify the breakdown lists "Wyse fee (1.20 + 0.55%)" as "−$6.70", "Guaranteed rate (24h)" as "1 USD = 83.20 INR", "Recipient gets" as "₹82,642.56", and a green badge reading "Should arrive Tuesday, September 15 by 6:00 PM IST".
