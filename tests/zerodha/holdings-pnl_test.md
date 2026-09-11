---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha/holdings-pnl?reset=true
max_steps: 40
tags: [zerodha, consumer-fintech, crud]
---

# Zerodhi 17.3: Holdings P and L

Catalog objective: open holdings and verify the P&L math on one position.
Key assertion: P&L equals quantity times price delta.

## Open holdings
Go to https://my-testing-repo-main.vercel.app/zerodha/holdings-pnl?reset=true and verify "Holdings (3)" lists INFX with qty 10, avg cost 1420.00, LTP 1540.00 and P&L "+₹1,200.00".

## Open the INFX breakdown
Click "INFX" and verify the breakdown shows Quantity 10, Average cost ₹1,420.00, LTP ₹1,540.00 and "Price delta (LTP − avg)" ₹120.00.

## Verify the formula
Verify the line "P&L = qty × delta" reads "10 × ₹120.00 = ₹1,200.00", matching the table's INFX P&L.
