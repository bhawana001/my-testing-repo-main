---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy/shop-search-favorite?reset=true
max_steps: 45
tags: [etsy, e-commerce, crud]
---

# Etsily 5.2: Shop search and favorite

Catalog objective: search a shop, favorite an item, verify it in the favorites list.
Key assertion: the favorited item persists after reload.

## Search the shop
Go to https://my-testing-repo-main.vercel.app/etsy/shop-search-favorite?reset=true, type "ClayWorks" into "Search for shops", click "Search", and verify "ClayWorks Studio" is listed.

## Open the shop
Click "ClayWorks Studio" and verify items "Custom Name Ceramic Mug", "Speckled Pour-over Set" and "Mini Planter Trio".

## Favorite an item
Click the heart on "Speckled Pour-over Set" and verify it turns filled (♥) and the tab reads "♥ Favorites (1)".

## Verify after reload
Reload the page without the reset parameter, click "♥ Favorites (1)", and verify "Speckled Pour-over Set · ClayWorks Studio" at "$58.00".
