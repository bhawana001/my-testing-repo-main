---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/instant-deposit?reset=true
max_steps: 40
tags: [robinhood, consumer-fintech, wizard]
---

# Robinhoot 16.4: Instant deposit flow

Catalog objective: initiate a deposit and verify the instant buying power credit.
Key assertion: buying power increases by the deposit amount.

## Open deposit
Go to https://my-testing-repo-main.vercel.app/robinhood/instant-deposit?reset=true and verify "Buying power" in the top bar reads "$250.00" and the "Deposit funds" step shows From "Chaise Checking •••• 4821".

## Enter the amount
Type "500" into Amount, click "Continue", and verify the review step lists "500".

## Deposit
Click "Deposit" and verify "$500.00 available instantly" with the badge "Deposit initiated".

## Verify buying power
Verify "Buying power before" reads "$250.00", "Buying power now" reads "$750.00", and the top bar "Buying power" reads "$750.00".
