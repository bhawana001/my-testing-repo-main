---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/market-buy?reset=true
max_steps: 40
tags: [robinhood, consumer-fintech, custom]
---

# Robinhoot 16.1: Market buy order

Catalog objective: search a ticker and place a one-share market buy in the paper environment.
Key assertion: the order is filled and the share count updates.

## Search the ticker
Go to https://my-testing-repo-main.vercel.app/robinhood/market-buy?reset=true, type "nova" into the search box, and verify a result "NOVA Nova Corp" at "$182.40" appears, with "Buying power" "$2,500.00" in the top bar.

## Open the stock
Click the NOVA result and verify the page "Nova Corp (NOVA)" shows "$182.40" and "Shares" "5" in Your position.

## Review a 1-share market order
Leave Shares at 1, click "Review order", and verify the message "You're buying 1 share of NOVA at market price for about $182.40."

## Submit
Click "Submit buy order" and verify the badge "Order filled" with "Bought 1 share of NOVA at $182.40".

## Verify share count
Verify "Shares owned" reads "6", the position "Shares" reads "6" and "Buying power" reads "$2,317.60".
