---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase/price-alert?reset=true
max_steps: 40
tags: [coinbase, consumer-fintech, crud]
---

# Coinbayse 18.4: Price alert creation

Catalog objective: set a price alert on ETH.
Key assertion: the alert is saved with its target price.

## Open alerts
Go to https://my-testing-repo-main.vercel.app/coinbase/price-alert?reset=true and verify the Ethereum price reads "$3,120.00" and the alerts table says "No alerts yet".

## Invalid target
With "Price rises above" selected, type "3000" into Target price, click "Save alert", and verify the error "An “above” alert needs a target higher than the current price $3,120.00."

## Valid target
Change the target to "3500", click "Save alert", and verify a row appears.

## Verify the alert
Verify the alerts table lists asset "ETH", "Above", target "$3,500.00" and status "Active".
