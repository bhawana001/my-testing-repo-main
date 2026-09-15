---
test: ../bot-handoff_test.md
status: passed
started: 2026-09-14T10:45:04.949Z
duration_s: 125
session_id: b05b9d35-86e1-44a1-a030-74a1db272e70
---

# Intercomm 31.2: Bot to human handoff — Result

## Start the bot flow ✓ passed (1.03s)
md5: c1caf5f33f8630097202e26200ef63a8
Go to https://my-testing-repo-main.vercel.app/intercom/bot-handoff?reset=true and verify the messenger shows "Hi! I'm Fin, the Acme bot. What can I help with?" with "Billing" and "Technical issue" options.

## Choose Billing ✓ passed (0.76s)
md5: ad927c32dcd8ea593549e62dd6c35165
Click "Billing" and verify the bot asks "What's the invoice number?"

## Give the invoice number ✓ passed (13.53s)
md5: 835fdd0329e56feb092e2e458357d333
Type "INV-2231" into the invoice box, click "Send", and verify the bot suggests an article and offers "Talk to a person".

## Request a human ✓ passed (40s)
md5: 7a314608ee78fc0bbbc6d1c2297c4dd9
Click "Talk to a person" and verify the bot says "Connecting you to the Billing team." and the badge "Waiting for the Billing team".

## Verify assignment and context ✓ passed (67s)
md5: 5c13f3aea5432a78a4f15872be4026d8
Click "Team inbox" and verify the Billing inbox count is 1, the conversation is "Assigned to Billing", and the context shows Topic "Billing", Invoice "INV-2231" and the full bot transcript.
