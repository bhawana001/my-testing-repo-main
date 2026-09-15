---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack-clone-app/channel/general?reset=true
max_steps: 40
tags: [slack, work-collab, messaging]
---

# Slaick 35.1: Message send with thread

Catalog objective: send a channel message and reply to it in a thread.
Key assertion: the thread count increments and the reply is nested under the message.

## Send a channel message
Type "Deploy freeze notes are in the doc" into the "Message #general" box and click "Send", then verify the message list shows a message from "Priya Nair" with the text "Deploy freeze notes are in the doc".

## Open the thread on that message
Click the "Reply in thread" button under the message "Deploy freeze notes are in the doc" and verify the Thread panel on the right shows that same message text and "0 replies".

## Post a nested reply
Type "Adding the rollback steps too" into the "Reply…" box in the Thread panel and click "Reply", then verify the Thread panel shows "1 reply" and a nested reply from "Priya Nair" reading "Adding the rollback steps too".

## Confirm the thread count on the message
Verify the message "Deploy freeze notes are in the doc" in the main message list now shows a reply button labelled "1 reply".
