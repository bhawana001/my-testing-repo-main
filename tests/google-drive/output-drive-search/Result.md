---
test: ../drive-search_test.md
status: passed
started: 2026-09-13T18:58:29.334Z
duration_s: 92
session_id: 7901374d-80ab-409f-87f2-1e56c8f11aac
---

# Drively 45.3: Search across drive — Result

## Search by keyword ✓ passed (32.4s)
md5: 3e85f32c9bae24669bf93ed6e9381112
Go to https://my-testing-repo-main.vercel.app/google-drive/drive-search?reset=true, type "budget" into Search in Drive, click "Search", and verify "4 results for “budget”".

## Filter by type ✓ passed (29.5s)
md5: 37619a78d753e77d3d70826be2958123
Click the "Sheets" chip and verify "2 results for “budget” · Type: Sheets".

## Verify results ✓ passed (28.7s)
md5: 1789f854e3f0a3b6c2ecc155eef0518d
Verify the results are "2026 Budget" and "Travel budget tracker", both of type "Sheets", with "budget" highlighted.
