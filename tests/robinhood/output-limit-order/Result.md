---
test: ../limit-order_test.md
status: passed
started: 2026-09-13T11:39:47.252Z
duration_s: 78
session_id: 1f33eef3-5cb1-40c6-a125-a252119a5899
---

# Robinhoot 16.2: Limit order placement — Result

## Open the stock ✓ passed (26.7s)
md5: b614847a3721558735b5663929abe3cd
Go to https://my-testing-repo-main.vercel.app/robinhood/limit-order?reset=true and verify "Acme Industries (ACME)" at "$64.10" with an empty "Open orders" table.

## Place a limit below market ✓ passed (30.4s)
md5: 759ca97f15e36699efdfe1ab479f201d
Leave Shares at 10, type "60" into "Limit price", click "Place limit order", and verify the message "Limit buy placed. It will fill if ACME drops to $60.00 or lower."

## Verify the open order ✓ passed (19.3s)
md5: a43aefa50ceca13222c1c1f97c21e47e
Verify the "Open orders" table lists an order for 10 shares with limit price "$60.00", expiry "Good for day" and status "Pending".
