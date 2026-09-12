---
test: ../savings-vault_test.md
status: passed
started: 2026-09-12T06:35:08.325Z
duration_s: 1819
session_id: a286f6e4-090c-49ff-910a-7817ce61c02b
---

# Revolute 19.4: Savings vault roundup — Result

## Open the vault ✓ passed (45.1s)
md5: 408cb403c9207a8c0797ab7399b82ca5
Go to https://my-testing-repo-main.vercel.app/revolut/savings-vault?reset=true and verify "Holiday Vault" shows "$240.50", the "Round-ups" switch is off and the status reads "Rule inactive".

## Enable round-ups ✓ passed (176.1s)
md5: b838ef72243e4a077abf054af174af97
Click the "Round-ups" switch and verify the status reads "Rule active · round-ups to Holiday Vault" and a "Multiplier" selector appears.

## Simulate a purchase ✓ passed (49.6s)
md5: 4483056dbd5612066d8807df5751d2a0
Click "Simulate a $3.40 card purchase" and verify the vault balance reads "$241.10" and "Round-ups saved so far" reads "1 purchase".

## Verify the rule persists ✓ passed (46.6s)
md5: 876b3ff767f23f8eb63b5aae5e8a374a
Reload the page without the reset parameter and verify the status still reads "Rule active · round-ups to Holiday Vault" and the switch is on.
