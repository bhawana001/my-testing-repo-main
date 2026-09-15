---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk-clone-app/agent?reset=true
max_steps: 45
tags: [zendesk, support, agent]
---

# Zendisk 30.2: Agent reply and status

Catalog objective: reply as an agent and set the status to pending.
Key assertion: the reply is recorded and the status change sticks.

## Open the ticket
Click "Open" on ticket 4409 and verify the page title reads "#4409 · Cannot download my August invoice".

## Write a reply
Type "I can see the failure in our logs and a fix is going out today." into "Public reply".

## Submit as pending
Click "Submit as Pending" and verify the conversation now contains that reply text.

## Verify the status changed
Verify "Status" in the ticket fields now reads "Pending", then click "← All tickets" and verify the 4409 row shows a status of "Pending".
