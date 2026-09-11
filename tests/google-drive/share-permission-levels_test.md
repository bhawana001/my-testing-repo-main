---
mode: testing
url: https://my-testing-repo-main.vercel.app/google-drive/share-permission-levels?reset=true
max_steps: 45
tags: [google-drive, docs-productivity, crud]
---

# Drively 45.1: Doc share with permission levels

Catalog objective: share a doc as commenter and verify the access level.
Key assertion: the recipient can comment but not edit.

## Share as commenter
Go to https://my-testing-repo-main.vercel.app/google-drive/share-permission-levels?reset=true, click "Share", type "sam@acme.test" into Add people, keep "Commenter", click "Send", and verify "sam@acme.test · Commenter" under People with access.

## View as the recipient
Click "View as Sam" and verify the banner "You can comment on this file, but not edit it" and "Editing disabled (read-only)".

## Comment as the recipient
Type "Looks good" into "Add a comment", click "Comment", and verify "Sam Lee: Looks good" appears.
