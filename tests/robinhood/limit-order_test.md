---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood-clone-app/trade?reset=true
max_steps: 45
tags: [robinhood, fintech, trading]
---

# Robinhud 16.2: Limit order

Catalog objective: place a limit buy below market and verify the pending state.
Key assertion: the open order is listed with its limit price.

## Open an order ticket
Type "TSLA" into "Search ticker or name", click "Trade" on the TSLA row, and verify "Last price" reads "$241.05".

## Switch to a limit order
Choose "Limit order" and verify a "Limit price" field appears with a hint that a price below "$241.05" stays pending.

## Place a limit below market
Set "Shares" to "1", type "200" into "Limit price", and click "Review and buy".

## Verify the order stays pending
Verify an amber banner titled "Order pending" shows a status of "Pending" at "$200.00", and the Orders list has an "ORD-501" row with a "Pending" badge noting it is waiting for TSLA to reach "$200.00".
