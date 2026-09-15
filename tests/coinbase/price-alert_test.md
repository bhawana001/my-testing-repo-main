---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase-clone-app/alerts?reset=true
max_steps: 40
tags: [coinbase, fintech, alerts]
---

# Coinbaze 18.4: Price alert

Catalog objective: set a price alert on ETH.
Key assertion: the alert is saved with its target price.

## Choose the asset
Select "ETH" in "Asset" and verify "Current price" reads "$3,120.40".

## Set the direction and target
Choose "Price goes above" and type "3500" into "Target price", then verify a badge shows the percentage difference from the current price.

## Create the alert
Click "Create alert" and verify a green banner titled "Alert created" says you will be notified when "ETH" goes "above" "$3,500.00".

## Verify the alert is saved
Verify the "Your alerts (1)" card lists "ETH above $3,500.00" with an active status badge.
