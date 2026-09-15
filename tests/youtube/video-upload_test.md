---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube-clone-app/upload?reset=true
max_steps: 45
tags: [youtube, media, publishing]
---

# Yootube 49.1: Video upload and process

Catalog objective: upload a short video with a title and a visibility setting.
Key assertion: the video processes and plays at the visibility set.

## Fill in the upload
Type "Shop tour — September" into "Title", type "A walk through the build bay." into "Description", choose the "Unlisted" visibility, and verify "Unlisted" is selected.

## Upload it
Click "Upload" and verify a card appears showing "Title" of "Shop tour — September", "Visibility" of "unlisted" and "Status" of "Processing".

## Wait for processing to finish
Wait for the status to change and verify "Status" now reads "Ready" with a badge reading "Ready to play".

## Verify it plays at the visibility set
Click "Watch it" and verify the player shows "Playing — Shop tour — September", "Visibility" of "unlisted" and the note "A signed-out visitor can watch this only with the link".
