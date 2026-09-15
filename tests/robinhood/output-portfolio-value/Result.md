---
test: ../portfolio-value_test.md
status: passed
started: 2026-09-13T11:41:21.987Z
duration_s: 108
session_id: fe6e7c59-0b48-49b7-8d3d-32bea45dc48b
---

# Robinhoot 16.3: Portfolio value render — Result

## Open the portfolio ✓ passed (24.3s)
md5: 261338fa9a9d685552576c28432b6ac7
Go to https://my-testing-repo-main.vercel.app/robinhood/portfolio-value?reset=true and verify the portfolio total reads "$4,148.80" and the Positions table lists NOVA (6), ACME (20), ORBT (40) and HLIX (2).

## Verify each position value ✓ passed (33.9s)
md5: 4d76b41c0d35b67470df37ff5a876fdb
Verify the market values are NOVA "$1,094.40", ACME "$1,282.00", ORBT "$950.00" and HLIX "$822.40", and "Sum of positions" reads "$4,148.80", equal to the portfolio total.

## Simulate a price update ✓ passed (24.4s)
md5: 34bf2c3a0a90f598f04d89ef03d13b5e
Click "Simulate next price update" and verify the text "scripted update 1 of 3" appears.

## Re-verify the total ✓ passed (24s)
md5: 3eb61adcf9c3f690ed6ea6aae1d73be6
Verify the portfolio total and "Sum of positions" both read "$4,153.60".
