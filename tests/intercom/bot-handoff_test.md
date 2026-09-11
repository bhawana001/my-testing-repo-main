---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom/bot-handoff?reset=true
max_steps: 40
tags: [intercom, support-saas, feed]
---

# Intercomm 31.2: Bot to human handoff

Catalog objective: trigger the bot flow and request a human agent.
Key assertion: the conversation is assigned to an inbox with context.

## Start the bot flow
Go to https://my-testing-repo-main.vercel.app/intercom/bot-handoff?reset=true and verify the messenger shows "Hi! I'm Fin, the Acme bot. What can I help with?" with "Billing" and "Technical issue" options.

## Choose Billing
Click "Billing" and verify the bot asks "What's the invoice number?"

## Give the invoice number
Type "INV-2231" into the invoice box, click "Send", and verify the bot suggests an article and offers "Talk to a person".

## Request a human
Click "Talk to a person" and verify the bot says "Connecting you to the Billing team." and the badge "Waiting for the Billing team".

## Verify assignment and context
Click "Team inbox" and verify the Billing inbox count is 1, the conversation is "Assigned to Billing", and the context shows Topic "Billing", Invoice "INV-2231" and the full bot transcript.
