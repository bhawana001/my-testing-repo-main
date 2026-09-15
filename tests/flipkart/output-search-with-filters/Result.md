---
test: ../search-with-filters_test.md
status: passed
started: 2026-09-15T09:37:30.270Z
duration_s: 267
session_id: 88afe998-569d-44a9-b338-2438c0668fba
---

# Flipkort 3.1: Search with filters — Result

## Search for running shoes ✓ passed (52.3s)
md5: 829741b25f9c4c5f47a9d88aaf2cb1db
Type "running shoes" into the search box, click "Search", and verify the results page shows "4 results".

## Filter by size 8 ✓ passed (47.4s)
md5: 85c7498ae7206c78719ef1aadf3d1969
Click the "8" size filter and verify the result count line contains "size 8".

## Narrow by price band ✓ passed (46.1s)
md5: 5f9a5f3a4b9eb1bec636527abe782f53
Click the "₹1,500 – ₹3,000" price filter and verify the results show "1 result" and list "Trailburst Running Shoes".

## Open the filtered result ✓ passed (66.9s)
md5: e61b486005c91977658793bffc167f3d
Click "Trailburst Running Shoes" and verify the product page shows the price "₹2,499.00" and that size "8" can be selected.

## Confirm the size is genuinely available ✓ passed (51.7s)
md5: c8e870c151a2095b906b0b34c1305555
Click size "8" and verify a badge appears reading "Size 8 · 12 left".
