---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay-clone-app?reset=true
max_steps: 40
tags: [ebay, auction, bidding]
---

# eBid 6.1: Bid placement

Catalog objective: place a bid above the current price on an auction listing.
Key assertion: the bid is registered and the user is shown as high bidder.

## Open an auction listing
Click "Vintage Rangefinder Camera 35mm" and verify the listing shows a current bid of "$82.00", "7" bids and high bidder "m_torres".

## Reject a bid below the minimum
Type "83" into the bid field, click "Place bid", and verify an error appears reading "Your bid must be at least $84.50."

## Place a winning bid
Clear the bid field, type "90", click "Place bid", and verify the page shows "Bid placed" with an amount of "$90.00".

## Confirm the bid is recorded
Click "My eBid" and verify the bids list shows "Vintage Rangefinder Camera 35mm" at "$90.00" with status "High bidder".
