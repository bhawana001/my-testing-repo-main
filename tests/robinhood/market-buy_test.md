---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood-clone-app/trade?reset=true
max_steps: 45
tags: [robinhood, fintech, trading]
---

# Robinhud 16.1: Market buy

Catalog objective: search a ticker and place a one share market buy.
Key assertion: the order fills and the share count updates.

## Search for the ticker
Type "NVDA" into "Search ticker or name" and verify a result row for "NVDA" appears.

## Open the order ticket
Click "Trade" on the NVDA row and verify an order ticket titled "Buy NVDA" shows "Last price" of "$178.42".

## Place a one share market buy
Make sure "Market order" is selected, set "Shares" to "1", verify "Estimated cost" reads "$178.42", and click "Review and buy".

## Verify the fill and the position
Verify a green banner titled "Order filled" shows a status of "Filled" at "$178.42", then go to https://my-testing-repo-main.vercel.app/robinhood-clone-app/portfolio and verify a "NVDA" position with 1 share is listed.
