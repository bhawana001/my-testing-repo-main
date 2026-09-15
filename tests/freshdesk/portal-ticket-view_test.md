---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk-clone-app/tickets?reset=true
max_steps: 50
tags: [freshdesk, support, portal]
---

# Freshdesc 33.4: Customer portal ticket view

Catalog objective: log in to the portal and view the ticket status.
Key assertion: the status and replies are visible to the customer.

## Reply publicly and leave a private note
Click "#1041" in the queue, type "We have reproduced this and a fix is going out today." into the message box, click "Send", then type "Root cause is the 30 second gateway timeout." into the message box, tick "Private note" and click "Send".

## Set the ticket status
Select "Pending" in the status dropdown and verify the "#1041" row in the queue now shows "Pending".

## Open the customer portal
Go to https://my-testing-repo-main.vercel.app/freshdesk-clone-app/portal, select "sam@riverfield.test" in "Email", and verify "Your tickets" reads 2 with a "#1041 — Cannot export my report" row.

## Verify the customer sees status and public replies only
Click "#1041 — Cannot export my report" and verify "Status" reads "Pending", "Replies you can see" reads 2, the public reply "We have reproduced this and a fix is going out today." is shown, and the private note "Root cause is the 30 second gateway timeout." is not.
