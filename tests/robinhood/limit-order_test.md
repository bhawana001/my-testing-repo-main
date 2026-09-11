---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/limit-order?reset=true
max_steps: 40
tags: [robinhood, consumer-fintech, custom]
---

# Robinhoot 16.2: Limit order placement

Catalog objective: place a limit buy below market and verify the pending state.
Key assertion: an open order is listed with its limit price.

## Open the stock
Go to https://my-testing-repo-main.vercel.app/robinhood/limit-order?reset=true and verify "Acme Industries (ACME)" at "$64.10" with an empty "Open orders" table.

## Place a limit below market
Leave Shares at 10, type "60" into "Limit price", click "Place limit order", and verify the message "Limit buy placed. It will fill if ACME drops to $60.00 or lower."

## Verify the open order
Verify the "Open orders" table lists an order for 10 shares with limit price "$60.00", expiry "Good for day" and status "Pending".
