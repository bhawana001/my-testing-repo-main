---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay/bid-placement?reset=true
max_steps: 40
tags: [ebay, e-commerce, custom]
---

# eBidz 6.1: Bid placement

Catalog objective: place a bid above the current price on an auction listing.
Key assertion: the bid is registered and the user is shown as high bidder.

## Open the auction
Go to https://my-testing-repo-main.vercel.app/ebay/bid-placement?reset=true and verify the listing "Vintage Automatic Watch · 1974 · Serviced" shows "Current bid" "$120.00", "7 bids" and a high bidder other than you.

## Bid below the minimum
Type "121" into "Your max bid", click "Place bid", and verify the message "Enter $122.50 or more." is shown.

## Bid above the rival
Clear the bid field, type "130", click "Place bid", and verify the message "You're the high bidder at $127.50. Your maximum bid is $130.00." appears.

## Verify the bid registered
Verify "Current bid" reads "$127.50", the count reads "8 bids", "High bidder" shows the badge "You", and the bid history lists "You" at "$127.50".
