---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase/crypto-buy?reset=true
max_steps: 40
tags: [coinbase, consumer-fintech, checkout]
---

# Coinbayse 18.1: Crypto buy with card

Catalog objective: buy a small BTC amount in the sandbox with a test card.
Key assertion: purchase confirmation and the balance is credited.

## Open buy
Go to https://my-testing-repo-main.vercel.app/coinbase/crypto-buy?reset=true and verify "BTC balance" reads "0.01250000 BTC", Amount is 50, "Coinbayse fee" reads "$0.99" and "You'll get" reads "0.00075400 BTC".

## Preview
Click "Preview buy" and verify the summary lists "Buy 0.00075400 BTC", "Price $65,000.00" and "Total $50.00" with a card form.

## Pay with the test card
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Buy now · $50.00", and verify "You bought 0.00075400 BTC" with the badge "Purchase complete".

## Verify the credited balance
Verify "New BTC balance" reads "0.01325400 BTC" and the top bar BTC balance also reads "0.01325400 BTC".
