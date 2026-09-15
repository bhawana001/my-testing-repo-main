---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha-clone-app/funds?reset=true
max_steps: 40
tags: [zerodha, fintech, funding]
---

# Zerodhaa Kyte 17.4: Funds via UPI

Catalog objective: add funds via the UPI test flow.
Key assertion: the available margin increases correctly.

## Verify the starting margin
Verify "Available margin" reads "₹25,000.00".

## Verify a malformed UPI ID is rejected
Type "priya" into "UPI ID", click "Verify UPI ID", and verify an error reads "Enter a valid UPI ID, for example name@bank."

## Verify a good UPI ID
Replace the UPI ID with "priya@okhdfb", click "Verify UPI ID", and verify a badge reads "UPI ID verified".

## Add the funds
Type "5000" into "Amount", click "Add funds", and verify a green banner titled "Funds added" says "₹5,000.00" was credited and the balance moved from ₹25,000.00 to "₹30,000.00", with "Available margin" now reading "₹30,000.00".
