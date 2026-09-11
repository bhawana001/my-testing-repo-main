---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom/messenger-conversation?reset=true
max_steps: 40
tags: [intercom, support-saas, feed]
---

# Intercomm 31.1: Messenger conversation start

Catalog objective: open the messenger and start a conversation with an attachment.
Key assertion: the message is sent and visible in the inbox.

## Open the messenger
Go to https://my-testing-repo-main.vercel.app/intercom/messenger-conversation?reset=true, click the chat launcher in the bottom-right corner, and verify "Hi Demo 👋" with a "New conversation" button.

## Start a conversation
Click "New conversation" and verify the greeting "Hi Demo! How can we help today?"

## Write and attach
Type "Export fails with error 500" into the message box, click "+ error-screenshot.png" to attach the sample file, and verify "📎 error-screenshot.png" shows on the composer.

## Send
Click "Send" and verify your message "Export fails with error 500" with "📎 error-screenshot.png" appears with "Delivered".

## Verify in the team inbox
Click "Team inbox" in the top bar and verify the conversation from "Demo User · demo@evals.dev" shows "Export fails with error 500" and "📎 error-screenshot.png · 184 KB".
