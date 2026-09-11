---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube/video-upload?reset=true
max_steps: 45
tags: [youtube, streaming, wizard]
---

# YouTubely 49.1: Video upload and process

Catalog objective: upload a short video with title and visibility.
Key assertion: the video processes and plays at the set visibility.

## Select the file
Go to https://my-testing-repo-main.vercel.app/youtube/video-upload?reset=true, click "Select sample demo-clip.mp4", and verify "demo-clip.mp4 · 00:42 · 18 MB".

## Details
Click "Continue", type "My first edge deploy" into Title, choose "No, it's not made for kids", click "Continue", and verify the "Visibility" step.

## Visibility
Choose "Unlisted", click "Publish", and wait for "Processing complete. Your video is unlisted."

## Play
Click the player's "Play" button and verify the time advances past 0:00 and the badge reads "Unlisted" with an "Anyone with the link" note.
