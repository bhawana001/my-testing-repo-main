---
test: ../share-permission-levels_test.md
status: passed
started: 2026-09-13T18:53:53.305Z
duration_s: 133
session_id: 715b5132-4295-412a-a239-4b38dd5d7d5b
---

# Drively 45.1: Doc share with permission levels — Result

## Share as commenter ✓ passed (44.1s)
md5: 7761c6656b2b28d0d1298ec9611168b0
Go to https://my-testing-repo-main.vercel.app/google-drive/share-permission-levels?reset=true, click "Share", type "sam@acme.test" into Add people, keep "Commenter", click "Send", and verify "sam@acme.test · Commenter" under People with access.

## View as the recipient ✓ passed (46.7s)
md5: 094bf8508d3978bf8957a80266a2f103
Click "View as Sam" and verify the banner "You can comment on this file, but not edit it" and "Editing disabled (read-only)".

## Comment as the recipient ✓ passed (38.9s)
md5: e891a870514b32e663abedf51d162c13
Type "Looks good" into "Add a comment", click "Comment", and verify "Sam Lee: Looks good" appears.
