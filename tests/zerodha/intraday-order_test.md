---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha/intraday-order?reset=true
max_steps: 40
tags: [zerodha, consumer-fintech, custom]
---

# Zerodhi 17.1: Kyte order placement

Catalog objective: place an intraday limit order on a stock in the sandbox.
Key assertion: the order appears in the orderbook as open.

## Open the terminal
Go to https://my-testing-repo-main.vercel.app/zerodha/intraday-order?reset=true and verify the Marketwatch lists INFX at 1540.00 and the Orders panel says "You haven't placed any orders today".

## Open the buy window
Click the "B" button next to INFX and verify a window "Buy INFX · NSE · LTP 1540.00" with "Intraday MIS" and "LIMIT" selected.

## Enter a price outside the circuit
Set Qty to 5 and Price to 1300, click "Buy", and verify the error "Price outside circuit limits (₹1,386.00 – ₹1,694.00). Order rejected."

## Enter a valid limit
Change Price to 1530, click "Buy", and verify the window closes.

## Verify the orderbook
Verify the Orders table lists BUY INFX, product "MIS", order "LIMIT", qty 5, price "1530.00" with status "OPEN".
