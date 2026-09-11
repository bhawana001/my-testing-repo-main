---
mode: testing
url: https://my-testing-repo-main.vercel.app/google-drive/drive-search?reset=true
max_steps: 45
tags: [google-drive, docs-productivity, crud]
---

# Drively 45.3: Search across drive

Catalog objective: search by keyword and file-type filter.
Key assertion: results match both the type and the content.

## Search by keyword
Go to https://my-testing-repo-main.vercel.app/google-drive/drive-search?reset=true, type "budget" into Search in Drive, click "Search", and verify "4 results for “budget”".

## Filter by type
Click the "Sheets" chip and verify "2 results for “budget” · Type: Sheets".

## Verify results
Verify the results are "2026 Budget" and "Travel budget tracker", both of type "Sheets", with "budget" highlighted.
