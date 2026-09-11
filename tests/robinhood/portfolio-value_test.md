---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/portfolio-value?reset=true
max_steps: 40
tags: [robinhood, consumer-fintech, crud]
---

# Robinhoot 16.3: Portfolio value render

Catalog objective: open the portfolio and verify the total equals the sum of positions.
Key assertion: the total matches the computed position sum.

## Open the portfolio
Go to https://my-testing-repo-main.vercel.app/robinhood/portfolio-value?reset=true and verify the portfolio total reads "$4,148.80" and the Positions table lists NOVA (6), ACME (20), ORBT (40) and HLIX (2).

## Verify each position value
Verify the market values are NOVA "$1,094.40", ACME "$1,282.00", ORBT "$950.00" and HLIX "$822.40", and "Sum of positions" reads "$4,148.80", equal to the portfolio total.

## Simulate a price update
Click "Simulate next price update" and verify the text "scripted update 1 of 3" appears.

## Re-verify the total
Verify the portfolio total and "Sum of positions" both read "$4,153.60".
