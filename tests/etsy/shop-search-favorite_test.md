---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy-clone-app?reset=true
max_steps: 40
tags: [etsy, marketplace, favorites]
---

# Etsi 5.2: Shop search and favorite

Catalog objective: search a shop, favorite an item, and verify it in the favorites list.
Key assertion: the favorited item persists after reload.

## Search for a shop
Type "KilnAndClay" into the search box and verify the results show "2 listings" including "Hand-thrown Speckled Mug".

## Favorite an item
Click the "♡ Favorite" button on "Hand-thrown Speckled Mug" and verify the button now reads "♥ Favorited".

## Open the favorites list
Click the "Favorites" link in the header and verify the favorites page shows "1 favorite" and lists "Hand-thrown Speckled Mug".

## Confirm it survives a reload
Reload the page and verify the favorites page still shows "1 favorite" and still lists "Hand-thrown Speckled Mug".
