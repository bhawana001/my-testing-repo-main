---
test: ../messenger-conversation_test.md
status: passed
started: 2026-09-13T13:23:49.179Z
duration_s: 165
session_id: f4e5859f-ede6-4bfd-a1a4-9d8594207202
---

# Intercomm 31.1: Messenger conversation start — Result

## Open the messenger ✓ passed (34.7s)
md5: 312eb37eded8daf051fe52f38cf15168
Go to https://my-testing-repo-main.vercel.app/intercom/messenger-conversation?reset=true, click the chat launcher in the bottom-right corner, and verify "Hi Demo 👋" with a "New conversation" button.

## Start a conversation ✓ passed (32.8s)
md5: 13db94ff141798f184611a9dbd2c9e7d
Click "New conversation" and verify the greeting "Hi Demo! How can we help today?"

## Write and attach ✓ passed (37.7s)
md5: 85080b38bf966a3dab25c336265d4421
Type "Export fails with error 500" into the message box, click "+ error-screenshot.png" to attach the sample file, and verify "📎 error-screenshot.png" shows on the composer.

## Send ✓ passed (31.6s)
md5: bb96c4cad514e1c775d1e9904c9e3c2b
Click "Send" and verify your message "Export fails with error 500" with "📎 error-screenshot.png" appears with "Delivered".

## Verify in the team inbox ✓ passed (26.7s)
md5: edf8ba1b09b3fc627ca1beda62ebb405
Click "Team inbox" in the top bar and verify the conversation from "Demo User · demo@evals.dev" shows "Export fails with error 500" and "📎 error-screenshot.png · 184 KB".
