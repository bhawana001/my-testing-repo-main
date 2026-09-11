---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk/email-to-ticket?reset=true
max_steps: 40
tags: [freshdesk, support-saas, custom]
---

# Freshdeskly 33.1: Email to ticket conversion

Catalog objective: send an email to the support address and verify a ticket is created.
Key assertion: the ticket has the correct subject and requester.

## Compose the email
Go to https://my-testing-repo-main.vercel.app/freshdesk/email-to-ticket?reset=true and verify the mail client shows From "Demo User <demo@evals.dev>" and To "support@acme.freshdeskly.test".

## Send
Type "Refund not received for order A-7802" into Subject and "I returned the item two weeks ago." into Message, click "Send email", and verify "Auto-reply: ticket #2052 created."

## Verify the ticket
Click "Helpdesk" and verify the ticket list shows "#2052" with subject "Refund not received for order A-7802", requester "Demo User <demo@evals.dev>", source "✉ Email" and status "Open".
