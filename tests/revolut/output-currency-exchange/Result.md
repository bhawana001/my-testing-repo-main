---
test: ../currency-exchange_test.md
status: passed
started: 2026-09-14T10:25:52.033Z
duration_s: 93
session_id: b636bcf6-dac1-4449-bf40-745a4211d18f
---

# Revolute 19.2: Currency exchange — Result

## Open exchange ✓ passed (29.39s)
md5: 4a6c9d4df4874a2a8c2e00ad78a318eb
Go to https://my-testing-repo-main.vercel.app/revolut/currency-exchange?reset=true and verify the pockets show USD "$500.00", EUR "€120.00" and GBP "£80.00", the form is prefilled with From USD, To EUR, Amount 50, "Quoted rate" reads "1 USD = 0.92 EUR" and "You'll get" reads "€46.00".

## Exchange ✓ passed (6.28s)
md5: 74b11e8e46253fe4adad65818379a382
Click "Exchange" and verify the message "Exchanged $50.00 → €46.00 at 1 USD = 0.92 EUR." appears.

## Verify both pockets ✓ passed (54.3s)
md5: 7046b4aa87b5c24894aa3887492a116a
Verify the USD pocket now reads "$450.00" and the EUR pocket reads "€166.00", while GBP stays "£80.00".
