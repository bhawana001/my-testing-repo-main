---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk/widget-ticket?reset=true
max_steps: 40
tags: [zendesk, support-saas, wizard]
---

# Zendeskly 30.1: Ticket submission via widget

Catalog objective: submit a ticket through the web widget.
Key assertion: the ticket is created with the correct fields.

## Open the widget
Go to https://my-testing-repo-main.vercel.app/zendesk/widget-ticket?reset=true, click the "? Help" button in the bottom-right corner, and verify a "Leave us a message" form opens.

## Submit with an invalid email
Type "Demo User" into Your name, "demo@evals" into Email address, "Cannot reset password" into Subject, "The reset email never arrives." into How can we help?, select "High" priority, click "Send", and verify the error "Enter a valid email address."

## Fix the email and send
Change Email address to "demo@evals.dev", click "Send", and verify "Thanks for reaching out" with "Your request #1043 was received."

## Verify the ticket fields
Click "Agent view" in the top bar and verify the ticket list shows "#1043" with subject "Cannot reset password", requester "Demo User (demo@evals.dev)", priority "High", status "New" and channel "Web widget".
