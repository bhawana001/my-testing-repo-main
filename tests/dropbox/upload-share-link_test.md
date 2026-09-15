---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox-clone-app/files?reset=true
max_steps: 45
tags: [dropbox, documents, sharing]
---

# Dropbaks 44.1: File upload and share link

Catalog objective: upload a file and create a view-only link.
Key assertion: the link opens for an anonymous viewer.

## Upload a file
Type "press-release.txt" into "File name", select "Launch assets" in "Folder", type "Embargo lifts on Friday." into "Contents", click "Upload", and verify a green banner reads "press-release.txt uploaded to Launch assets."

## Create the view-only link
Click "Create link" on the "launch-brief.txt" row and verify a green banner titled "Share link ready" shows the link "/dropbox-clone-app/s/s4820".

## Open the link as a visitor
Click "Open it as a visitor" and verify the page title reads "launch-brief.txt" with the subtitle "Shared with you — you are not signed in".

## Verify it is view only
Verify the preview card shows a "View only" badge, "Owner" of "Priya Nair", the content "Launch brief — version 3", a "Download" button, and the note "Editing is not available on a view-only link."
