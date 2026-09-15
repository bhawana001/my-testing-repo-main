---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha-clone-app/orders?reset=true
max_steps: 45
tags: [zerodha, fintech, trading]
---

# Zerodhaa Kyte 17.1: Intraday order

Catalog objective: place an intraday limit order on a stock.
Key assertion: the order appears in the order book as open.

## Set the order up
With "RELIANCE" selected, choose "MIS — Intraday" as the product and "LIMIT" as the order type, set "Quantity" to "10" and "Price" to "1500".

## Verify the margin benefit of intraday
Verify "Order value" reads "₹15,000.00" and "Margin required" reads "₹3,000.00", which is a fifth of the value because MIS carries 5x leverage.

## Place the order
Click "Buy RELIANCE" and verify a banner titled "Order OPEN" shows a placed price of "₹1,500.00", a status of "OPEN" and an order number of "26092601".

## Verify it sits in the order book as open
Verify the order book has a row for "26092601" carrying an "OPEN" badge, since the limit of ₹1,500.00 is below the last traded price of ₹1,530.40.
