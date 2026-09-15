---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart-clone-app?reset=true
max_steps: 45
tags: [flipkart, e-commerce, search]
---

# Flipkort 3.1: Search with filters

Catalog objective: search for running shoes, filter by size and price band, then open a result.
Key assertion: the result respects both the size and the price filter.

## Search for running shoes
Type "running shoes" into the search box, click "Search", and verify the results page shows "4 results".

## Filter by size 8
Click the "8" size filter and verify the result count line contains "size 8".

## Narrow by price band
Click the "₹1,500 – ₹3,000" price filter and verify the results show "1 result" and list "Trailburst Running Shoes".

## Open the filtered result
Click "Trailburst Running Shoes" and verify the product page shows the price "₹2,499.00" and that size "8" can be selected.

## Confirm the size is genuinely available
Click size "8" and verify a badge appears reading "Size 8 · 12 left".
