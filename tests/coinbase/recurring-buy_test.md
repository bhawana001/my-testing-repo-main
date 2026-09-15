---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase-clone-app/buy?reset=true
max_steps: 45
tags: [coinbase, fintech, crypto]
---

# Coinbaze 18.2: Recurring buy

Catalog objective: schedule a weekly buy and verify the next run date.
Key assertion: the recurring rule is active with the correct cadence.

## Set the order up
Select "ETH" in "Asset", type "50" into "Amount in USD", and choose "Recurring buy".

## Choose the cadence
Select "Every week" in "Frequency" and verify a badge reads "Next run: 2026-09-22".

## Schedule it
Type "4242 4242 4242 4242" into "Card number" and click the schedule button.

## Verify the rule is active with the right cadence
Verify a green banner titled "Recurring buy scheduled" names a next run of "2026-09-22", and the "Recurring buys (1)" card lists "$50.00 of ETH · Every week" with an active status.
