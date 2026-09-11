---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart/search-with-filters?reset=true
max_steps: 45
tags: [flipkart, e-commerce, crud]
---

# Flipmart 3.1: Search with filters

Catalog objective: search for running shoes, filter by size and price band, open a result.
Key assertion: the result respects the size and price filters.

## Search
Go to https://my-testing-repo-main.vercel.app/flipkart/search-with-filters?reset=true, type "running shoes" into the search box, click "Search", and verify "Showing 5 results for “running shoes”".

## Filter by size
Check "UK 9" and verify the count text includes "UK 9".

## Filter by price
Choose "₹1,500 – ₹3,000" and verify "Showing 2 results for “running shoes” · UK 9 · ₹1,500 – ₹3,000".

## Open a result
Click the first result's title and verify the product "Stride Runner 3".

## Verify the filters are respected
Verify the price reads "₹2,499.00" (within ₹1,500–₹3,000) and available sizes "7, 8, 9, 10" include 9.
