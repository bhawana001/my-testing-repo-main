---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo-clone-app/pay?reset=true
max_steps: 45
tags: [venmo, fintech, p2p]
---

# Venmoo 22.1: Pay with a note

Catalog objective: pay a friend with a note and verify the feed entry privacy.
Key assertion: the payment is visible only according to its privacy setting.

## Send a private payment
Select "Tom Alvarez" in "To", type "40" into "Amount", type "Rent split" into "What's it for?", choose the "Private" privacy option, and click "Pay".

## Verify the payment went through with its note and privacy
Verify a green banner titled "Payment sent" says you paid "Tom Alvarez" "$40.00" for "Rent split" with a privacy of "Private".

## Verify you can see it yourself
Click "Yourself" in the feed viewer and note the visible count, then verify the "Rent split" entry is listed.

## Verify the privacy setting hides it from others
Click "The public" and verify the "Rent split" entry is not visible, then click "A friend" and verify it is still not visible — a Private payment is only visible to you.
