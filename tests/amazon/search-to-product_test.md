---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/search-to-product?reset=true
max_steps: 45
tags: [amazon, e-commerce, crud]
---

# Amazonia 1.1: Search to product page

Catalog objective: search for wireless earbuds, apply brand and price filters, open the top result.
Key assertion: the product page matches the filtered criteria.

## Search
Go to https://my-testing-repo-main.vercel.app/amazon/search-to-product?reset=true, type "wireless earbuds" into the search box, click the search button, and verify "4 results for “wireless earbuds”".

## Filter by brand
Check the brand "Aura" and verify the result count shows "Brand: Aura".

## Filter by price
Choose "$100 to $200" and verify "1 result for “wireless earbuds” · Brand: Aura · $100 to $200".

## Open the top result
Click the first result's title and verify the product page for "AuraBuds Pro Wireless Earbuds".

## Verify it matches the filters
Verify the product page shows "Brand: Aura", price "$129.00" (within $100–$200), and the badge "Matches your filters: Aura · $100 to $200".
