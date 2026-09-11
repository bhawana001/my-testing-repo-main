---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk/agent-reply-status?reset=true
max_steps: 40
tags: [zendesk, support-saas, crud]
---

# Zendeskly 30.2: Agent reply and status

Catalog objective: reply as an agent and set the status to pending.
Key assertion: the customer sees the reply and the status change.

## Open the ticket as an agent
Go to https://my-testing-repo-main.vercel.app/zendesk/agent-reply-status?reset=true and verify ticket "#1042 · Wrong billing address on invoice" with status "Open" and a message from Maria Chen.

## Reply and submit as Pending
Type "We've corrected the address and reissued the invoice." into the reply box, keep "Submit as Pending" selected, click "Submit as Pending", and verify the status badge reads "Pending".

## Check the customer view
Click "Customer portal" in the top bar and verify request #1042 shows the status "Awaiting your reply" and the reply "We've corrected the address and reissued the invoice." from Demo User.
