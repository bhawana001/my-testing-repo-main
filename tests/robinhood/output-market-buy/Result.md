---
test: ../market-buy_test.md
status: passed
started: 2026-09-15T06:44:59.128Z
duration_s: 58
session_id: d966688a-74d1-40aa-a94a-e200944e0dc6
---

# Robinhoot 16.1: Market buy order — Result

## Search the ticker ✓ passed (1.15s)
md5: eb2208d2ad3e140061e6762cd885e069
Go to https://my-testing-repo-main.vercel.app/robinhood/market-buy?reset=true, type "nova" into the search box, and verify a result "NOVA Nova Corp" at "$182.40" appears, with "Buying power" "$2,500.00" in the top bar.

## Open the stock ✓ passed (1.84s)
md5: f63e651b7e90bdc155653be53f6c3f8f
Click the NOVA result and verify the page "Nova Corp (NOVA)" shows "$182.40" and "Shares" "5" in Your position.

## Review a 1-share market order ✓ passed (0.73s)
md5: b131e549af6bef3cd5a1736492cba9d0
Leave Shares at 1, click "Review order", and verify the message "You're buying 1 share of NOVA at market price for about $182.40."

## Submit ✓ passed (0.75s)
md5: 78412bdf02ec3b69314c6b7f7f9ef0f3
Click "Submit buy order" and verify the badge "Order filled" with "Bought 1 share of NOVA at $182.40".

## Verify share count ✓ passed (51.3s)
md5: cebf7cb53e4a4e2f9ce3e2c8319aba72
Verify "Shares owned" reads "6", the position "Shares" reads "6" and "Buying power" reads "$2,317.60".
