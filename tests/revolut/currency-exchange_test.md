---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut-clone-app/exchange?reset=true
max_steps: 40
tags: [revolut, fintech, fx]
---

# Revolat 19.2: Currency exchange

Catalog objective: exchange between two currency pockets.
Key assertion: both balances update at the quoted rate.

## Verify the starting pockets
Verify "Your pockets" shows "USD" of "$1240.50", "EUR" of "€180.00" and "GBP" of "£60.00".

## Set the exchange up
Leave "From" on "USD", select "EUR" in "To", type "100" into "Amount", and verify "Rate" reads "1 USD = 0.92 EUR" and "You get" reads "€92.00".

## Exchange
Click "Exchange" and verify a green banner titled "Exchange complete" says "$100.00" was exchanged for "€92.00" at 1 USD = 0.92 EUR.

## Verify both pockets moved
Verify "USD" now reads "$1140.50" and "EUR" now reads "€272.00".
