---
mode: testing
url: https://my-testing-repo-main.vercel.app/drive-clone-app?reset=true
max_steps: 45
tags: [google-drive, documents, permissions]
---

# Drivve 45.1: Doc share with permission levels

Catalog objective: share a doc as commenter and verify the access level.
Key assertion: the recipient can comment but cannot edit.

## Share the document as a commenter
With "Launch plan" selected, select "Tom Alvarez" in "Person", choose the "Commenter" access level, click "Share", and verify a green banner says Tom Alvarez was given Commenter access to Launch plan.

## Verify the access level
Verify the recipient card shows "Access level" of "Commenter", "Can view" of "Yes", "Can comment" of "Yes" and "Can edit" of "No".

## Verify editing is disabled
Verify the button reads "Editing disabled" and is not clickable, and a badge reads "Commenter — editing is disabled".

## Verify commenting works
Type "The freeze date needs a second look" into the comment box, click "Comment", and verify a green banner reads "Comment added." and the comment list shows "Tom Alvarez" with that text.
