---
test: ../board-item_test.md
status: passed
started: 2026-09-13T18:28:36.087Z
duration_s: 100
session_id: d1e97342-18e7-4561-997c-ef72dbc00bb5
---

# Mondayly 42.1: Board item creation — Result

## Open the board ✓ passed (18.7s)
md5: d5cbae17a569c730b49970391a3daab3
Go to https://my-testing-repo-main.vercel.app/monday/board-item?reset=true and verify "Marketing plan · Main table" lists "Write press release" and "Book venue".

## Add an item ✓ passed (48s)
md5: 4bca41c0771e954484412f5a9afa9ddb
Type "Launch webinar" into "+ Add item", select "Priya Nair" as person, "Working on it" as status, set date 2026-09-24, click "Add", and verify a row "Launch webinar" appears.

## Verify after reload ✓ passed (31.5s)
md5: e36f0223f69d28e097bbb4f07cba5512
Reload the page without the reset parameter and verify the "Launch webinar" row shows Person "Priya Nair", Status "Working on it" and Date "2026-09-24".
