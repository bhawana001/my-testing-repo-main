---
mode: testing
url: https://my-testing-repo-main.vercel.app/american-express/offers-enrollment?reset=true
max_steps: 40
tags: [american-express, banking, crud]
---

# Amerix 25.4: Offers enrollment

Catalog objective: add a merchant offer to the card.
Key assertion: the offer shows as added.

## Open offers
Go to https://my-testing-repo-main.vercel.app/american-express/offers-enrollment?reset=true and verify four offers are listed including "Trailhead Outfitters" ("Get 10% back on purchases, up to $30") with an "Add to Card" button, and the text "0 offers added to Card".

## Add an offer
Click "Add to Card" on the "Trailhead Outfitters" offer and verify that offer now shows "✓ Added to Card" and the text reads "1 offer added to Card".

## Verify it persists
Reload the page without the reset parameter and verify "Trailhead Outfitters" still shows "✓ Added to Card".
