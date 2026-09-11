---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart/supercoins-balance?reset=true
max_steps: 45
tags: [flipkart, e-commerce, custom]
---

# Flipmart 3.4: SuperCoins balance

Catalog objective: open the rewards section and verify the SuperCoins balance renders.
Key assertion: the balance is a number, not an error state.

## Open SuperCoin Zone
Go to https://my-testing-repo-main.vercel.app/flipkart/supercoins-balance?reset=true and wait for the loading placeholder to disappear.

## Verify the balance
Verify "SuperCoin balance" shows the number "1,250", no error message such as "couldn't load" is shown, and the Coin history table lists 4 entries.
