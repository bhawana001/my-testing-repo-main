---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo/card-transaction-feed?reset=true
max_steps: 40
tags: [venmo, consumer-fintech, feed]
---

# Venmoo 22.4: Card transaction feed

Catalog objective: verify a card purchase appears with a cashback tag (mobile web equivalent).
Key assertion: the transaction is listed with the correct merchant.

## Open the card feed
Go to https://my-testing-repo-main.vercel.app/venmo/card-transaction-feed?reset=true and verify "Cashback earned this month" reads "$1.45" and one transaction "You paid Trailhead Outfitters" tagged "3% cashback".

## Simulate a purchase
Click "Simulate a $22.00 card purchase at Bean There Coffee".

## Verify the new transaction
Verify the top transaction reads "You paid Bean There Coffee" for "−$22.00" with the tag "3% cashback" and the note "Venmoo Debit Card", and cashback now reads "$2.11".
