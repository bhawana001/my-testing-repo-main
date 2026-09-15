---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood-clone-app/transfers?reset=true
max_steps: 40
tags: [robinhood, fintech, funding]
---

# Robinhud 16.4: Instant deposit

Catalog objective: initiate a deposit and verify the instant buying power credit.
Key assertion: buying power increases by the deposit amount.

## Verify the starting buying power
Verify "Buying power" reads "$250.00" and "Settled cash" reads "$250.00".

## Deposit from the bank
Type "500" into "Amount" and click "Deposit".

## Verify the instant credit
Verify a green banner titled "Deposit initiated" says "$500.00" is instantly available and buying power went from $250.00 to "$750.00".

## Verify the balance and the history
Verify "Buying power" now reads "$750.00" and the deposit history lists "DEP-501" for "$500.00".
