---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox-clone-app/sharing?reset=true
max_steps: 40
tags: [dropbox, documents, permissions]
---

# Dropbaks 44.2: Folder permission change

Catalog objective: change a folder to team edit access.
Key assertion: a member can edit after the change.

## Verify the starting access
Verify the Folder card shows "Launch assets" with "Current access" of "Can view" and members "Tom Alvarez, Mira Shah".

## Verify the member cannot edit yet
Select "Tom Alvarez" in "View as" and verify the member view shows a "Can view only" badge, "Open and download" of "Allowed", "Rename, replace, delete" of "Blocked", and a disabled button reading "Editing unavailable".

## Change the folder to edit access
Choose "Can edit" and verify a green banner reads "Launch assets is now set to Can edit for the team."

## Verify the member can now edit
Verify the member view shows a "Can edit this folder" badge, "Rename, replace, delete" of "Allowed", and an enabled button reading "Edit files".
