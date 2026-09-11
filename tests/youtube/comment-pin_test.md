---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube/comment-pin?reset=true
max_steps: 45
tags: [youtube, streaming, feed]
---

# YouTubely 49.2: Comment and moderation

Catalog objective: comment on a video and pin a comment as the creator.
Key assertion: the comment is pinned at the top.

## Comment as creator
Go to https://my-testing-repo-main.vercel.app/youtube/comment-pin?reset=true, type "Thanks for watching! Part 2 drops Friday." into "Add a comment…", click "Comment", and verify it appears first from "Demo Channel ✓".

## Pin a viewer comment
Click "📌 Pin" under Sam Lee's comment "Could you do a follow-up on caching?"

## Verify pinned at top
Verify the first comment is now Sam Lee's "Could you do a follow-up on caching?" labelled "📌 Pinned by Demo Channel".
