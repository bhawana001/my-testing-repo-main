---
mode: testing
url: https://my-testing-repo-main.vercel.app/microsoft-teams/mention-notification?reset=true
max_steps: 45
tags: [microsoft-teams, work-collab, feed]
---

# Teamz 36.2: Channel post with mention

Catalog objective: post with an @ mention and verify the notification.
Key assertion: the mentioned user's activity shows the post.

## Mention a teammate
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/mention-notification?reset=true, type "@pri" into "Start a post", and verify a mention picker suggests "Priya Nair".

## Pick and post
Click "Priya Nair" in the picker, then type "please review the release notes" at the end of the post, click "Post", and verify the post "@PriyaNair please review the release notes" appears in General.

## Check Priya's activity
Click "Priya" in the top bar and verify the Activity feed shows an unread badge "1" and the entry "Demo User mentioned you in General: @PriyaNair please review the release notes".
