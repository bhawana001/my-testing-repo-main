---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion/comment-mention?reset=true
max_steps: 45
tags: [notion, work-collab, feed]
---

# Notionly 38.5: Comment and mention

Catalog objective: comment on a block mentioning a teammate.
Key assertion: the comment is saved and a notification is sent.

## Start a comment
Go to https://my-testing-repo-main.vercel.app/notion/comment-mention?reset=true, click "💬 Comment" on the block "Revenue target: $1.2M ARR by end of Q3", and verify a comment box appears.

## Mention a teammate
Type "@Pri" into the comment box, click "Priya Nair" in the mention picker, then type "can you check the numbers?" at the end.

## Save
Click "Comment" and verify the comment "@PriyaNair can you check the numbers?" by Demo User appears under the block.

## Verify the notification
Click "Priya" in the top bar and verify the Inbox shows badge "1" and "Demo User mentioned you in a comment on Q3 plan" on the block "Revenue target: $1.2M ARR by end of Q3".
