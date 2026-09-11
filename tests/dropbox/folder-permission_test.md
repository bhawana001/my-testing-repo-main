---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox/folder-permission?reset=true
max_steps: 45
tags: [dropbox, docs-productivity, crud]
---

# Dropboxy 44.2: Folder permission change

Catalog objective: change a folder to team edit access.
Key assertion: a member can edit after the change.

## Check the member before the change
Go to https://my-testing-repo-main.vercel.app/dropbox/folder-permission?reset=true, click "View as Priya", and verify "You have view-only access" and the "New file name" box is disabled.

## Change team access
Click "Owner (Demo)", select "Can edit" for Team · Acme, and verify "Team · Acme can now edit “Marketing”."

## Edit as the member
Click "View as Priya", type "Priya-notes.txt" into "New file name", click "Add file", and verify "Priya-notes.txt" is listed and "You can edit this folder" is shown.
