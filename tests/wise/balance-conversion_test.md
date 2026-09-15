---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise-clone-app/balances?reset=true
max_steps: 40
tags: [wise, payments, balances]
---

# Wize 15.4: Balance conversion

Catalog objective: convert between two balances at the shown rate.
Key assertion: the balances update by exactly the converted amounts.

## Verify the starting balances
Verify "Your balances" shows "USD" of "$2,480.40" and "EUR" of "€310.00".

## Set the conversion up
Leave "From" on "USD" and "To" on "EUR", replace "Amount" with "100", and verify "Rate" reads "1 USD = 0.92 EUR" and "You'll get" reads "€92.00".

## Convert
Click "Convert" and verify a green banner titled "Conversion complete" says "$100.00" was converted to "€92.00" at 1 USD = 0.92 EUR.

## Verify the balances moved by exactly those amounts
Verify "USD" now reads "$2,380.40" and "EUR" now reads "€402.00".
