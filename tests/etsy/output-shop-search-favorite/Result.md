---
test: ../shop-search-favorite_test.md
status: passed
started: 2026-09-15T10:07:46.555Z
duration_s: 155
session_id: 4df5b154-6293-444c-b6a1-dab25db2d74c
---

# Etsi 5.2: Shop search and favorite — Result

## Search for a shop ✓ passed (39.9s)
md5: e680abb81b7b31a10d165647752c87f1
Type "KilnAndClay" into the search box and verify the results show "2 listings" including "Hand-thrown Speckled Mug".

## Favorite an item ✓ passed (25.2s)
md5: c6aa4c419d465cf09f1ae92f56470b3d
Click the "♡ Favorite" button on "Hand-thrown Speckled Mug" and verify the button now reads "♥ Favorited".

## Open the favorites list ✓ passed (46.2s)
md5: 32ba6f2e40fa9c75efe2a547cbeafe79
Click the "Favorites" link in the header and verify the favorites page shows "1 favorite" and lists "Hand-thrown Speckled Mug".

## Confirm it survives a reload ✓ passed (39.5s)
md5: bb03a1d732bbf0f85add9d7010989bde
Reload the page and verify the favorites page still shows "1 favorite" and still lists "Hand-thrown Speckled Mug".
