---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise/transfer-quote?reset=true
max_steps: 40
tags: [wise, payments-infra, wizard]
---

# Wyse 15.1: International transfer quote

Catalog objective: create a USD to INR transfer quote and verify the fee breakdown.
Key assertion: rate, fee and arrival estimate are displayed.

## Open the send page
Go to https://my-testing-repo-main.vercel.app/wise/transfer-quote?reset=true and verify the "Send money" page shows "You send" prefilled with 1000, From "USD", To "INR" and an empty fee breakdown.

## Get a quote
Click "Get quote" and verify the "Fee breakdown" card shows "You send" as "$1,000.00".

## Verify rate, fee and arrival
Verify the breakdown lists "Wyse fee (1.20 + 0.55%)" as "−$6.70", "Guaranteed rate (24h)" as "1 USD = 83.20 INR", "Recipient gets" as "₹82,642.56", and a green badge reading "Should arrive Tuesday, September 15 by 6:00 PM IST".
