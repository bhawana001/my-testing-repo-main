---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha-clone-app/holdings?reset=true
max_steps: 40
tags: [zerodha, fintech, portfolio]
---

# Zerodhaa Kyte 17.3: Holdings P&L

Catalog objective: open the holdings and verify the P&L maths on one position.
Key assertion: P&L equals quantity times the price delta.

## Verify the summary
Verify "Total investment" reads "₹54,711.00", "Current value" reads "₹55,483.80" and "P&L" reads "+₹772.80".

## Verify the INFY position inputs
Verify the INFY row shows a quantity of 12, an average cost of "₹1,705.50" and an LTP of "₹1,842.15".

## Verify the INFY P&L arithmetic
Verify the INFY row shows invested of "₹20,466.00", current of "₹22,105.80" and P&L of "+₹1,639.80", which is 12 × (1,842.15 − 1,705.50).

## Verify a losing position is shown as a loss
Verify the HDFCBANK row shows P&L of "₹-867.00" with a net change badge of "-2.53%".
