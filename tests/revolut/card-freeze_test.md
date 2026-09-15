---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut-clone-app/card?reset=true
max_steps: 45
tags: [revolut, fintech, cards]
---

# Revolat 19.1: Card freeze

Catalog objective: freeze the virtual card, confirm declines, then unfreeze.
Key assertion: the state toggles and the card is usable again.

## Freeze the card
Verify the card badge reads that the card is active, then click the freeze button and verify a notice says the card is frozen and new payments will be declined.

## Verify a payment is really declined
Click "Simulate purchase" and verify a notice reads "Payment declined — the card is frozen." and the declined list shows a "Metro Grocer" entry at "$24.60" with a reason of "Card is frozen".

## Unfreeze the card
Click the unfreeze button and verify a notice says the card is unfrozen and payments work again.

## Verify the card works again
Click "Simulate purchase" and verify a notice reads "Payment approved — $24.60 at Metro Grocer." with no new declined entry added.
