---
test: ../search-with-filters_test.md
status: passed
started: 2026-09-13T10:11:29.169Z
duration_s: 141
session_id: 4cac445e-79c1-4ae7-8b0f-54fff13e003c
---

# Flipmart 3.1: Search with filters — Result

## Search ✓ passed (36.2s)
md5: 3c65eb170d645439bb478bfb09d515be
Go to https://my-testing-repo-main.vercel.app/flipkart/search-with-filters?reset=true, type "running shoes" into the search box, click "Search", and verify "Showing 5 results for “running shoes”".

## Filter by size ✓ passed (25.7s)
md5: c6da7743ad31b99646abddc3ac76e866
Check "UK 9" and verify the count text includes "UK 9".

## Filter by price ✓ passed (28.6s)
md5: cd579a1eede8d6b04d3ef44e7f77d9b1
Choose "₹1,500 – ₹3,000" and verify "Showing 2 results for “running shoes” · UK 9 · ₹1,500 – ₹3,000".

## Open a result ✓ passed (26.4s)
md5: 27e01e08c55103bc8fd9f96172321dfb
Click the first result's title and verify the product "Stride Runner 3".

## Verify the filters are respected ✓ passed (22.2s)
md5: e0ed59f8f3d779f059876af8c7cd8b9f
Verify the price reads "₹2,499.00" (within ₹1,500–₹3,000) and available sizes "7, 8, 9, 10" include 9.
