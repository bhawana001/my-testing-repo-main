---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood-clone-app/portfolio?reset=true
max_steps: 40
tags: [robinhood, fintech, portfolio]
---

# Robinhud 16.3: Portfolio value

Catalog objective: open the portfolio and verify the total equals the sum of its positions.
Key assertion: the total matches the computed position sum.

## Verify the headline total
Verify "Total value" reads "$1,309.60".

## Verify the parts it is made of
Verify "Positions value" reads "$1,059.60" and "Cash" reads "$250.00".

## Verify each position's market value
Verify the AAPL row shows 3 shares with a market value of "$680.40" and the AMZN row shows 2 shares with a market value of "$379.20".

## Verify the sum check agrees
Verify "Sum of position values" reads "$1,059.60", which is the same as "Positions value".
