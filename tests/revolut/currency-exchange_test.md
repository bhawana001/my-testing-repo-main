---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut/currency-exchange?reset=true
max_steps: 40
tags: [revolut, consumer-fintech, custom]
---

# Revolute 19.2: Currency exchange

Catalog objective: exchange between two currency pockets (mobile web equivalent).
Key assertion: both balances update at the quoted rate.

## Open exchange
Go to https://my-testing-repo-main.vercel.app/revolut/currency-exchange?reset=true and verify the pockets show USD "$500.00", EUR "€120.00" and GBP "£80.00", the form is prefilled with From USD, To EUR, Amount 50, "Quoted rate" reads "1 USD = 0.92 EUR" and "You'll get" reads "€46.00".

## Exchange
Click "Exchange" and verify the message "Exchanged $50.00 → €46.00 at 1 USD = 0.92 EUR." appears.

## Verify both pockets
Verify the USD pocket now reads "$450.00" and the EUR pocket reads "€166.00", while GBP stays "£80.00".
