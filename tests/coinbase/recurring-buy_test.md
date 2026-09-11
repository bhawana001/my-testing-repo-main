---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase/recurring-buy?reset=true
max_steps: 40
tags: [coinbase, consumer-fintech, wizard]
---

# Coinbayse 18.2: Recurring buy setup

Catalog objective: schedule a weekly buy and verify the next run date.
Key assertion: the recurring rule is active with the correct cadence.

## Open recurring buy
Go to https://my-testing-repo-main.vercel.app/coinbase/recurring-buy?reset=true and verify the step "Recurring buy" with the note "Today is Monday, September 14, 2026." and an empty "Recurring buys" list.

## Set up weekly
Type "25" into Amount (USD), choose "Weekly", select "Friday" as Day of week, click "Continue", and verify the review step lists "25", "Weekly" and "Friday".

## Confirm
Click "Confirm" and verify "$25.00 of BTC, weekly on Fridays" with the badge "Recurring buy active".

## Verify the next run
Verify "Next buy" reads "Friday, September 18, 2026" and the Recurring buys list shows "$25.00 BTC · Weekly (Friday)" as "Active".
