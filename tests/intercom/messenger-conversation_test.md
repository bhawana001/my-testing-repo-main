---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom-clone-app/messenger?reset=true
max_steps: 45
tags: [intercom, support, messaging]
---

# Intercomm 31.1: Messenger conversation start

Catalog objective: open the messenger and start a conversation with an attachment.
Key assertion: the message is sent and visible in the inbox.

## Start the conversation
Type "The export keeps failing on large reports" into the messenger box, click "Send", and verify a green banner says the message was sent and conversation "CNV-41820" is now in the inbox.

## Attach a file
Click "Attach error-screenshot.png" and verify a green banner reads "error-screenshot.png attached to the conversation." and an inline image preview appears in the thread.

## Verify the thread
Verify the thread shows a message from "Sam Rivera" reading "The export keeps failing on large reports" and a second from "Sam Rivera" reading "Attached error-screenshot.png".

## Verify it is visible in the agent inbox
Go to https://my-testing-repo-main.vercel.app/intercom-clone-app/inbox and verify the conversation list has a "Sam Rivera" row for "CNV-41820", and the detail panel transcript contains "The export keeps failing on large reports" and an attachment marked "error-screenshot.png".
