---
test: ../balance-conversion_test.md
status: passed
started: 2026-09-13T11:37:05.775Z
duration_s: 86
session_id: cf27a848-cf63-4034-a4b7-c654cd34436e
---

# Wyse 15.4: Multi-currency balance conversion — Result

## Open balances ✓ passed (31.1s)
md5: 943c655275531a22b4b4009edd68efac
Go to https://my-testing-repo-main.vercel.app/wise/balance-conversion?reset=true and verify the balance cards show "USD balance" $1,200.00, "EUR balance" €300.00 and "GBP balance" £150.00, with the convert form prefilled with Amount 100, From USD, To EUR, "Rate" reading "1 USD = 0.92 EUR" and "You get" reading "€92.00".

## Convert ✓ passed (29.9s)
md5: a0f0bfa0344e9b9ccb8c0b7f440d65f4
Click "Convert" and verify the message "Converted $100.00 to €92.00 at 1 USD = 0.92 EUR. Balances updated." appears.

## Verify exact balances ✓ passed (23.7s)
md5: fa95bf8e4b4bc3b33d7382c05011616e
Verify the "USD balance" card now reads "$1,100.00" and the "EUR balance" card reads "€392.00", while "GBP balance" is unchanged at "£150.00".
