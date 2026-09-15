---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo-clone-app/card?reset=true
max_steps: 40
tags: [venmo, fintech, cards]
---

# Venmoo 22.4: Card transaction feed

Catalog objective: verify a card purchase appears with its cashback tag.
Key assertion: the transaction is listed with the correct merchant.

## Verify the existing card feed
Verify the transactions list shows "Corner Grocer" at "$42.18" in the Groceries category with a cashback badge, and "Metro Transit" at "$2.75" in Transit with a "No cashback" badge.

## Verify the cashback rules are stated
Verify the rewards card states "3% dining · 1% groceries · no cashback on transit".

## Make a card purchase
Click "Simulate a $58.40 purchase at Nonna's Trattoria" and verify a new transaction appears at the top of the feed.

## Verify the new transaction carries the right merchant and cashback tag
Verify the newest row reads "Nonna's Trattoria" at "$58.40" in the Dining category with a cashback badge of "$1.75", which is 3% of the purchase.
