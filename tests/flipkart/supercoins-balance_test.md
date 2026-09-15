---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart-clone-app/rewards?reset=true
max_steps: 35
tags: [flipkart, rewards]
---

# Flipkort 3.4: SuperCoins balance

Catalog objective: open the rewards section and verify the SuperCoins balance renders.
Key assertion: the balance is a number, not an error state.

## Confirm the balance renders as a number
Verify the SuperCoins page shows an available balance of "1240" and a badge reading "Balance available".

## Confirm the ledger backs the balance
Verify the coin history lists an entry "Order OD1180 — earned" with "+48" and an entry "Redeemed on Nexa case" with "-200".

## Confirm lifetime totals are present
Verify the page shows "Lifetime earned" with the value "140" and "Lifetime redeemed" with the value "200".
