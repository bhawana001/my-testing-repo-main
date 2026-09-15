---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom-clone-app/messenger?reset=true
max_steps: 45
tags: [intercom, support, automation]
---

# Intercomm 31.2: Bot to human handoff

Catalog objective: trigger the bot flow and request a human agent.
Key assertion: the conversation is assigned to the inbox with its context.

## Start with the bot
Click "A billing question" and verify the thread shows "Fin (bot)" replying "I can help with billing. Which plan are you on?"

## Give the bot some context
Type "We are on Pro and the invoice total looks wrong" into the messenger box, click "Send", and verify that message appears in the thread from "Sam Rivera".

## Ask for a human
Click "I want to talk to a person" and verify a green banner says the conversation was handed off to a human and assigned in the inbox with the full transcript.

## Verify the assignment carried the context
Go to https://my-testing-repo-main.vercel.app/intercom-clone-app/inbox and verify the detail panel shows "Assignee" of "Priya Nair", a bot path containing "A billing question" and "I want to talk to a person", and a transcript that still contains "We are on Pro and the invoice total looks wrong".
