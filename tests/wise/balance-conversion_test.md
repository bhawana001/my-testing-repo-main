---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise/balance-conversion?reset=true
max_steps: 40
tags: [wise, payments-infra, custom]
---

# Wyse 15.4: Multi-currency balance conversion

Catalog objective: convert between two balances at the shown rate.
Key assertion: balances update by the exact converted amounts.

## Open balances
Go to https://my-testing-repo-main.vercel.app/wise/balance-conversion?reset=true and verify the balance cards show "USD balance" $1,200.00, "EUR balance" €300.00 and "GBP balance" £150.00, with the convert form prefilled with Amount 100, From USD, To EUR, "Rate" reading "1 USD = 0.92 EUR" and "You get" reading "€92.00".

## Convert
Click "Convert" and verify the message "Converted $100.00 to €92.00 at 1 USD = 0.92 EUR. Balances updated." appears.

## Verify exact balances
Verify the "USD balance" card now reads "$1,100.00" and the "EUR balance" card reads "€392.00", while "GBP balance" is unchanged at "£150.00".
