---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion-clone-app/page/home?reset=true
max_steps: 45
tags: [notion, work-collab, collaboration]
---

# Notiond 38.5: Comment and mention

Catalog objective: comment on a block, mentioning a teammate.
Key assertion: the comment is saved and a notification is sent.

## Open the comment box on a block
Click the "Comment" button under the block "Everything the team needs, in one place." and verify a "Comment" card appears.

## Mention a teammate
Click "@Tom Alvarez" in the comment card and verify the Comment box now contains "@Tom Alvarez ".

## Post the comment
Type "can you add the on-call rota here?" at the end of the comment box, click "Post comment", and verify a green banner says the comment was saved and "Tom Alvarez" was notified.

## Verify the comment and the notification
Verify the block now shows a comment from "Priya Nair" reading "@Tom Alvarez can you add the on-call rota here?" with a "@Tom Alvarez" badge, then go to https://my-testing-repo-main.vercel.app/notion-clone-app and verify the Notifications card lists an entry for "Tom Alvarez — mentioned by Priya Nair".
