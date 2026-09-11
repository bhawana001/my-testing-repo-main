---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay/seller-listing?reset=true
max_steps: 45
tags: [ebay, e-commerce, wizard]
---

# eBidz 6.4: Seller listing creation

Catalog objective: create a listing with photos, condition and price, and publish it.
Key assertion: the listing is live and searchable by title.

## Photos step validation
Go to https://my-testing-repo-main.vercel.app/ebay/seller-listing?reset=true, click "Continue" on the "Add photos" step without adding photos, and verify "Add at least 2 photos."

## Add photos
Click "+ front.jpg" and "+ back.jpg", and verify both photos are listed.

## Continue to details
Click "Continue" and verify the "Item details" step is shown.
## Details
Type "Mechanical Keyboard · Brown switches" into Title, choose "Used", type "Lightly used, all keys work." into Description, and click "Continue".

## Pricing
Type "75" into "Buy It Now price (USD)", select "Free standard shipping", click "Continue", and verify the review step lists the title and "75".

## Publish
Click "List it" and verify "Your listing is live" with the title "Mechanical Keyboard · Brown switches" and price "$75.00".

## Search for it
Type "mechanical keyboard" into "Search for anything", click "Search", and verify "1 result for “mechanical keyboard”" showing "Mechanical Keyboard · Brown switches · Used" at "$75.00".
