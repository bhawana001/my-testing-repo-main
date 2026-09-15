---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube-clone-app/watch/v1?reset=true
max_steps: 45
tags: [youtube, media, moderation]
---

# Yootube 49.2: Comment and moderation

Catalog objective: comment on a video and pin it as the creator.
Key assertion: the pinned comment sits at the top.

## Verify the starting comments
Verify "Commenting as" reads "Dan Okafor (channel owner)", "Comment count" reads 2, and the first comment is from "Mira Shah".

## Post a comment as the creator
Type "Torque figures are in the description now." into the comment box, click "Comment", and verify "Comment count" reads 3 with a comment from "Dan Okafor" carrying that text.

## Pin it
Click "Pin" on the "Torque figures are in the description now." comment and verify a green banner reads "Comment pinned to the top."

## Verify it moved to the top
Verify the first comment in the list is now from "Dan Okafor" reading "Torque figures are in the description now." with a badge reading "Pinned by the creator".
