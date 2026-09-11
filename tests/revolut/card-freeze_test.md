---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut/card-freeze?reset=true
max_steps: 40
tags: [revolut, consumer-fintech, custom]
---

# Revolute 19.1: Card freeze unfreeze

Catalog objective: freeze the virtual card and confirm declines, then unfreeze (mobile web equivalent).
Key assertion: the state toggles and the card is usable again.

## Open the card
Go to https://my-testing-repo-main.vercel.app/revolut/card-freeze?reset=true and verify the virtual card ending "8841" shows the status badge "Active" and a "Freeze card" switch that is off.

## Freeze
Click the "Freeze card" switch and verify the status badge changes to "Frozen" and the help text says purchases will be declined.

## Attempt a purchase while frozen
Click "Simulate a $23.50 purchase at Metro Grocer" and verify a new transaction "You paid Metro Grocer" appears at the top of Recent transactions tagged "Declined" with the note "Declined · card frozen".

## Unfreeze
Click the "Freeze card" switch again and verify the status badge reads "Active".

## Verify the card works again
Click "Simulate a $23.50 purchase at Metro Grocer" and verify the newest transaction is tagged "Approved" with the note "Card purchase".
