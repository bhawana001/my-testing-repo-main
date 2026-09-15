---
test: ../shop-search-favorite_test.md
status: passed
started: 2026-09-13T10:20:52.804Z
duration_s: 128
session_id: 3fde97d9-3099-46d7-80db-86199c764b22
---

# Etsily 5.2: Shop search and favorite — Result

## Search the shop ✓ passed (27.6s)
md5: fdd550a6acbcdecff346fd8de534bbe8
Go to https://my-testing-repo-main.vercel.app/etsy/shop-search-favorite?reset=true, type "ClayWorks" into "Search for shops", click "Search", and verify "ClayWorks Studio" is listed.

## Open the shop ✓ passed (32.9s)
md5: 071324f0328b237166d473abfa627e16
Click "ClayWorks Studio" and verify items "Custom Name Ceramic Mug", "Speckled Pour-over Set" and "Mini Planter Trio".

## Favorite an item ✓ passed (24.5s)
md5: 30a95f5a469d9cae719a8202e395072d
Click the heart on "Speckled Pour-over Set" and verify it turns filled (♥) and the tab reads "♥ Favorites (1)".

## Verify after reload ✓ passed (41.1s)
md5: 7fc0ab2e82f017ceedcda640fde58cd1
Reload the page without the reset parameter, click "♥ Favorites (1)", and verify "Speckled Pour-over Set · ClayWorks Studio" at "$58.00".
