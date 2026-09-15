---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase-clone-app/buy?reset=true
max_steps: 45
tags: [coinbase, fintech, crypto]
---

# Coinbaze 18.1: Crypto buy

Catalog objective: buy a small amount of BTC with a test card.
Key assertion: the purchase is confirmed and the balance is credited.

## Set the order up
Select "BTC" in "Asset", type "100" into "Amount in USD", and make sure "One-time purchase" is selected.

## Verify the quote breakdown
Verify the Quote card shows "Amount" of "$100.00", "Card fee (1.49%)" of "$1.49", "Spread (0.5%)" of "$0.50", "Invested" of "$98.01" and "You receive" of "0.00152472 BTC".

## Pay with the test card
Type "4242 4242 4242 4242" into "Card number" and click the buy button.

## Verify the purchase and the credited balance
Verify a green banner titled "Purchase complete" says "0.00152472 BTC" was bought for $100.00, then go to https://my-testing-repo-main.vercel.app/coinbase-clone-app and verify the BTC holding has increased above its starting 0.00412 BTC.
