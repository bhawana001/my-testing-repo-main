---
test: ../folder-permission_test.md
status: passed
started: 2026-09-13T18:47:11.240Z
duration_s: 145
session_id: 5fae77e2-e505-424b-9a1a-400bca237c8a
---

# Dropboxy 44.2: Folder permission change — Result

## Check the member before the change ✓ passed (35s)
md5: 7f792c36030deacf63891eba618d8ff5
Go to https://my-testing-repo-main.vercel.app/dropbox/folder-permission?reset=true, click "View as Priya", and verify "You have view-only access" and the "New file name" box is disabled.

## Change team access ✓ passed (31.5s)
md5: f1ea543b6a431528ca377cb6e4dfa11d
Click "Owner (Demo)", select "Can edit" for Team · Acme, and verify "Team · Acme can now edit “Marketing”."

## Edit as the member ✓ passed (75.9s)
md5: ea3c8485fc93f76716e25b101bb488aa
Click "View as Priya", type "Priya-notes.txt" into "New file name", click "Add file", and verify "Priya-notes.txt" is listed and "You can edit this folder" is shown.
