---
mode: testing
url: https://my-testing-repo-main.vercel.app/teams-clone-app/channel/eng?reset=true
max_steps: 40
tags: [microsoft-teams, work-collab, messaging]
---

# Teemz 36.2: Channel post with mention

Catalog objective: post with an @ mention and verify the notification.
Key assertion: the mentioned user's activity feed shows the post.

## Compose a post with a mention
Click the "@Mira Shah" button under the composer and verify the post box now contains "@Mira Shah ".

## Add the message and post it
Type "can you review the launch checklist today?" at the end of the post box, click "Post", and verify a green banner reads "Posted — Mira Shah notified in Activity."

## Verify the post carries the mention
Verify the "Posts" card shows a post from "Priya Nair" containing "@Mira Shah can you review the launch checklist today?" with a "@Mira Shah" badge.

## Check the mentioned person's Activity feed
Go to https://my-testing-repo-main.vercel.app/teams-clone-app/activity, select "Mira Shah" in the "Person" dropdown, and verify the feed reads "1 item for Mira Shah" with an entry saying "Priya Nair mentioned you in Engineering".
