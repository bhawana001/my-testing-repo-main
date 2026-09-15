---
test: ../comment-mention_test.md
status: passed
started: 2026-09-15T06:51:22.101Z
duration_s: 50
session_id: 23fe31d4-8fc6-444a-8b44-b971966d192b
---

# Notionly 38.5: Comment and mention — Result

## Start a comment ✓ passed (1.46s)
md5: e32e46560b7254586eb0a95f81bd9ee0
Go to https://my-testing-repo-main.vercel.app/notion/comment-mention?reset=true, click "💬 Comment" on the block "Revenue target: $1.2M ARR by end of Q3", and verify a comment box appears.

## Mention a teammate ✓ passed (2.27s)
md5: c4db0a102f7a43fb334ada44088fb7da
Type "@Pri" into the comment box, click "Priya Nair" in the mention picker, then type "can you check the numbers?" at the end.

## Save ✓ passed (6.1s)
md5: e0b0f39286dc1bfb899436d2186aeb61
Click "Comment" and verify the comment "@PriyaNair can you check the numbers?" by Demo User appears under the block.

## Verify the notification ✓ passed (37.9s)
md5: 12763070e3092a2e2d39a50ea6b294db
Click "Priya" in the top bar and verify the Inbox shows badge "1" and "Demo User mentioned you in a comment on Q3 plan" on the block "Revenue target: $1.2M ARR by end of Q3".
