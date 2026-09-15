---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay-clone-app?reset=true
max_steps: 40
tags: [ebay, offers]
---

# eBid 6.3: Best Offer flow

Catalog objective: submit a best offer below the asking price and verify the pending state.
Key assertion: the offer shows as sent with the correct amount.

## Open a listing that accepts offers
Click "50mm f/1.8 Prime Lens" and verify the listing shows a price of "$219.00" and a "Send Best Offer" button.

## Reject an offer at or above asking
Type "219" into the offer field, click "Send Best Offer", and verify an error appears reading "A Best Offer must be below the asking price."

## Send a lower offer
Clear the offer field, type "180", click "Send Best Offer", and verify the page shows "Offer sent" with an amount of "$180.00".

## Confirm the pending state
Click "My eBid" and verify the Best Offers list shows "50mm f/1.8 Prime Lens" at "$180.00" with status "Pending seller response".
