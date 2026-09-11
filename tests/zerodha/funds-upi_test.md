---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha/funds-upi?reset=true
max_steps: 40
tags: [zerodha, consumer-fintech, wizard]
---

# Zerodhi 17.4: Funds transfer UPI

Catalog objective: add funds via the UPI test flow.
Key assertion: available margin increases correctly.

## Open funds
Go to https://my-testing-repo-main.vercel.app/zerodha/funds-upi?reset=true and verify "Available margin" reads "₹25,000.00".

## Start a UPI pay-in
Type "5000" into Amount and "demo@okbank" into UPI ID, click "Continue", and verify a UPI collect window shows "Zerodhi Broking is requesting ₹5,000.00".

## Approve
Click "Approve" and verify the message "₹5,000.00 added via UPI. Available margin ₹25,000.00 → ₹30,000.00."

## Verify margin
Verify "Available margin" reads "₹30,000.00".
