---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay-clone-app/sell?reset=true
max_steps: 45
tags: [ebay, seller, listing]
---

# eBid 6.4: Seller listing creation

Catalog objective: create a listing with photos, condition and price, then publish it.
Key assertion: the listing is live and searchable by title.

## Confirm required fields are enforced
Click "Publish listing" without filling anything and verify errors appear reading "Give your listing a title." and "Add at least one photo."

## Fill in the item details
Type "Handbuilt Mechanical Keyboard" into the listing title, select "Open box" as the Condition, and verify the condition dropdown shows "Open box".

## Add photos
Click the "front.jpg" checkbox and the "detail.jpg" checkbox, then verify both are checked.

## Set the price
Type "185" into the Price field, type "6.50" into the shipping cost field, and verify the price field contains "185".

## Publish and confirm it is live
Click "Publish listing" and verify the page shows "Your listing is live" for "Handbuilt Mechanical Keyboard" with a price of "$185.00", condition "Open box" and "2 uploaded" photos.

## Confirm it is searchable
Click "View it in listings" and verify the listings grid includes "Handbuilt Mechanical Keyboard" priced "$185.00".
