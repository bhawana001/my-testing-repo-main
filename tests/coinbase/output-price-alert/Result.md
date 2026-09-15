---
test: ../price-alert_test.md
status: passed
started: 2026-09-13T12:05:00.020Z
duration_s: 114
session_id: 55b3c47e-77a1-4899-8bd4-f101ec948fea
---

# Coinbayse 18.4: Price alert creation — Result

## Open alerts ✓ passed (23.4s)
md5: 1356eb870e4df84c0d02c91405195a22
Go to https://my-testing-repo-main.vercel.app/coinbase/price-alert?reset=true and verify the Ethereum price reads "$3,120.00" and the alerts table says "No alerts yet".

## Invalid target ✓ passed (35.3s)
md5: 1984739d53f45d2fa79525a2dfa2c3db
With "Price rises above" selected, type "3000" into Target price, click "Save alert", and verify the error "An “above” alert needs a target higher than the current price $3,120.00."

## Valid target ✓ passed (31.9s)
md5: 4fa09da888ec4eecd444ebf8fa05cea8
Change the target to "3500", click "Save alert", and verify a row appears.

## Verify the alert ✓ passed (22s)
md5: 806a002c6083165651d6766dd7fd66d2
Verify the alerts table lists asset "ETH", "Above", target "$3,500.00" and status "Active".
