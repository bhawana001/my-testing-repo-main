---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk-clone-app/inbound?reset=true
max_steps: 40
tags: [freshdesk, support, tickets]
---

# Freshdesc 33.1: Email to ticket conversion

Catalog objective: send an email to the support address and verify a ticket is created.
Key assertion: the ticket carries the correct subject and requester.

## Verify the mail is addressed to support
Verify the "To" field reads "support@acmerobotics.test".

## Send the email
Leave "From" as "Leo Marsh <leo@harbourfreight.test>" and "Subject" as "Login link never arrives", click "Send the email", and verify a green card titled "Ticket created" appears.

## Verify the ticket details
Verify the card shows "Ticket id" of "#1044", "Subject" of "Login link never arrives", "Requester" of "Leo Marsh", "Requester email" of "leo@harbourfreight.test" and "Source" of "Email".

## Verify it is in the queue
Click "Open it in the ticket list" and verify the queue shows "Ticket count" of 4 with a "#1044" row whose subject is "Login link never arrives" and whose requester is "Leo Marsh".
