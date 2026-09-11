---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo/pay-with-note?reset=true
max_steps: 40
tags: [venmo, consumer-fintech, feed]
---

# Venmoo 22.1: P2P payment with emoji note

Catalog objective: pay a friend with a note and verify feed entry privacy (mobile web equivalent).
Key assertion: the payment is visible per its privacy setting only.

## Open pay
Go to https://my-testing-repo-main.vercel.app/venmo/pay-with-note?reset=true and verify the Pay form with To "Tom Alvarez" and a Feed containing one entry "You paid Priya Nair" marked "Friends".

## Pay privately with an emoji note
Type "25" into Amount, "🍕 Pizza night" into "What's it for?", select "Private" in Privacy, click "Pay", and verify the message "You paid Tom Alvarez $25.00 · “🍕 Pizza night” · Private" appears.

## View as yourself
Verify the feed note reads "Viewing as yourself (all entries) · 2 visible" and the "You paid Tom Alvarez" entry with "🍕 Pizza night" is listed.

## View as a friend
Click "As a friend" and verify the note reads "Viewing as a friend (Public + Friends) · 1 visible" and the "🍕 Pizza night" entry is not shown, while the "Concert tix" entry to Priya Nair is still shown.
