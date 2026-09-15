---
test: ../intraday-order_test.md
status: failed
started: 2026-09-15T06:46:14.362Z
duration_s: 58
session_id: bbea5311-f084-49b9-a6c7-75bb68d9828d
---

# Zerodhi 17.1: Kyte order placement — Result

## Open the terminal ✓ passed (1.04s)
md5: 1bd6cad39d471e421615e62ff6107ed0
Go to https://my-testing-repo-main.vercel.app/zerodha/intraday-order?reset=true and verify the Marketwatch lists INFX at 1540.00 and the Orders panel says "You haven't placed any orders today".

## Open the buy window ✓ passed (0.86s)
md5: 29a071b1153bce2a7fcc223cc7751398
Click the "B" button next to INFX and verify a window "Buy INFX · NSE · LTP 1540.00" with "Intraday MIS" and "LIMIT" selected.

## Enter a price outside the circuit ✓ passed (2.05s)
md5: 1ad0106023e87b17e16fd93ce9edc543
Set Qty to 5 and Price to 1300, click "Buy", and verify the error "Price outside circuit limits (₹1,386.00 – ₹1,694.00). Order rejected."

## Enter a valid limit ✗ failed (52.3s)
md5: 11a91f5a8092652a714c206cce548020
Reason: Final verification failed: "the window closes" — bug verdict: Modal-close assertion fails after successful order [automation_bug/state_transition_bug, confidence 0.93]
Change Price to 1530, click "Buy", and verify the window closes.

## Verify the orderbook ⏭ skipped
