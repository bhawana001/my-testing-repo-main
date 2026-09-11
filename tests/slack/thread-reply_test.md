---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/thread-reply?reset=true
max_steps: 30
tags: [slack, work-collab, feed]
---

# Slacky 35.1: Message send with thread

Catalog objective: send a channel message and reply in its thread.
Key assertion: the thread count increments and the reply is nested under the message.

## Open the channel
Go to https://my-testing-repo-main.vercel.app/slack/thread-reply?reset=true and verify the channel heading "# general" is visible with messages from "Priya Nair" and "Tom Alvarez" and no message shows a reply count.

## Send a channel message
Type "Deploy is green" into the "Message #general" box and click "Send". Verify a new message from "Demo User" with the text "Deploy is green" appears at the bottom of the channel.

## Reply in thread
Click "Reply in thread" under the "Deploy is green" message. Verify a "Thread" panel opens on the right showing the message "Deploy is green" and the text "0 replies".

## Post the reply
Type "Nice, thanks!" into the "Reply in thread" box and click "Reply".

## Verify the thread count and nesting
Verify the thread panel now says "1 reply" with the reply "Nice, thanks!" shown nested under the original message, and that the "Deploy is green" message in the channel list shows a "1 reply" link.
